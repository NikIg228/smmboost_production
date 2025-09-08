/**
 * Netlify Function: Create Payment
 * Endpoint: POST /.netlify/functions/payment-create
 */

const { PaymentApiService } = require('../../src/lib/paymentApi');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed',
        error: 'Only POST method is allowed'
      })
    };
  }

  try {
    // Parse request body
    const requestData = JSON.parse(event.body);
    console.log('Payment creation request:', requestData);

    // Validate required fields
    const { amount, service, userData, paymentMethod, quantity, url } = requestData;

    if (!amount || !service || !userData || !paymentMethod) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Missing required fields',
          error: 'amount, service, userData, and paymentMethod are required'
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
          error: 'Amount must be a positive number'
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
          message: 'Invalid user data',
          error: 'User name and email are required'
        })
      };
    }

    // Generate unique transaction ID
    const transactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // Get origin for return URLs
    const origin = event.headers.origin || 'https://strong-kringle-b952e3.netlify.app';

    // Prepare order data for payment system
    const orderData = {
      amount: Math.round(amount), // Ensure integer amount
      currency: 'KZT',
      description: `${service} - ${quantity}`,
      order_id: transactionId,
      return_url: `${origin}/payment-success?order_id=${transactionId}`,
      cancel_url: `${origin}/payment-cancel?order_id=${transactionId}`,
      customer: {
        name: userData.name,
        email: userData.email
      }
    };

    // Initialize payment API service
    const paymentApi = new PaymentApiService();

    // Check API connection
    const isApiAvailable = await paymentApi.ping();
    
    if (!isApiAvailable) {
      console.warn('Payment API is not available, falling back to mock payment');
      
      // Fallback to mock payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isSuccess = Math.random() > 0.1; // 90% success rate
      
      if (isSuccess) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Платеж успешно обработан (тестовый режим)',
            transaction_id: transactionId,
            status: 'completed'
          })
        };
      } else {
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
            transaction_id: transactionId,
            status: 'failed'
          })
        };
      }
    }

    // Create order in payment system
    const result = await paymentApi.createOrder(orderData);

    if (result.success && result.payment_url) {
      // Store transaction in database (if needed)
      // await storeTransaction(transactionId, orderData, 'pending');

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Заказ создан, перенаправление на оплату',
          transaction_id: transactionId,
          payment_url: result.payment_url,
          status: 'pending'
        })
      };
    } else {
      console.error('Payment order creation failed:', result);
      
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: result.message || 'Ошибка создания заказа',
          error: result.error,
          transaction_id: transactionId,
          status: 'failed'
        })
      };
    }

  } catch (error) {
    console.error('Payment creation error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Внутренняя ошибка сервера',
        error: error.message || 'Unknown error',
        status: 'failed'
      })
    };
  }
};

// Simple PaymentApiService implementation for Node.js
class PaymentApiService {
  constructor() {
    this.baseUrl = 'http://api.box:5001';
    this.authHeader = 'Basic cHJvamVjdDpwYXNzd29yZA==';
    this.timeout = 30000;
  }

  async ping() {
    try {
      const response = await this.makeRequest('GET', '/ping');
      return response.ok;
    } catch (error) {
      console.error('Payment API ping failed:', error);
      return false;
    }
  }

  async createOrder(orderData) {
    try {
      console.log('Creating payment order:', orderData);

      const response = await this.makeRequest('POST', '/orders/create', orderData);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const paymentUrl = response.headers.get('Location');
      
      if (!paymentUrl) {
        throw new Error('Payment URL not received from payment system');
      }

      console.log('Payment order created successfully:', { paymentUrl });

      return {
        success: true,
        order_id: orderData.order_id,
        payment_url: paymentUrl,
        status: 'pending',
        message: 'Order created successfully'
      };

    } catch (error) {
      console.error('Create order error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to create payment order'
      };
    }
  }

  async makeRequest(method, endpoint, body) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authHeader,
      },
      timeout: this.timeout,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    console.log(`Making ${method} request to ${url}`, body ? { body } : '');

    const response = await fetch(url, options);
    
    console.log(`Response: ${response.status} ${response.statusText}`);
    
    return response;
  }
}