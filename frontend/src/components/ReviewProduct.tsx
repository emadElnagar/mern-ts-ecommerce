import { FormEvent, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { Button } from "../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { ReviewProduct } from "../features/ProductFeatures";
import { Link } from "react-router-dom";

type productProps = {
  slug: string;
};

const Review = (product: productProps) => {
  const { slug } = product;
  const dispatch = useDispatch();
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const { user } = useSelector((state: any) => state.user);
  // Handle review submission
  const handleReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(ReviewProduct({ rating, comment, slug }));
  };
  return user ? (
    <div className="review-form">
      <form onSubmit={(e) => handleReview(e)}>
        {[...Array(5)].map((_star, index) => {
          const currentRating = index + 1;
          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
              />
              <IoMdStar
                className="star"
                size={25}
                color={
                  currentRating <= (hover ?? rating ?? 0)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
        <textarea
          placeholder="Type your review"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <Button type="submit">Post</Button>
      </form>
    </div>
  ) : (
    <div className="review-redirect">
      Please&nbsp;
      <Link
        to={`/users/login?next=/products/${slug}`}
        className="review-redirect"
      >
        login
      </Link>
      &nbsp;to review this product.
    </div>
  );
};

export default Review;
