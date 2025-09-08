export interface PaymentRequest {
  amount: number;
  service: string;
  quantity: number;
  url: string;
  userData: {
    name: string;
    email: string;
  };
  paymentMethod: 'card' | 'kaspi' | 'crypto' | 'wallet';
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
  paymentUrl?: string;
  status: 'completed' | 'failed' | 'pending';
}

export interface PaymentError {
  success: false;
  message: string;
  status: 'failed';
}