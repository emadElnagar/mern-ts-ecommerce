import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import {
  Nav,
  Brand,
  ListContainer,
  ListContainerIcon,
  ListItem,
  Humburger,
  HumburgerDiv,
  SearchForm,
  SearchInput,
  SearchButton,
} from "../styles/navbar";
import {
  Container,
  DropDown,
  DropDownButton,
  DropDownContent,
  DropDownItem,
  NavButton,
} from "../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../features/UserFeatures";
import { Image } from "../styles/main";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, toggleIsActive] = useState(false);
  const [isSearch, toggleIsSearch] = useState(false);
  const [isDropDownActive, toggleIsDropDownActive] = useState(false);
  const toggleIsActiveHandler = () => {
    toggleIsDropDownActive(false);
    toggleIsSearch(false);
    isActive === false ? toggleIsActive(true) : toggleIsActive(false);
  };
  const toggleIsSearchHandler = () => {
    toggleIsDropDownActive(false);
    toggleIsActive(false);
    isSearch === false ? toggleIsSearch(true) : toggleIsSearch(false);
  };
  const handleDropDown = () => {
    toggleIsActive(false);
    toggleIsSearch(false);
    isDropDownActive === false
      ? toggleIsDropDownActive(true)
      : toggleIsDropDownActive(false);
  };
  const { user } = useSelector((state: any) => state.user);
  const handleLogOut = () => {
    toggleIsDropDownActive(false);
    dispatch(Logout());
    navigate("/");
  };
  return (
    <Fragment>
      <Nav>
        <Brand className={`${isActive === true ? "active" : ""}`}>
          <Link to="/">electronics</Link>
        </Brand>
        <ListContainer className={`${isActive === true ? "active" : ""}`}>
          <ListItem>
            <Link to="/">home</Link>
          </ListItem>
          <ListItem>
            <Link to="/products">products</Link>
          </ListItem>
          <ListItem>
            <Link to="/collections">collections</Link>
          </ListItem>
        </ListContainer>
        <ListContainerIcon>
          {user ? (
            <ListItem>
              <DropDownButton
                className={`${isDropDownActive === true ? "active" : ""}`}
                onClick={handleDropDown}
              >
                {
                  <Image
                    className="user-img-i"
                    src={`${
                      user.image
                        ? `http://localhost:5000/${user.image}`
                        : `${
                            process.env.PUBLIC_URL +
                            "/user-icon-2098873_640.png"
                          }`
                    }`}
                  />
                }
              </DropDownButton>
              <DropDown>
                <DropDownContent
                  className={`${isDropDownActive === true ? "active" : ""}`}
                >
                  <DropDownItem>
                    <Link to={`/users/profile/${user._id}`}>
                      <NavButton onClick={() => toggleIsDropDownActive(false)}>
                        profile
                      </NavButton>
                    </Link>
                  </DropDownItem>
                  <DropDownItem>
                    <Link to={`/users/profile/settings`}>
                      <NavButton onClick={() => toggleIsDropDownActive(false)}>
                        settings
                      </NavButton>
                    </Link>
                  </DropDownItem>
                  {user.role === "admin" && (
                    <DropDownItem>
                      <Link to="/admin">
                        <NavButton
                          onClick={() => toggleIsDropDownActive(false)}
                        >
                          admin
                        </NavButton>
                      </Link>
                    </DropDownItem>
                  )}
                  <DropDownItem>
                    <NavButton onClick={() => handleLogOut()}>logout</NavButton>
                  </DropDownItem>
                </DropDownContent>
              </DropDown>
            </ListItem>
          ) : (
            <ListItem>
              <DropDownButton
                className={`${isDropDownActive === true ? "active" : ""}`}
                onClick={handleDropDown}
              >
                <AiOutlineUser />
              </DropDownButton>
              <DropDown>
                <DropDownContent
                  className={`${isDropDownActive === true ? "active" : ""}`}
                >
                  <DropDownItem>
                    <Link to="/users/login">
                      <NavButton onClick={() => toggleIsDropDownActive(false)}>
                        login
                      </NavButton>
                    </Link>
                  </DropDownItem>
                  <DropDownItem>
                    <Link to="/users/register">
                      <NavButton onClick={() => toggleIsDropDownActive(false)}>
                        register
                      </NavButton>
                    </Link>
                  </DropDownItem>
                </DropDownContent>
              </DropDown>
            </ListItem>
          )}
          <ListItem onClick={toggleIsSearchHandler}>
            <AiOutlineSearch />
          </ListItem>
          <Link to="/cart">
            <ListItem>
              <AiOutlineShoppingCart />
            </ListItem>
          </Link>
          <Link to="/wishlist">
            <ListItem>
              <AiOutlineHeart />
            </ListItem>
          </Link>
          <Humburger
            onClick={toggleIsActiveHandler}
            className={`${isActive === true ? "active" : ""}`}
          >
            <HumburgerDiv></HumburgerDiv>
            <HumburgerDiv></HumburgerDiv>
            <HumburgerDiv></HumburgerDiv>
          </Humburger>
        </ListContainerIcon>
      </Nav>
      <Container>
        <SearchForm className={`${isSearch === true ? "active" : ""}`}>
          <SearchInput placeholder="search" />
          <SearchButton type="submit">
            <AiOutlineSearch />
          </SearchButton>
        </SearchForm>
      </Container>
    </Fragment>
  );
}

export default NavBar;
