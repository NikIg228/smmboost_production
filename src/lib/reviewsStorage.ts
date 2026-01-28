export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface StoredReview {
  id: string;
  name: string;
  serviceId: string;
  serviceName: string;
  rating: number;
  text: string;
  date: string;
  status: ReviewStatus;
}

const STORAGE_KEY = 'smmboost_reviews';

const loadReviews = (): StoredReview[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as StoredReview[];
  } catch {
    return [];
  }
};

const saveReviews = (reviews: StoredReview[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // ignore
  }
};

export const addReview = (review: Omit<StoredReview, 'id' | 'date' | 'status'>) => {
  const current = loadReviews();
  const newReview: StoredReview = {
    ...review,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    status: 'pending',
  };
  saveReviews([newReview, ...current]);
  return newReview;
};

export const getPendingReviews = (): StoredReview[] =>
  loadReviews().filter(r => r.status === 'pending');

export const getApprovedReviews = (): StoredReview[] =>
  loadReviews().filter(r => r.status === 'approved');

export const updateReviewStatus = (id: string, status: ReviewStatus) => {
  const current = loadReviews();
  const updated = current.map(r => (r.id === id ? { ...r, status } : r));
  saveReviews(updated);
  return updated;
};

