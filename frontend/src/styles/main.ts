import styled from "styled-components";
import * as classes from './variables';

export const Container = styled.div`
  margin: auto;
  @media (min-width:1200px) {
    max-width: 1140px;
  }
  @media (max-width:1199px) {
    max-width: 960px;
  }
  @media (max-width:991px) {
    max-width: 720px;
  }
  @media (max-width:767px) {
    max-width: 540px;
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
  background: ${classes.primary};
  text-transform: capitalize;
  border: 1px solid ${classes.primary};
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
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
    color: ${classes.primary}
  }
`

export const DropDown = styled.div`
  position: relative;
`

export const DropDownContent = styled.ul`
  display: none;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  background: ${classes.light};
  margin-inline-start: -30px;
  &.active {
    display: flex;
    flex-direction: column;
  }
`

export const DropDownItem = styled.li`
  color: black;
  padding: 10px 30px;
  transition: .3s all ease;
  position: relative;
  &:hover {
    color: ${classes.primary};
  }
  &:not(:last-child):before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 1px;
    margin-inline-start: 5%;
    background: ${classes.secondary};
  }
`
