import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbLogin } from "react-icons/tb";
import { FaCashRegister } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { RiUser2Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
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
  CartCount,
} from "../styles/navbar";
import {
  Container,
  DropDown,
  DropDownButton,
  DropDownContent,
  DropDownItem,
  FlexBetweenRow,
  NavButton,
} from "../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../features/UserFeatures";
import { Image } from "../styles/main";

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [isActive, toggleIsActive] = useState(false);
  const [isSearch, toggleIsSearch] = useState(false);
  const [isDropDownActive, toggleIsDropDownActive] = useState(false);
  const { cart } = useSelector((state: any) => state.cart);
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
  // Handle search
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
    e.currentTarget.reset();
    toggleIsSearch(false);
  };
  // Close All Buttons when navigating
  useEffect(() => {
    toggleIsActive(false);
    toggleIsSearch(false);
    toggleIsDropDownActive(false);
  }, [location]);
  // Close all buttons when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".active") &&
        !target.closest(".user-img-i") &&
        !target.closest(".humburger") &&
        !target.closest(".search")
      ) {
        toggleIsActive(false);
        toggleIsSearch(false);
        toggleIsDropDownActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
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
                        ? `${process.env.REACT_APP_URL}/${user.image}`
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
                        <FlexBetweenRow>
                          <span>profile</span>
                          <span>
                            <RiUser2Fill />
                          </span>
                        </FlexBetweenRow>
                      </NavButton>
                    </Link>
                  </DropDownItem>
                  <DropDownItem>
                    <Link to={`/users/profile/settings`}>
                      <NavButton onClick={() => toggleIsDropDownActive(false)}>
                        <FlexBetweenRow>
                          <span>settings</span>
                          <span>
                            <IoSettingsSharp />
                          </span>
                        </FlexBetweenRow>
                      </NavButton>
                    </Link>
                  </DropDownItem>
                  {user.role === "admin" && (
                    <DropDownItem>
                      <Link to="/admin">
                        <NavButton
                          onClick={() => toggleIsDropDownActive(false)}
                        >
                          <FlexBetweenRow>
                            <span>admin</span>
                            <span>
                              <CiLock />
                            </span>
                          </FlexBetweenRow>
                        </NavButton>
                      </Link>
                    </DropDownItem>
                  )}
                  <DropDownItem>
                    <NavButton onClick={() => handleLogOut()}>
                      <FlexBetweenRow>
                        <span>logout</span>
                        <span>
                          <IoIosLogOut />
                        </span>
                      </FlexBetweenRow>
                    </NavButton>
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
                        <FlexBetweenRow>
                          <span>login</span>
                          <span>
                            <TbLogin />
                          </span>
                        </FlexBetweenRow>
                      </NavButton>
                    </Link>
                  </DropDownItem>
                  <DropDownItem>
                    <Link to="/users/register">
                      <NavButton onClick={() => toggleIsDropDownActive(false)}>
                        <FlexBetweenRow>
                          <span>register</span>
                          <span>
                            <FaCashRegister />
                          </span>
                        </FlexBetweenRow>
                      </NavButton>
                    </Link>
                  </DropDownItem>
                </DropDownContent>
              </DropDown>
            </ListItem>
          )}
          <ListItem onClick={toggleIsSearchHandler} className="search">
            <AiOutlineSearch />
          </ListItem>
          <Link to="/cart">
            <ListItem>
              <AiOutlineShoppingCart />
              {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
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
        <SearchForm
          className={`${isSearch === true ? "active" : ""}`}
          onSubmit={searchHandler}
        >
          <SearchInput
            placeholder="search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
          />
          <SearchButton type="submit">
            <AiOutlineSearch />
          </SearchButton>
        </SearchForm>
      </Container>
    </Fragment>
  );
}

export default NavBar;
