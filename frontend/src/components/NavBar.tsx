import React from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { Nav, Brand, ListContainer, ListItem } from '../styles/navbar'

function NavBar() {
  return (
    <Nav>
      <Brand>
        ecommerce
      </Brand>
      <ListContainer>
        <ListItem>home</ListItem>
        <ListItem>products</ListItem>
        <ListItem>collections</ListItem>
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
