import {
  FooterEle,
  Header,
  Summary,
  ListItem,
  CopyRight,
  Subscribe,
  SubscribeForm,
  SubscribeInput,
  SubscribeButton,
} from "../styles/footer";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

function Footer() {
  return (
    <footer>
      <Subscribe>
        <SubscribeForm>
          <SubscribeInput placeholder="Subscribe for news letter" />
          <SubscribeButton>Subscribe</SubscribeButton>
        </SubscribeForm>
      </Subscribe>
      <FooterEle>
        <Summary>
          <Header>summary</Header>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Summary>
        <div>
          <Header>links</Header>
          <ul>
            <ListItem>
              <Link to="/">home</Link>
            </ListItem>
            <ListItem>
              <Link to="/products">products</Link>
            </ListItem>
            <ListItem>
              <Link to="/bestselling">best selling</Link>
            </ListItem>
          </ul>
        </div>
        <div>
          <Header>follow us</Header>
          <ul>
            <ListItem>
              <AiFillFacebook /> facebook
            </ListItem>
            <ListItem>
              <AiFillLinkedin /> linkedin
            </ListItem>
            <ListItem>
              <AiFillTwitterSquare /> twitter
            </ListItem>
            <ListItem>
              <AiFillInstagram /> instagram
            </ListItem>
          </ul>
        </div>
      </FooterEle>
      <CopyRight>Copyright &copy; 2022 by Emad Elnagar</CopyRight>
    </footer>
  );
}

export default Footer;
