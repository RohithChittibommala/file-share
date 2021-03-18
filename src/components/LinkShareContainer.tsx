import styled from "styled-components";
import { Text } from "./Container";
interface Props {
  link: string;
}

const LinkShareContainer = ({ link }: Props) => {
  return (
    <Wrapper>
      <Text center>Link expires in 12hrs</Text>
      <LinkContainer value={link} readOnly />
    </Wrapper>
  );
};

export default LinkShareContainer;

const Wrapper = styled.div`
  padding: 8px;
  margin: 10px 0;
`;

const LinkContainer = styled.input`
  width: 100%;
  margin: 5px 0;
  font-size: 16px;
  padding: 10px 15px;
  outline: none;
  border: none;
`;
