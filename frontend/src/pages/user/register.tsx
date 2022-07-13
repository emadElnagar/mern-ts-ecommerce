import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field, Input, Paragraph } from '../../styles/form';
import { Container, Button, HeaderCenter, Section } from '../../styles/main';
import { Helmet } from "react-helmet";
import axios from 'axios';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/register', {
      firstName,
      lastName,
      email,
      password
    });
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    console.log(passwordConfirm);
  }
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-register</title>
      </Helmet>
      <Container>
        <Section>
          <Form method='post' onSubmit={handleLogin}>
            <HeaderCenter>sign up</HeaderCenter>
            <Field>
              <Input onChange={(e) => setFirstName(e.target.value)} type="firstName" id='firstName' required />
              <label htmlFor="firstName">first name</label>
            </Field>
            <Field>
              <Input onChange={(e) => setLastName(e.target.value)} type="lastName" id='lastName' required />
              <label htmlFor="lastName">last name</label>
            </Field>
            <Field>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" id='email' required />
              <label htmlFor="email">email</label>
            </Field>
            <Field>
              <Input onChange={(e) => setPassword(e.target.value)} type="password" id='password' required />
              <label htmlFor="password">password</label>
            </Field>
            <Field>
              <Input onChange={(e) => setPasswordConfirm(e.target.value)} type="password" id='passwordConfirm' required />
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
