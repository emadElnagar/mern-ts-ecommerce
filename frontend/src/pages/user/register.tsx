import { Fragment, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field, Input, Paragraph } from "../../styles/form";
import {
  Container,
  HeaderCenter,
  Section,
  FullButton,
} from "../../styles/main";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { SignUp, resetUserState } from "../../features/UserFeatures";
import LoadingBox from "../../components/LoadingBox";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state: any) => state.user);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetUserState());
    if (password !== passwordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password and confirm password do not match",
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    } else {
      dispatch(SignUp({ firstName, lastName, email, password }));
    }
  };
  if (user) {
    navigate("/");
  }
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-register</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : (
        <Container>
          <Section>
            <Form method="post" onSubmit={handleSignUp}>
              <HeaderCenter>sign up</HeaderCenter>
              <Field>
                <Input
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setFirstName(e.target.value)}
                  type="firstName"
                  id="firstName"
                  required
                />
                <label htmlFor="firstName">first name</label>
              </Field>
              <Field>
                <Input
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setLastName(e.target.value)}
                  type="lastName"
                  id="lastName"
                  required
                />
                <label htmlFor="lastName">last name</label>
              </Field>
              <Field>
                <Input
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  required
                />
                <label htmlFor="email">email</label>
              </Field>
              <Field>
                <Input
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  required
                />
                <label htmlFor="password">password</label>
              </Field>
              <Field>
                <Input
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setPasswordConfirm(e.target.value)}
                  type="password"
                  id="passwordConfirm"
                  required
                />
                <label htmlFor="passwordConfirm">confirm password</label>
              </Field>
              <FullButton type="submit">signup</FullButton>
              <Paragraph>
                have an account? <Link to="/users/login">login</Link>
              </Paragraph>
            </Form>
          </Section>
        </Container>
      )}
    </Fragment>
  );
}

export default RegisterPage;
