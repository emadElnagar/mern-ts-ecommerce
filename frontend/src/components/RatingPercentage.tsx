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
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = ratingCounts[rating as 1 | 2 | 3 | 4 | 5];
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

        return (
          <div key={rating} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{rating} star</span>
              <span>
                {count} ({Math.round(percentage)}%)
              </span>
            </div>
            <div
              style={{
                height: 10,
                backgroundColor: "#eee",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: "100%",
                  backgroundColor: "#fed700",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingPercentage;
