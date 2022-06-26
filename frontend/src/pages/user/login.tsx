import { Fragment } from 'react';
import { Form, Field } from '../../styles/form';

function LoginPage() {
  return (
    <Fragment>
      <div className='container'>
        <Form>
          <h1>login</h1>
          <Field>
            <label htmlFor="email">email</label>
            <input type="email" id='email' required />
          </Field>
          <Field>
            <label htmlFor="password">password</label>
            <input type="password" id='password' required />
          </Field>
        </Form>
      </div>
    </Fragment>
  );
}

export default LoginPage;
