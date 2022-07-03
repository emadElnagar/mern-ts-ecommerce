import styled from "styled-components";
import * as classes from './variables';

export const Nav = styled.nav `
  background: ${classes.secondary};
  color: ${classes.light};
  padding: 0 30px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Brand = styled.li `
  font-size: 1.2rem;
  text-transform: uppercase;
  color: ${classes.primary};
  z-index: 10000;
  &.active {
    color: #000;
  }
`

export const ListContainer = styled.div `
  display: flex;
  // MEDIUM SCREEN SIZE
  @media (max-width: 991px) {
    z-index: -1;
    width: 0;
    height: 100vh;
    transition: width .5s ease;
    padding-left: 20px;
    // WHEN CLASS ACTIVE IS ADDED
    &.active {
      display: flex;
      flex-direction: column;
      background: ${classes.light};
      color: #000;
      position: fixed;
      left: 0;
      top: 0;
      width: 200px;
      z-index: 999;
      li {
        margin-top: 20px;
        &:first-child {
          margin-top: 80px;
        }
      }
    }
  }
`

export const ListContainerIcon = styled.div`
  display: flex
`

export const ListItem = styled.li `
  text-transform: capitalize;
  padding: 0 10px;
  transition: all .3s ease;
  cursor: pointer;
  &:hover {
    color: ${classes.primary};
  }
`

export const Humburger = styled.div`
  display: none;
  cursor: pointer;
  transition: all 0.3s ease;
  @media (max-width: 991px) {
    display: inline;
    margin-left: 0.8rem;
    &.active {
      div:first-child {
        display: none;
      }
      div:nth-child(2) {
        transform: translateY(3px) rotate(45deg);
      }
      div:nth-child(3) {
        transform: translateY(-3px) rotate(-45deg);
      }
    }
  }
`

export const HumburgerDiv = styled.div`
  height: 2px;
  width: 20px;
  background: ${classes.light};
  margin-top: 4px;
`

export const SearchForm = styled.form`
  height: 35px;
  width: 100%;
  display: none;
  padding: 5px 0;
  &.active {
    display: flex;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0 5px;
  &:focus {
    outline: none
  }
`

export const SearchButton = styled.button`
  color: #000;
  padding: 0 20px;
  background: ${classes.primary};
  border: 1px solid ${classes.primary};
  cursor: pointer;
`
