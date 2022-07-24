import styled from "styled-components";
import * as vars from './variables';

export const FooterEle = styled.div `
  display: flex;
  justify-content: space-between;
  padding: 4rem 6rem;
  flex-wrap: wrap;
  color: ${vars.fontClr};
  background: ${vars.light};
`

export const ListItem = styled.li `
  margin: 1rem 0;
  transition: all .3s ease;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    color: ${vars.primary}
  }
`

export const Header = styled.h2 `
  margin-bottom: 2rem
`

export const Summary = styled.div `
  width: 40%;
`

export const CopyRight = styled.div `
  background: ${vars.shadow};
  text-align: center;
  color: #fff;
  padding: 5px 0;
`

export const Subscribe = styled.div`
  background: ${vars.primary};
  color: ${vars.fontClr};
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`

export const SubscribeForm = styled.form`
  display: flex;
  width: 80%
`

export const SubscribeInput = styled.input`
  height: 2rem;
  width: 100%;
  padding: 0 5px;
  &:focus {
    outline: none;
  }
`

export const SubscribeButton = styled.button`
  background: ${vars.secondary};
  color: ${vars.light};
  text-transform: capitalize;
  cursor: pointer;
  border: none;
  padding: 0 1rem;
`
