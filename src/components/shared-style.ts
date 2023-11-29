import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const Error = styled.p`
  color: #ff5e57;
  text-decoration: underline;
  margin-top: 5px;
  padding-left: 5px;
`;

export const Btn = styled.button`
  font-size: 14px;
  line-height: 100%;
  border: none;
  border-radius: 5px;
  padding: 4px 7px;
  margin-left: 5px;
  background-color: ${(props) => props.theme.bgOpacityColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
  &:hover,
  &:active {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

export const DeleteBtn = styled(Btn)`
  margin-left: 5px;
  background-color: transparent;
`;

export const Input = styled.input`
  width: 160px;
`;
