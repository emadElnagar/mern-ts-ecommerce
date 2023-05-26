import { Fragment, SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Field, Input, Paragraph } from '../../styles/form';
import { Container, Section, Button, HeaderCenter } from '../../styles/main';
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';
import { Login } from '../../features/UserFeatures';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(Login({ email, password })).then(navigate('/'));
  }
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-login</title>
      </Helmet>
      <Container>
        <Section>
          <Form method='post' onSubmit={handleLogin}>
            <HeaderCenter>login</HeaderCenter>
            <Field>
              <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)} type="email" name="email" id='email' required />
              <label htmlFor="email">email</label>
            </Field>
            <Field>
              <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)} type="password" name="password" id='password' required />
              <label htmlFor="password">password</label>
            </Field>
            <Button type='submit'>login</Button>
            <Paragraph>
              don't have an account? <Link to='/users/register'>register</Link>
            </Paragraph>
          </Form>
        </Section>
      </Container>
    </Fragment>
  );
}

export default LoginPage;
