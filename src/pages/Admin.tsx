import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { getPendingReviews, updateReviewStatus, StoredReview } from '../lib/reviewsStorage';

export const Admin: React.FC = () => {
  const [pending, setPending] = useState<StoredReview[]>([]);

  useEffect(() => {
    setPending(getPendingReviews());
  }, []);

  const handleUpdate = (id: string, status: 'approved' | 'rejected') => {
    const updated = updateReviewStatus(id, status);
    setPending(updated.filter(r => r.status === 'pending'));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Модерация отзывов</h1>
      {pending.length === 0 ? (
        <p className="text-gray-400">Новых отзывов для модерации нет.</p>
      ) : (
        <div className="space-y-4">
          {pending.map(review => (
            <div
              key={review.id}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <div className="font-semibold text-white mb-1">
                  {review.name} · {review.serviceName}
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  Оценка: {review.rating} ★
                </div>
                <p className="text-gray-200 text-sm whitespace-pre-line">
                  {review.text}
                </p>
              </div>
              <div className="flex flex-shrink-0 space-x-2">
                <button
                  onClick={() => handleUpdate(review.id, 'approved')}
                  className="inline-flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Одобрить</span>
                </button>
                <button
                  onClick={() => handleUpdate(review.id, 'rejected')}
                  className="inline-flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Отклонить</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

