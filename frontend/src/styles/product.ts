import styled from "styled-components";
import * as classes from "./variables";

export const ProductDiv = styled.div`
  transition: 0.3s all ease;
  &:hover {
    box-shadow: 0 0 2px ${classes.secondary};
    transform: translatey(-10px);
  }
`;
export const ProductHeader = styled.div`
  padding: 0.7rem 0;
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
  background: transparent;
  border: none;
`;
