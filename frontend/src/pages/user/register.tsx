import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field, Input, Paragraph } from '../../styles/form';
import { Container, Button, HeaderCenter, Section } from '../../styles/main';

function RegisterPage() {
  return (
    <Fragment>
      <Container>
        <Section>
          <Form>
            <HeaderCenter>sign up</HeaderCenter>
            <Field>
              <Input type="firstName" id='firstName' required />
              <label htmlFor="firstName">firstName</label>
            </Field>
            <Field>
              <Input type="lastName" id='lastName' required />
              <label htmlFor="lastName">lastName</label>
            </Field>
            <Field>
              <Input type="email" id='email' required />
              <label htmlFor="email">email</label>
            </Field>
            <Field>
              <Input type="password" id='password' required />
              <label htmlFor="password">password</label>
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
