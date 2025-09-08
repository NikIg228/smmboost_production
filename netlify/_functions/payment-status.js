/**
 * Netlify Function: Payment Status
 * Endpoint: GET /.netlify/functions/payment-status?order_id=xxx
 */

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed',
        error: 'Only GET method is allowed'
      })
    };
  }

  try {
    // Get order_id from query parameters
    const orderId = event.queryStringParameters?.order_id;

    if (!orderId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Missing order_id parameter',
          error: 'order_id is required'
        })
      };
    }

    console.log('Checking payment status for order:', orderId);

    // In a real implementation, you would:
    // 1. Query your database for the transaction
    // 2. Optionally check with the payment system API
    // 3. Return the current status

    // Mock implementation
    const mockStatuses = ['pending', 'authorized', 'charged', 'failed'];
    const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];

    const statusData = {
      order_id: orderId,
      status: randomStatus,
      amount: 1000,
      currency: 'KZT',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: statusData,
        message: 'Status retrieved successfully'
      })
    };

  } catch (error) {
    console.error('Payment status check error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Внутренняя ошибка сервера',
        error: error.message || 'Unknown error'
      })
    };
  }
};