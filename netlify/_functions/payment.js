// Netlify Functions version of the payment API
// Integration with test payment system

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed',
        status: 'failed'
      })
    };
  }

  try {
    const { amount, service, userData, paymentMethod, quantity, url } = JSON.parse(event.body);

    // Validate required fields
    if (!amount || !service || !userData || !paymentMethod) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Missing required fields',
          status: 'failed'
        })
      };
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid amount',
          status: 'failed'
        })
      };
    }

    // Validate user data
    if (!userData.name || !userData.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'User name and email are required',
          status: 'failed'
        })
      };
    }

    // Generate transaction ID
    const transactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    console.log('Processing payment:', {
      transactionId,
      amount,
      service,
      userData: userData.name,
      paymentMethod,
      timestamp: new Date().toISOString()
    });

    // Test payment system integration
    try {
      // Step 1: Create order in test payment system
      const createOrderResponse = await fetch('http://api.box:5001/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic cHJvamVjdDpwYXNzd29yZA=='
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'KZT',
          description: `${service} - ${quantity}`,
          order_id: transactionId,
          return_url: `${event.headers.origin || 'https://strong-kringle-b952e3.netlify.app'}/payment-success`,
          cancel_url: `${event.headers.origin || 'https://strong-kringle-b952e3.netlify.app'}/payment-cancel`,
          customer: {
            name: userData.name,
            email: userData.email
          }
        })
      });

      if (!createOrderResponse.ok) {
        throw new Error(`Payment system error: ${createOrderResponse.status}`);
      }

      // Get payment URL from Location header
      const paymentUrl = createOrderResponse.headers.get('Location');
      
      if (!paymentUrl) {
        throw new Error('Payment URL not received from payment system');
      }

      // Return success with payment URL
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Заказ создан, перенаправление на оплату',
          transactionId,
          paymentUrl,
          status: 'pending'
        })
      };

    } catch (paymentError) {
      console.error('Payment system error:', paymentError);
      
      // Fallback to mock payment for development/testing
      console.log('Falling back to mock payment processing');
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Платеж успешно обработан (тестовый режим)',
            transactionId,
            status: 'completed'
          })
        };
      } else {
        // Mock failure scenarios
        const failureReasons = [
          'Недостаточно средств на карте',
          'Карта заблокирована',
          'Превышен лимит операций',
          'Ошибка банка'
        ];
        
        const randomFailure = failureReasons[Math.floor(Math.random() * failureReasons.length)];

        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: randomFailure,
            transactionId,
            status: 'failed'
          })
        };
      }
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Внутренняя ошибка сервера',
        status: 'failed'
      })
    };
  }
};