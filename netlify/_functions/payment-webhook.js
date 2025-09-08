/**
 * Netlify Function: Payment Webhook
 * Endpoint: POST /.netlify/functions/payment-webhook
 * Handles notifications from payment system
 */

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Signature',
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
        message: 'Method not allowed'
      })
    };
  }

  try {
    // Parse webhook payload
    const webhookData = JSON.parse(event.body);
    console.log('Received webhook:', webhookData);

    // Validate webhook signature (if implemented by payment system)
    const signature = event.headers['x-signature'];
    if (signature) {
      // Implement signature validation here
      console.log('Webhook signature:', signature);
    }

    // Extract payment information
    const {
      order_id,
      status,
      amount,
      currency,
      payment_method,
      timestamp,
      transaction_id
    } = webhookData;

    if (!order_id || !status) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid webhook data',
          error: 'order_id and status are required'
        })
      };
    }

    console.log(`Processing webhook for order ${order_id} with status ${status}`);

    // Process webhook based on status
    switch (status) {
      case 'authorized':
        await handlePaymentAuthorized(order_id, webhookData);
        break;
      
      case 'charged':
      case 'completed':
        await handlePaymentCompleted(order_id, webhookData);
        break;
      
      case 'failed':
        await handlePaymentFailed(order_id, webhookData);
        break;
      
      case 'refunded':
        await handlePaymentRefunded(order_id, webhookData);
        break;
      
      default:
        console.log(`Unknown payment status: ${status}`);
    }

    // Return success response to payment system
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Webhook processed successfully',
        order_id: order_id
      })
    };

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    // Return error response
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Webhook processing failed',
        error: error.message || 'Unknown error'
      })
    };
  }
};

/**
 * Handle payment authorization
 */
async function handlePaymentAuthorized(orderId, webhookData) {
  console.log(`Payment authorized for order: ${orderId}`);
  
  // Update transaction status in database
  // await updateTransactionStatus(orderId, 'authorized', webhookData);
  
  // Send notification to customer (optional)
  // await sendCustomerNotification(orderId, 'authorized');
}

/**
 * Handle payment completion
 */
async function handlePaymentCompleted(orderId, webhookData) {
  console.log(`Payment completed for order: ${orderId}`);
  
  // Update transaction status in database
  // await updateTransactionStatus(orderId, 'completed', webhookData);
  
  // Start order processing
  // await startOrderProcessing(orderId);
  
  // Send confirmation to customer
  // await sendCustomerNotification(orderId, 'completed');
}

/**
 * Handle payment failure
 */
async function handlePaymentFailed(orderId, webhookData) {
  console.log(`Payment failed for order: ${orderId}`);
  
  // Update transaction status in database
  // await updateTransactionStatus(orderId, 'failed', webhookData);
  
  // Send failure notification to customer
  // await sendCustomerNotification(orderId, 'failed');
}

/**
 * Handle payment refund
 */
async function handlePaymentRefunded(orderId, webhookData) {
  console.log(`Payment refunded for order: ${orderId}`);
  
  // Update transaction status in database
  // await updateTransactionStatus(orderId, 'refunded', webhookData);
  
  // Stop order processing if needed
  // await stopOrderProcessing(orderId);
  
  // Send refund confirmation to customer
  // await sendCustomerNotification(orderId, 'refunded');
}