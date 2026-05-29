export type PageType = 'home' | 'services' | 'portfolio' | 'contact' | 'pricing';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export interface ProjectFormData {
  fullName: string;
  email: string;
  businessName: string;
  interestedService: string;
  budget: string;
  message: string;
}
