import { Fragment, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { Button } from "../styles/main";

const Review = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Fragment>
      <div className="review-container">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <>
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
            </>
          );
        })}
        <textarea placeholder="Type your review" />
        <Button type="submit">Post</Button>
      </div>
    </Fragment>
  );
};

export default Review;
