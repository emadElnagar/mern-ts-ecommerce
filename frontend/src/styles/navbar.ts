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
`

export const ListContainer = styled.div `
  display: flex;
`

export const ListItem = styled.li `
  text-transform: capitalize;
  padding: 0 10px;
  transition: all .3s ease;
  &:hover {
    color: ${classes.primary};
  }
`
