import { Fragment, SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Field, Input, Paragraph } from '../../styles/form';
import { Container, Section, Button, HeaderCenter } from '../../styles/main';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../features/UserFeatures';
import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state: any) => state.user);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(Login({ email, password }));
  }
  if (user) {
    navigate('/');
  }
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-login</title>
      </Helmet>
      {
        loading ? <LoadingBox /> :
        error ? <ErrorBox message={ error.message } /> :
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
      }
    </Fragment>
  );
}

export default LoginPage;
