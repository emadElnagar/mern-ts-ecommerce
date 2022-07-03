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
