import { API_URL } from "../API";
import RatingStars from "./RatingStars";

type Review = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    image?: string;
  };
};

const ReviewItem = (review: Review) => {
  return (
    <div className="review">
      <div className="review-user">
        <img
          src={`${
            review.user.image
              ? `${API_URL}/${review.user.image}`
              : `${"/user-icon-2098873_640.png"}`
          }`}
          alt="user"
        />
        <span className="user-name">
          {review.user.firstName} {review.user.lastName}
        </span>
        <span className="review-date">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="review-content">
        <p>
          <RatingStars rating={review.rating} />
        </p>
        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
