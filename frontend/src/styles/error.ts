import styled from "styled-components";
import * as classes from './variables';

export const Header = styled.h1 `
  font-size: 8rem;
  text-align: center;
  margin-top: 7rem;
`

export const Paragraph = styled.p `
  font-size: 3rem;
  text-align: center;
  margin: 2rem 0;
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
  padding: .8rem 3rem;
  background: ${classes.primary};
  border: 1px solid ${classes.primary};
  transition: all .3s ease;
  &:hover {
    padding: .8rem 4rem
  }
`
