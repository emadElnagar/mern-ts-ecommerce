import { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";

import { IoIosLogOut } from "react-icons/io";
import { RiUser2Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLogin, TbUserPlus } from "react-icons/tb";
import { CiLock } from "react-icons/ci";

import {
  Nav,
  Container,
  Brand,
  Logo,
  NavLinks,
  NavActions,
  IconButton,
  CartBadge,
  SearchBox,
  MobileMenu,
  Dropdown,
  DropdownItem,
  Avatar,
  Hamburger,
  HamburgerLine,
  CloseButton,
} from "../styles/navbar";

import { Logout } from "../features/UserFeatures";
import { getCart } from "../features/CartFeatures";
import { API_URL } from "../API";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.cart);

  const [keyword, setKeyword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/");
  };

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    navigate(`/search/${keyword}`);
    setKeyword("");
    setSearchOpen(false);
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setUserMenu(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".search-input") && !target.closest(".user-menu")) {
        setMenuOpen(false);
        setSearchOpen(false);
        setUserMenu(false);
      }
      if (!target.closest(".search-input") && !target.closest(".user-menu")) {
        setMenuOpen(false);
        setSearchOpen(false);
        setUserMenu(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Fragment>
      <Nav>
        <Container>
          <Brand to="/">
            <Logo src="/voltaro-logo.png" />
          </Brand>

          <NavLinks $open={menuOpen}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/bestselling">Best Selling</NavLink>
          </NavLinks>

          <NavActions>
            <SearchBox $open={searchOpen}>
              <form onSubmit={searchHandler}>
                <input
                  placeholder="Search products..."
                  value={keyword}
                  className="search-input"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">
                  <AiOutlineSearch />
                </button>
              </form>
            </SearchBox>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setSearchOpen((p) => !p);
              }}
            >
              <AiOutlineSearch />
            </IconButton>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigate("/wishlist");
              }}
            >
              <AiOutlineHeart />
            </IconButton>

            <IconButton onClick={() => navigate("/cart")}>
              <AiOutlineShoppingCart />
              {cart?.length > 0 && <CartBadge>{cart.length}</CartBadge>}
            </IconButton>

            <div style={{ position: "relative" }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenu((p) => !p);
                }}
              >
                {user ? (
                  <Avatar
                    src={
                      user.image ? `${API_URL}/${user.image}` : "/user-icon.png"
                    }
                  />
                ) : (
                  <AiOutlineUser />
                )}
              </IconButton>

              {userMenu && (
                <Dropdown>
                  {user ? (
                    <>
                      <DropdownItem to={`/users/profile/${user._id}`}>
                        <RiUser2Fill /> Profile
                      </DropdownItem>

                      <DropdownItem to="/users/profile/settings">
                        <IoSettingsSharp /> Settings
                      </DropdownItem>

                      {user.role === "admin" && (
                        <DropdownItem to="/admin">
                          <CiLock /> Admin
                        </DropdownItem>
                      )}

                      <DropdownItem onClick={handleLogout}>
                        <IoIosLogOut /> Logout
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      <DropdownItem to="/users/login">
                        <TbLogin /> Login
                      </DropdownItem>

                      <DropdownItem to="/users/register">
                        <TbUserPlus /> Register
                      </DropdownItem>
                    </>
                  )}
                </Dropdown>
              )}
            </div>

            <Hamburger
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((p) => !p);
              }}
            >
              <HamburgerLine />
              <HamburgerLine />
              <HamburgerLine />
            </Hamburger>
          </NavActions>
        </Container>
      </Nav>

      {menuOpen && (
        <MobileMenu>
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
            }}
          >
            ✕
          </CloseButton>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/bestselling">Best Selling</NavLink>
        </MobileMenu>
      )}
    </Fragment>
  );
}

export default NavBar;
