import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Header, Paragraph, Div, Span } from '../styles/error';
import { Container } from '../styles/main';

function ErrorPage() {
  return (
    <Fragment>
      <Container>
        <Header>404</Header>
        <Paragraph>oops, page not found</Paragraph>
        <Div>
          <Link to='/'><Span>take me home</Span></Link>
        </Div>
      </Container>
    </Fragment>
  );
}

export default ErrorPage;
