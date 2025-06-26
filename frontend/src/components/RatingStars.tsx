import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

type RatingStarsProps = {
  rating: number;
};

const ReviewStars = ({ rating }: RatingStarsProps) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <IoMdStar key={i} className="star" size={20} color="#ffc107" />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <IoMdStarHalf key={i} className="star" size={20} color="#ffc107" />
      );
    } else {
      stars.push(
        <IoMdStarOutline key={i} className="star" size={20} color="#e4e5e9" />
      );
    }
  }

  return <div className="review-stars">{stars}</div>;
};

export default ReviewStars;
