import styled from "styled-components";

export const Form = styled.form`
  width: 500px;
  box-shadow: 0 0 5px #888888;
  padding: 30px 50px;
  margin: auto;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const InlineForm = styled.form`
  display: flex;
  padding: 30px 50px;
  @media (max-width: 991px) {
    padding: 30px 5px;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 15px;
  &:last-of-type {
    margin-bottom: 15px;
  }
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid #888888;
  padding: 5px 0;
  &:not(:placeholder-shown) {
    font-size: 14px;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
  &:required + label:after {
    content: " *";
  }
`;

export const BrdInput = styled.input`
  border: none;
  width: 100%;
  border: 1px solid #888888;
  padding: 25px 5px;
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 25px 5px;
  resize: none;
  height: 100px;
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export const Label = styled.label`
  .icon {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const Paragraph = styled.p`
  margin-top: 15px;
  a {
    color: #00b7ff;
  }
`;

export const Select = styled.select`
  padding: 5px;
`;

export const ImagePreview = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 10px 0;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
`;

export const ImgPreview = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid #888888;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: #000;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  border: none;
`;
