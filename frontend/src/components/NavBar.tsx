import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { Nav, Brand, ListContainer, ListContainerIcon,  ListItem, Humburger, HumburgerDiv } from '../styles/navbar'

function NavBar() {
  const [isActive, toggleIsActive] = useState(false);
  const toggleIsActiveHandler = () => {
    isActive === false ? toggleIsActive(true) : toggleIsActive(false);
  }
  return (
    <Nav>
      <Brand className={`${isActive === true ? 'active' : ''}`}>
        <Link to='/'>electronics</Link>
      </Brand>
      <ListContainer className={`${isActive === true ? 'active' : ''}`}>
        <ListItem><Link to='/'>home</Link></ListItem>
        <ListItem><Link to='/products'>products</Link></ListItem>
        <ListItem><Link to='/collections'>collections</Link></ListItem>
      </ListContainer>
      <ListContainerIcon>
        <ListItem><AiOutlineUser /></ListItem>
        <ListItem><AiOutlineSearch /></ListItem>
        <ListItem><AiOutlineShoppingCart /></ListItem>
        <ListItem><AiOutlineHeart /></ListItem>
        <Humburger onClick={toggleIsActiveHandler} className={`${isActive === true ? 'active' : ''}`}>
          <HumburgerDiv></HumburgerDiv>
          <HumburgerDiv></HumburgerDiv>
          <HumburgerDiv></HumburgerDiv>
        </Humburger>
      </ListContainerIcon>
    </Nav>
  );
}

export default NavBar;
