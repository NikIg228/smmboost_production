/**
 * Payment API Service
 * Модуль для работы с тестовой платежной системой
 */

export interface PaymentOrder {
  id?: string;
  amount: number;
  currency?: string;
  description?: string;
  order_id?: string;
  return_url?: string;
  cancel_url?: string;
  customer?: {
    name: string;
    email: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  order_id?: string;
  payment_url?: string;
  status?: 'pending' | 'authorized' | 'charged' | 'failed' | 'refunded';
  message?: string;
  error?: string;
}

export interface PaymentStatus {
  order_id: string;
  status: 'pending' | 'authorized' | 'charged' | 'failed' | 'refunded';
  amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export class PaymentApiService {
  private readonly baseUrl: string;
  private readonly authHeader: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = 'http://api.box:5001';
    this.authHeader = 'Basic cHJvamVjdDpwYXNzd29yZA=='; // project:password
    this.timeout = 30000; // 30 seconds
  }

  /**
   * Проверка соединения с API
   */
  async ping(): Promise<boolean> {
    try {
      const response = await this.makeRequest('GET', '/ping');
      return response.ok;
    } catch (error) {
      console.error('Payment API ping failed:', error);
      return false;
    }
  }

  /**
   * Создание заказа в платежной системе
   */
  async createOrder(orderData: PaymentOrder): Promise<PaymentResponse> {
    try {
      console.log('Creating payment order:', orderData);

      const response = await this.makeRequest('POST', '/orders/create', orderData);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      // Получаем URL для оплаты из заголовка Location
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
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to create payment order'
      };
    }
  }

  /**
   * Авторизация карты
   */
  async authorizePayment(orderId: string): Promise<PaymentResponse> {
    try {
      console.log('Authorizing payment for order:', orderId);

      const response = await this.makeRequest('POST', '/orders/authorize', {
        order_id: orderId
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Payment authorized:', result);

      return {
        success: true,
        order_id: orderId,
        status: 'authorized',
        message: 'Payment authorized successfully'
      };

    } catch (error) {
      console.error('Authorize payment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to authorize payment'
      };
    }
  }

  /**
   * Списание средств
   */
  async chargePayment(orderId: string, amount?: number): Promise<PaymentResponse> {
    try {
      console.log('Charging payment for order:', orderId, 'amount:', amount);

      const body = amount ? { amount } : {};
      const response = await this.makeRequest('PUT', `/orders/${orderId}/charge`, body);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Payment charged:', result);

      return {
        success: true,
        order_id: orderId,
        status: 'charged',
        message: 'Payment charged successfully'
      };

    } catch (error) {
      console.error('Charge payment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to charge payment'
      };
    }
  }

  /**
   * Возврат средств
   */
  async refundPayment(orderId: string, amount?: number): Promise<PaymentResponse> {
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
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to refund payment'
      };
    }
  }

  /**
   * Базовый метод для выполнения HTTP запросов
   */
  private async makeRequest(
    method: string, 
    endpoint: string, 
    body?: any
  ): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authHeader,
      },
      signal: AbortSignal.timeout(this.timeout),
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

// Экспорт singleton instance
export const paymentApi = new PaymentApiService();