import styled from "styled-components";
import * as classes from './variables';

export const FooterEle = styled.div `
  display: flex;
  justify-content: space-between;
  padding: 60px 100px;
  flex-wrap: wrap;
  color: ${classes.light};
  background: ${classes.secondary}
`

export const ListItem = styled.li `
  margin: 30px 0;
  transition: all .3s ease;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    color: ${classes.primary}
  }
`

export const Header = styled.h2 `
  margin-bottom: 30px
`

export const Summary = styled.div `
  width: 40%;
`

export const CopyRight = styled.div `
  background: #000;
  text-align: center;
  color: #fff;
  padding: 5px 0;
`
