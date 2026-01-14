import React from 'react';
import { Avatar } from './Avatar';
import { Rating } from './Rating';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

interface ReviewListProps {
  reviews: Review[];
  emptyMessage?: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews, 
  emptyMessage = 'No reviews yet. Be the first to share your experience!' 
}) => {
  if (reviews.length === 0) {
    return (
      <div className="glass rounded-lg p-8 text-center light:bg-white light:border light:border-gray-200">
        <p className="text-primary-lighter light:text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div 
          key={review.id} 
          className="glass rounded-lg p-6 light:bg-white light:border light:border-gray-200"
        >
          <div className="flex items-start gap-4">
            <Avatar 
              src={review.userAvatar} 
              alt={review.userName} 
              fallback={review.userName.charAt(0)}
              size="lg"
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold light:text-gray-900">
                    {review.userName}
                    {review.verified && (
                      <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-primary-lighter light:text-gray-500">
                    {formatDate(review.date)}
                  </p>
                </div>
                <Rating value={review.rating} size={16} />
              </div>
              
              <p className="text-sm text-primary-lighter light:text-gray-700">
                {review.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
