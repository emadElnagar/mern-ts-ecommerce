import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { Nav, Brand, ListContainer, ListItem } from '../styles/navbar'

function NavBar() {
  return (
    <Nav>
      <Brand>
        <Link to='/'>ecommerce</Link>
      </Brand>
      <ListContainer>
        <ListItem><Link to='/'>home</Link></ListItem>
        <ListItem><Link to='/products'>products</Link></ListItem>
        <ListItem><Link to='/collections'>collections</Link></ListItem>
      </ListContainer>
      <ListContainer>
        <ListItem><AiOutlineSearch /></ListItem>
        <ListItem><AiOutlineShoppingCart /></ListItem>
        <ListItem><AiOutlineHeart /></ListItem>
      </ListContainer>
    </Nav>
  );
}

export default NavBar;
