import { Fragment } from 'react';
import { Form, Field, Input } from '../../styles/form';

function LoginPage() {
  return (
    <Fragment>
      <div className='container'>
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
      </div>
    </Fragment>
  );
}

export default LoginPage;
