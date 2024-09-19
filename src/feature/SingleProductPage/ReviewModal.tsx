import React, { useState } from "react";
import { ReviewCreateDto } from "../../models/review/reviewDto";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewData: ReviewCreateDto) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  const handleSubmit = () => {
    const reviewData = {
      productId: "",
      userId: "",
      reviewDate: new Date(),
      rating,
      reviewText,
      reviewerName: "",
    };
    onSubmit(reviewData);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-6 w-96 mx-auto mt-20 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Rating</label>
          <input
            type="number"
            value={rating}
            min="0"
            max="5"
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Review</label>
          <textarea
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here"
          />
        </div>
        <div className="flex justify-end">
          <button className="mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
