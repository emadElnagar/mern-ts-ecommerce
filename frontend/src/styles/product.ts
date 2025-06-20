import styled from "styled-components";
import * as vars from "./variables";

export const ProductDiv = styled.div`
  padding: 1.5rem 0;
  width: 100%;
  transition: 0.3s all ease;
  &:hover {
    box-shadow: 0 0 2px ${vars.secondary};
  }
`;
export const ProductHeader = styled.div`
  padding: 0;
`;

export const ProductTitle = styled.h2`
  text-align: center;
`;

export const ProductImg = styled.img`
  max-width: 100%;
`;

export const OriginalPrice = styled.span`
  color: #b71c1c;
  text-decoration: line-through;
`;

export const IconButton = styled.button`
  cursor: pointer;
  border: none;
  width: calc(50% - 2.5px);
  padding: 0.5rem;
  font-size: 1rem;
  background: ${vars.secondary};
  color: #fff;
  transition: 0.3s all ease;
  &:hover {
    color: ${vars.primary};
  }
`;
