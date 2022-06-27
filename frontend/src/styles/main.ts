import styled from "styled-components";

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
