import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your_publishable_key_here");

const appearance = {
  theme: "night" as const,
  variables: {
    colorPrimary: "#635bff",
    colorBackground: "#1e1e1e",
    colorText: "#ffffff",
    colorDanger: "#ff4d4f",
    fontFamily: "Arial, sans-serif",
  },
  styles: {
    base: {
      margin: "10px 0",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: "#1e1e1e",
      fontSize: "16px",
      color: "#ffffff",
      "::placeholder": {
        color: "#888888",
      },
    },
    invalid: {
      color: "#ff4d4f",
    },
  },
};

const StripeForm = () => {
  return (
    <div className="stripe-form">
      <Elements stripe={stripePromise} options={{ appearance }}>
        <form>
          <CardElement />
        </form>
      </Elements>
    </div>
  );
};

export default StripeForm;
