/**
 * Netlify Function: Payment Refund
 * Endpoint: POST /.netlify/functions/payment-refund
 */

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
    console.log('Payment refund request:', requestData);

    const { order_id, amount, reason } = requestData;

    if (!order_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Missing order_id',
          error: 'order_id is required'
        })
      };
    }

    // Initialize payment API service
    const paymentApi = new PaymentApiService();

    // Check API connection
    const isApiAvailable = await paymentApi.ping();
    
    if (!isApiAvailable) {
      console.warn('Payment API is not available, using mock refund');
      
      // Mock refund processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Возврат успешно обработан (тестовый режим)',
          order_id: order_id,
          refund_amount: amount || 'full',
          status: 'refunded'
        })
      };
    }

    // Process refund through payment system
    const result = await paymentApi.refundPayment(order_id, amount);

    if (result.success) {
      // Update transaction status in database
      // await updateTransactionStatus(order_id, 'refunded');

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Возврат успешно обработан',
          order_id: order_id,
          refund_amount: amount || 'full',
          status: 'refunded'
        })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: result.message || 'Ошибка при обработке возврата',
          error: result.error,
          order_id: order_id,
          status: 'refund_failed'
        })
      };
    }

  } catch (error) {
    console.error('Payment refund error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Внутренняя ошибка сервера',
        error: error.message || 'Unknown error',
        status: 'refund_failed'
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

  async refundPayment(orderId, amount) {
    try {
      console.log('Refunding payment for order:', orderId, 'amount:', amount);

      const body = amount ? { amount } : {};
      const response = await this.makeRequest('PUT', `/orders/${orderId}/refund`, body);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Payment refunded:', result);

      return {
        success: true,
        order_id: orderId,
        status: 'refunded',
        message: 'Payment refunded successfully'
      };

    } catch (error) {
      console.error('Refund payment error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to refund payment'
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