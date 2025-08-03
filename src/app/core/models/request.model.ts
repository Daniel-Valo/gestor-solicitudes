import { RequestCategory } from './request-category.enum';
import { RequestStatus } from './request-status.enum';

export interface Request {
  id: number;
  title: string;
  description: string;
  category: RequestCategory;
  status: RequestStatus;
  createdAt: string;
  user: string;
}
