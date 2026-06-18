import styled from "styled-components";
import * as vars from "./variables";
import { NavLink as Link } from "react-router-dom";

export const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;

  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.75);

  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

export const Container = styled.div`
  height: 70px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 110px;
`;

export const NavLinks = styled.div<{ $open: boolean }>`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: #111;
    font-weight: 500;
    position: relative;

    &.active::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 100%;
      height: 2px;
      background: ${vars.primary};
    }
  }

  @media (max-width: 900px) {
    display: ${(p) => (p.$open ? "flex" : "none")};
    position: fixed;
    inset: 0;
    flex-direction: column;
    padding: 80px 30px;
    background: white;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconButton = styled.button`
  position: relative;

  width: 42px;
  height: 42px;

  border-radius: 50%;
  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;

  width: 18px;
  height: 18px;

  border-radius: 50%;

  background: #ff3b3b;
  color: white;

  font-size: 11px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchBox = styled.div<{ $open: boolean }>`
  display: ${(p) => (p.$open ? "flex" : "none")};

  position: absolute;
  top: 75px;
  right: 24px;

  background: white;
  padding: 8px;
  border-radius: 999px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  input {
    border: none;
    outline: none;
    padding: 6px 10px;
    width: 220px;
  }

  button {
    border: none;
    background: #111;
    color: white;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 55px;

  width: 180px;

  background: white;
  border-radius: 12px;

  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);

  overflow: hidden;
`;

export const DropdownItem = styled(Link)<any>`
  display: flex;
  gap: 10px;
  align-items: center;

  padding: 12px 14px;
  text-decoration: none;
  color: #111;

  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 4px;

  cursor: pointer;

  @media (max-width: 900px) {
    display: flex;
  }
`;

export const HamburgerLine = styled.div`
  width: 22px;
  height: 2px;
  background: #111;
`;

export const MobileMenu = styled.div`
  position: fixed;
  inset: 70px 0 0 0;

  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);

  display: flex;
  flex-direction: column;

  padding: 30px;
  gap: 20px;

  z-index: 9999;

  a {
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: #111;

    padding: 10px 0;

    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  width: 40px;
  height: 40px;

  border: none;
  background: transparent;

  font-size: 24px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
