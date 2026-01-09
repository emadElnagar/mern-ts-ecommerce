import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetOrder } from "../../features/OrderFeatures";
import {
  Card,
  Circle,
  Container,
  Line,
  Section,
  Step,
  StepLabel,
  Timeline,
} from "../../styles/main";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";

const TrackOrder = () => {
  const disptach = useDispatch();
  const { id } = useParams();
  const { isLoading, order, error } = useSelector((state: any) => state.order);
  useEffect(() => {
    disptach(GetOrder(id));
  }, [disptach, id]);
  const steps = ["Pending", "Processing", "Out for Delivery", "Delivered"];
  const SHIPPING_STATUS_TO_INDEX: Record<(typeof steps)[number], number> = {
    Pending: 0,
    Processing: 1,
    "Out for Delivery": 2,
    Delivered: 3,
  };
  const currentStep =
    order?.shippingStatus && order.shippingStatus !== "Canceled"
      ? SHIPPING_STATUS_TO_INDEX[order.shippingStatus]
      : -1;
  return (
    <Fragment>
      <Helmet>
        <title>Voltrao Track Order</title>
      </Helmet>
      <Container>
        <Section>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox message={error} />
          ) : (
            order && (
              <Card>
                {order.shippingStatus === "Canceled" ? (
                  <ErrorBox message="This order has been canceled." />
                ) : (
                  <Timeline>
                    {steps.map((step, index) => (
                      <Step key={step}>
                        <Circle active={index <= currentStep} />
                        <StepLabel active={index <= currentStep}>
                          {step}
                        </StepLabel>
                        {index < steps.length - 1 && (
                          <Line active={index < currentStep} />
                        )}
                      </Step>
                    ))}
                  </Timeline>
                )}
              </Card>
            )
          )}
        </Section>
      </Container>
    </Fragment>
  );
};

export default TrackOrder;
