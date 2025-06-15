import { Fragment, useState } from "react";
import { IoMdStar } from "react-icons/io";

const Review = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Fragment>
      <div>
        {[...Array(5)].map((star, index) => {
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
      </div>
    </Fragment>
  );
};

export default Review;
