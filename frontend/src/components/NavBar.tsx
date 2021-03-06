import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { Nav, Brand, ListContainer, ListContainerIcon,  ListItem, Humburger, HumburgerDiv, SearchForm, SearchInput, SearchButton } from '../styles/navbar'
import { Button, Container, DropDown, DropDownButton, DropDownContent, DropDownItem } from '../styles/main';

function NavBar() {
  const [isActive, toggleIsActive] = useState(false);
  const [isSearch, toggleIsSearch] = useState(false);
  const [isDropDownActive, toggleIsDropDownActive] = useState(false);
  const toggleIsActiveHandler = () => {
    isActive === false ? toggleIsActive(true) : toggleIsActive(false);
  }
  const toggleIsSearchHandler = () => {
    isSearch === false ? toggleIsSearch(true) : toggleIsSearch(false);
  }
  const handleDropDown = () => {
    isDropDownActive === false ? toggleIsDropDownActive(true) : toggleIsDropDownActive(false);
  }
  return (
    <Fragment>
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
          <ListItem>
            <DropDownButton className={`${isDropDownActive === true ? 'active' : ''}`} onClick={handleDropDown}>
              <AiOutlineUser />
            </DropDownButton>
            <DropDown>
              <DropDownContent className={`${isDropDownActive === true ? 'active' : ''}`}>
                <DropDownItem>
                  <Link to='/users/login'>
                    <Button onClick={() => toggleIsDropDownActive(false)}>login</Button>
                  </Link>
                </DropDownItem>
                <DropDownItem>
                  <Link to='/users/register'>
                    <Button onClick={() => toggleIsDropDownActive(false)}>register</Button>
                  </Link>
                </DropDownItem>
              </DropDownContent>
            </DropDown>
          </ListItem>
          <ListItem onClick={toggleIsSearchHandler}><AiOutlineSearch /></ListItem>
          <Link to='/cart'>
            <ListItem><AiOutlineShoppingCart /></ListItem>
          </Link>
          <Link to='/wishlist'>
            <ListItem><AiOutlineHeart /></ListItem>
          </Link>
          <Humburger onClick={toggleIsActiveHandler} className={`${isActive === true ? 'active' : ''}`}>
            <HumburgerDiv></HumburgerDiv>
            <HumburgerDiv></HumburgerDiv>
            <HumburgerDiv></HumburgerDiv>
          </Humburger>
        </ListContainerIcon>
      </Nav>
      <Container>
        <SearchForm className={`${isSearch === true ? 'active' : ''}`}>
          <SearchInput placeholder='search' />
          <SearchButton type='submit'><AiOutlineSearch /></SearchButton>
        </SearchForm>
      </Container>
    </Fragment>
  );
}

export default NavBar;
