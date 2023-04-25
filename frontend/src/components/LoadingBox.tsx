import { Fragment, CSSProperties } from "react";
import ClockLoader from "react-spinners/ClockLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const LoadingBox = () => {
  return (
    <Fragment>
      <ClockLoader
        color='#e040fb'
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Fragment>
  )
}

export default LoadingBox;
