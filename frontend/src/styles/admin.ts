import { styled } from "styled-components";
import { shadow } from "./variables";

export const Nav = styled.div`
  border-right: 1px solid ${shadow};
  width: 250px;
  height: 100vh
`

export const Content = styled.div`
  width: calc(100% - 250px);
`
