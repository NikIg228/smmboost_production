export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  platform: string;
  category: string;
  icon: string;
  minQuantity: number;
  maxQuantity: number;
  startTime: string;
  speed: string;
  guarantee: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}