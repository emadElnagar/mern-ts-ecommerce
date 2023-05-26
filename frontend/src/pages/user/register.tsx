import { Fragment, SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Field, Input, Paragraph } from '../../styles/form';
import { Container, Button, HeaderCenter, Section } from '../../styles/main';
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2';
import { SignUp } from '../../features/UserFeatures';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (! isNaN(Number(firstName))) {
      const errorMsg = `first name can't be a number`;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMsg,
      });
    } else if (! isNaN(Number(lastName))) {
      const errorMsg = `last name can't be a number`;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMsg,
      });
    } else if (firstName.length < 3 || firstName.length > 20) {
      const errorMsg = `first name must be between 3 characters and 20 characters`;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMsg,
      });
    } else if ((lastName.length < 3 || lastName.length > 20)) {
      const errorMsg = `last name must be between 3 characters and 20 characters`;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMsg,
      });
    } else if (password.length < 8) {
      const errorMsg = `password must be at least 8 characters`;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMsg,
      });
    } else if (password !== passwordConfirm) {
      const errorMsg = `password and confirm password doesn't match`;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMsg,
      });
    } else {
      dispatch(SignUp({ firstName, lastName, email, password })).then(navigate('/'));
    }
  }
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-register</title>
      </Helmet>
      <Container>
        <Section>
          <Form method='post' onSubmit={handleSignUp}>
            <HeaderCenter>sign up</HeaderCenter>
            <Field>
              <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFirstName(e.target.value)} type="firstName" id='firstName' required />
              <label htmlFor="firstName">first name</label>
            </Field>
            <Field>
              <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setLastName(e.target.value)} type="lastName" id='lastName' required />
              <label htmlFor="lastName">last name</label>
            </Field>
            <Field>
              <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)} type="email" id='email' required />
              <label htmlFor="email">email</label>
            </Field>
            <Field>
              <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)} type="password" id='password' required />
              <label htmlFor="password">password</label>
            </Field>
            <Field>
              <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPasswordConfirm(e.target.value)} type="password" id='passwordConfirm' required />
              <label htmlFor="passwordConfirm">confirm password</label>
            </Field>
            <Button type='submit'>signup</Button>
            <Paragraph>
              have an account? <Link to='/users/login'>login</Link>
            </Paragraph>
          </Form>
        </Section>
      </Container>
    </Fragment>
  );
}

export default RegisterPage;
