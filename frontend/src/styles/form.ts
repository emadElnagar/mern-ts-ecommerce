import styled from "styled-components"

export const Form = styled.form`
  width: 500px;
  box-shadow: 0 0 5px #888888;
  padding: 30px 50px
`

export const Field = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 15px;
`

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid #888888;
  height: 20px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
  &:required + label:after {
    content: ' *'
  }
`
