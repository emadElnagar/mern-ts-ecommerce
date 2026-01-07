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
  z-index: 999;
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
  max-width: 700px;
  margin: auto;
  position: relative;
`;

export const SectionHeading = styled.h2`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 24px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
`;

export const Tabs = styled.div`
  display: flex;
  &.center {
    justify-content: center;
  }
  &.underline {
    border-bottom: 2px solid ${vars.shadow};
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
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

export const TabButton = styled.button`
  background: transparent;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  &.active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
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

export const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  label {
    margin-inline-start: 10px;
  }
`;

export const AnalysisCard = styled.div`
  padding: 20px;
  border-radius: 10px;
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const OrderCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  width: 100%;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderId = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

export const OrderDate = styled.span`
  font-size: 14px;
  color: #777;
`;

export const Status = styled.span`
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

export const ProductSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

export const ProductImages = styled.div`
  position: relative;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export const MoreBadge = styled.span`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 8px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h4`
  margin: 0;
  font-size: 16px;
`;

export const MoreItems = styled.span`
  font-size: 14px;
  color: #777;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 16px 0;
`;

export const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;

export const SummaryItem = styled.div`
  flex: 1;
`;

export const Label = styled.span`
  font-size: 13px;
  color: #777;
`;

export const Value = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
`;

export const Delivery = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const CardButton = styled.button`
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
`;

export const SecondaryButton = styled(Button)`
  background: #f4f4f4;
  border: 1px solid #ddd;

  &:hover {
    background: #eaeaea;
  }
`;

export const PrimaryButton = styled(Button)`
  background: #007bff;
  color: #fff;
  border: none;

  &:hover {
    background: #0069d9;
  }
`;

export const CancelButton = styled(Button)`
  background: #cf0f0f;
  color: #fff;
  border: 1px solid #cf0f0f;

  &:hover {
    background: #a20c0c;
  }
`;
