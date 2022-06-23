import styled from "styled-components";
import * as classes from './variables';

export const Header = styled.h1 `
  font-size: 150px;
  text-align: center;
  margin-top: 120px;
`

export const Paragraph = styled.p `
  font-size: 50px;
  text-align: center;
  margin: 30px 0;
  text-transform: capitalize;
`

export const Div = styled.div `
  display: flex;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 120px;
`

export const Span = styled.span `
  font-size: 18px;
  padding: 10px 25px;
  background: ${classes.primary};
  border: 1px solid ${classes.primary};
  transition: all .3s ease;
  &:hover {
    background: transparent;
    color: ${classes.primary};
  }
`
