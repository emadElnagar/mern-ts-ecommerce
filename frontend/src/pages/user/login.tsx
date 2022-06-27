import { Fragment } from 'react';
import { Form, Field, Input } from '../../styles/form';
import { Container } from '../../styles/main';

function LoginPage() {
  return (
    <Fragment>
      <Container>
        <Form>
          <h1>login</h1>
          <Field>
            <Input type="email" id='email' required />
            <label htmlFor="email">email</label>
          </Field>
          <Field>
            <Input type="password" id='password' required />
            <label htmlFor="password">password</label>
          </Field>
        </Form>
      </Container>
    </Fragment>
  );
}

export default LoginPage;
