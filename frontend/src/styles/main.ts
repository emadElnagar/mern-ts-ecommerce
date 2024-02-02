import styled from "styled-components";
import * as vars from './variables';

export const Container = styled.div`
  margin: auto;
  @media (min-width:1200px) {
    width: 1140px;
  }
  @media (max-width:1199px) {
    width: 960px;
  }
  @media (max-width:991px) {
    width: 720px;
  }
  @media (max-width:767px) {
    width: 540px;
  }
  @media (max-width:576px) {
    max-width: 100%;
  }  
`

export const Section = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
`

export const Button = styled.button`
  background: ${vars.primary};
  text-transform: capitalize;
  border: 1px solid ${vars.primary};
  padding: 10px 15px;
  cursor: pointer;
`

export const LightedSpan = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`

export const FullButton = styled.button`
  background: ${vars.primary};
  text-transform: capitalize;
  border: 1px solid ${vars.primary};
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
`

export const NavButton = styled.button`
  background: transparent;
  text-transform: capitalize;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: ${vars.primary};
  }
`

export const Header = styled.h1`
  margin-bottom: 30px;
`

export const HeaderCenter = styled.h1`
  margin-bottom: 30px;
  text-align: center;
`

export const FlexBetweenRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 15px;
`

export const DropDownButton = styled.button`
  background: transparent;
  color: #000;
  border: none;
  cursor: pointer;
  &:hover, &.active {
    color: ${vars.primary}
  }
`

export const DropDown = styled.div`
  position: relative;
`

export const DropDownContent = styled.ul`
  display: none;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  background: ${vars.light};
  margin-inline-start: -30px;
  &.active {
    display: flex;
    flex-direction: column;
  }
`

export const DropDownItem = styled.li`
  color: black;
  transition: .3s all ease;
  position: relative;
  &:hover {
    color: ${vars.primary};
  }
  button {
    padding: 10px 30px;
  }
`
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
`

export const Slide = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 5px;
`

export const UpdateButton = styled.button`
  cursor: pointer;
  padding: 10px;
  border: none;
  color: #fff;
  background: #39A7FF;
`

export const DeleteButton = styled.button`
  cursor: pointer;
  padding: 10px;
  border: none;
  color: #fff;
  background: ${vars.danger};
  margin-left: 5px;
`

export const Main = styled.div`
  display: flex;
`

export const Note = styled.span`
  font-weight: bold;
  color: #09af00;
`

export const Image = styled.img`
  max-width: 100%;
`

export const UserForm = styled.form`
  position: absolute;
  background: #ffffff9;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.5s ease;
`

export const ImgContainer = styled.div`
  max-width: 250px;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  &:hover .full-height {
    height: 100%;
  }
`
