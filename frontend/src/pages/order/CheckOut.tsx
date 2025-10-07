import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Card,
  Container,
  FlexBetweenRow,
  FullButtonRounded,
  PaymentMethod,
  Section,
} from "../../styles/main";
import { Field, Label, RoundedInput } from "../../styles/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../features/OrderFeatures";
import { clearCart } from "../../features/CartFeatures";

type OrderItem = {
  _id: string;
  quantity: number;
};

const CheckOut = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BankTransfer");
  const { user } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartPrice = cart.reduce(
    (acc: number, item: any) =>
      acc + (item.price - (item.discount ?? 0)) * item.quantity,
    0
  );
  const taxPrice = 0.1 * cartPrice;
  const shippingPrice = cartPrice > 500 ? 0 : 15;
  const totalPrice = cartPrice + taxPrice + shippingPrice;

  const orderItems = cart.map(({ _id, quantity }: OrderItem) => ({
    product: _id,
    quantity,
  }));

  if (!user) {
    navigate("/users/login?next=/checkout");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      CreateOrder({
        orderItems,
        shippingAddress: {
          address: streetAddress,
          country,
          city,
          postalCode,
          phone,
          phone2,
        },
        paymentResult: {
          method: paymentMethod,
        },
      })
    )
      .unwrap()
      .then((_res: any) => {
        dispatch(clearCart());
        navigate(`/`);
      });
  };
  return (
    <Fragment>
      <Helmet>
        <title>checkout</title>
      </Helmet>
      <Container>
        {cart && cart.length > 0 ? (
          <FlexBetweenRow>
            <Section style={{ width: "70%" }}>
              <form>
                <Field>
                  <RoundedInput
                    type="text"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCountry(e.target.value)
                    }
                  />
                  <Label>Country</Label>
                </Field>
                <Field>
                  <RoundedInput
                    type="text"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCity(e.target.value)
                    }
                  />
                  <Label>City</Label>
                </Field>
                <Field>
                  <RoundedInput
                    type="text"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setStreetAddress(e.target.value)
                    }
                  />
                  <Label>Street address</Label>
                </Field>
                <Field>
                  <RoundedInput
                    type="text"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPostalCode(e.target.value)
                    }
                  />
                  <Label>Postal code</Label>
                </Field>
                <Field>
                  <RoundedInput
                    type="text"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPhone(e.target.value)
                    }
                  />
                  <Label>Phone</Label>
                </Field>
                <Field>
                  <RoundedInput
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPhone2(e.target.value)
                    }
                  />
                  <Label>Phone 2 ( optional )</Label>
                </Field>
              </form>
            </Section>
            <Section>
              <Card>
                <h2>Order Summary</h2>
                <div>
                  <div className="row">
                    <span>Items:</span>
                    <span>{cart.length}</span>
                  </div>
                  <div className="row">
                    <span>Price:</span>
                    <span>${cartPrice.toFixed(2)}</span>
                  </div>
                  <div className="row">
                    <span>Shipping:</span>
                    <span>${shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="row">
                    <span>Tax:</span>
                    <span>${taxPrice.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="row">
                    <span>Total:</span>
                    <span>{totalPrice.toFixed(2)}</span>
                  </div>
                  <PaymentMethod>
                    <div>
                      <input
                        type="radio"
                        id="BankTransfer"
                        name="payment"
                        value="BankTransfer"
                        defaultChecked
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPaymentMethod(e.target.value)
                        }
                      />
                      <label htmlFor="BankTransfer">Direct bank transfer</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="paypal"
                        name="payment"
                        value="paypal"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPaymentMethod(e.target.value)
                        }
                      />
                      <label htmlFor="paypal">Paypal</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="Stripe"
                        name="payment"
                        value="Stripe"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPaymentMethod(e.target.value)
                        }
                      />
                      <label htmlFor="Stripe">Stripe</label>
                    </div>
                  </PaymentMethod>
                </div>
                <FullButtonRounded onClick={handleSubmit}>
                  Place Order
                </FullButtonRounded>
              </Card>
            </Section>
          </FlexBetweenRow>
        ) : (
          <div className="text-center">
            <h2>Your cart is empty</h2>
            <Button onClick={() => navigate("/products")}>
              Return to shop
            </Button>
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default CheckOut;
