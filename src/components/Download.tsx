import { useParams } from "react-router";
import styled from "styled-components";
import axios from "axios";

interface Props {}

const Download = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  return (
    <Wrapper>
      <DownloadContainer>
        <h2>id</h2>
      </DownloadContainer>
    </Wrapper>
  );
};

export default Download;

const DownloadContainer = styled.div`
  background: #fff;
  box-shadow: 0px 0px #000;
  padding: 4px 9px;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 2vw 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
