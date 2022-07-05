import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field, Input, Paragraph } from '../../styles/form';
import { Container, Section, Button, HeaderCenter } from '../../styles/main';
import { Helmet } from "react-helmet";

function LoginPage() {
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-login</title>
      </Helmet>
      <Container>
        <Section>
          <Form>
            <HeaderCenter>login</HeaderCenter>
            <Field>
              <Input type="email" id='email' required />
              <label htmlFor="email">email</label>
            </Field>
            <Field>
              <Input type="password" id='password' required />
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
