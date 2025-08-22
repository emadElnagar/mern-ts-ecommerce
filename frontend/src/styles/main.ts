import styled from "styled-components";
import * as vars from "./variables";

export const Container = styled.div`
  margin: auto;
  @media (min-width: 1200px) {
    width: 1140px;
  }
  @media (max-width: 1199px) {
    width: 960px;
  }
  @media (max-width: 991px) {
    width: 720px;
  }
  @media (max-width: 767px) {
    width: 540px;
  }
  @media (max-width: 576px) {
    max-width: 100%;
  }
`;

export const Section = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
`;

export const Button = styled.button`
  background: ${vars.primary};
  text-transform: capitalize;
  border: 1px solid ${vars.primary};
  padding: 10px 15px;
  cursor: pointer;
`;

export const ButtonRoundedStart = styled.button`
  background: ${vars.primary};
  text-transform: capitalize;
  border: 1px solid ${vars.primary};
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50px 0 0 50px;
`;

export const ButtonRoundedEnd = styled.button`
  background: ${vars.primary};
  text-transform: capitalize;
  border: 1px solid ${vars.primary};
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 0 50px 50px 0;
`;

export const LightedSpan = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`;

export const FullButton = styled.button`
  background: ${vars.primary};
  text-transform: capitalize;
  border: 1px solid ${vars.primary};
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
`;

export const FullButtonRounded = styled.button`
  background: ${vars.primary};
  text-transform: capitalize;
  border: 1px solid ${vars.primary};
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  border-radius: 50px;
`;

export const NavButton = styled.button`
  background: transparent;
  text-transform: capitalize;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  &.home-button {
    background: ${vars.primary};
    padding: 20px 0;
  }
  &:hover {
    background: ${vars.primary};
  }
`;

export const Header = styled.h1`
  margin-bottom: 30px;
`;

export const HeaderCenter = styled.h1`
  margin-bottom: 30px;
  text-align: center;
`;

export const FlexBetweenRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 15px;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DropDownButton = styled.button`
  background: transparent;
  color: #000;
  border: none;
  cursor: pointer;
  &:hover,
  &.active {
    color: ${vars.primary};
  }
`;

export const DropDown = styled.div`
  position: relative;
`;

export const DropDownContent = styled.ul`
  display: none;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background: ${vars.light};
  margin-inline-start: -10px;
  width: 120px;
  &.active {
    display: flex;
    flex-direction: column;
  }
`;

export const DropDownItem = styled.li`
  color: black;
  transition: 0.3s all ease;
  position: relative;
  &:hover {
    color: ${vars.primary};
  }
  button {
    padding: 10px 0;
  }
`;
export const Box = styled.div`
  display: block;
  margin: 20px auto;
  text-align: center;
  padding: 5px;
  &.error {
    color: #a02020;
    background-color: #ffe0e0;
    border: 1px solid currentColor;
  }
`;

export const Slide = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 5px;
`;

export const UpdateButton = styled.button`
  cursor: pointer;
  padding: 10px;
  border: none;
  color: #fff;
  background: #39a7ff;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  padding: 10px;
  border: none;
  color: #fff;
  background: ${vars.danger};
  margin-left: 5px;
`;

export const Main = styled.div`
  display: flex;
`;

export const Note = styled.span`
  font-weight: bold;
  color: #09af00;
`;

export const Image = styled.img`
  max-width: 100%;
`;

export const UserForm = styled.form`
  position: absolute;
  background: #ffffff9;
  bottom: 20px;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.5s ease;
`;

export const ImgContainer = styled.div`
  max-width: 250px;
  margin: auto;
  position: relative;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Tab = styled.button`
  background: transparent;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  &.active {
    border-bottom: 2px solid ${vars.primary};
  }
`;

export const QuantityInput = styled.input`
  border: 1px solid ${vars.primary};
  text-align: center;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-inline-end: 0.5rem;
`;

export const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  .row {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
`;
