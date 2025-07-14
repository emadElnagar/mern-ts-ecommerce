type Review = {
  rating: number;
};

interface RatingStatsProps {
  reviews: Review[];
}

const RatingPercentage: React.FC<RatingStatsProps> = ({ reviews }) => {
  const ratingCounts = reviews.reduce(
    (acc: { [key in 1 | 2 | 3 | 4 | 5]: number }, review) => {
      const rating = review.rating;
      if (rating >= 1 && rating <= 5) {
        acc[rating as 1 | 2 | 3 | 4 | 5] += 1;
      }
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  const totalReviews = reviews.length;

  return (
    <div>
      <h3>Rating Breakdown</h3>
      {[1, 2, 3, 4, 5].map((rating) => {
        const count = ratingCounts[rating as 1 | 2 | 3 | 4 | 5];
        const percentage =
          totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(1) : "0";
        return (
          <p key={rating}>
            {rating}: {count} review(s) — {percentage}%
          </p>
        );
      })}
    </div>
  );
};

export default RatingPercentage;
