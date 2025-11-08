import styled from "styled-components";
import * as vars from "./variables";

export const ProductCard = styled.div`
  position: relative;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  width: 260px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-align: center;
  padding: 20px;
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    background-color: #fafafa;
  }
`;

export const ProductName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin: 10px 0;
`;

export const ProductImg = styled.img`
  width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

export const CardButton = styled.button`
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 8px 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  &.cart-btn {
    background-color: ${vars.primary};
    color: #000;
    &:hover {
      background-color: #d97706;
    }
  }
  &.wish-btn {
    background-color: #f0f0f0;
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

export const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

export const FinalPrice = styled.span`
  margin-inline-end: 1rem;
`;

export const OldPrice = styled.span`
  color: #aaa;
  text-decoration: line-through;
  margin-left: 6px;
  font-size: 0.9rem;
`;

export const Badge = styled.span`
  position: absolute;
  top: 22px;
  left: 22px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  &.discount {
    background: #e63946;
    color: #fff;
  }
`;
