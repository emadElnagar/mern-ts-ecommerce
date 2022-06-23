import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Header, Paragraph, Div, Span } from '../styles/error';

function ErrorPage() {
  return (
    <Fragment>
      <div className='container'>
        <Header>404</Header>
        <Paragraph>oops, page not found</Paragraph>
        <Div>
          <Link to='/'><Span>take me home</Span></Link>
        </Div>
      </div>
    </Fragment>
  );
}

export default ErrorPage;
