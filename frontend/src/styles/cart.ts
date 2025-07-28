import styled from "styled-components";
import { danger, primary, secondary } from "./variables";

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 2rem auto;
  width: 95%;
  max-width: 1000px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  font-weight: bold;
`;

export const TableData = styled.td`
  padding: 1rem;
  vertical-align: middle;
  font-size: 0.95rem;
`;

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 1rem;
  flex-shrink: 0;
`;

export const QuantityInput = styled.input`
  width: 60px;
  padding: 5px;
  font-size: 1rem;
`;

export const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
  &:hover {
    background-color: ${danger};
  }
`;

export const CheckoutButton = styled.button`
  background-color: ${primary};
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${secondary};
    color: #fff;
  }
  text-align: center;
  display: block;
`;
