import styled from "styled-components";
import QRCode from "react-qr-code";

interface Props {
  link: string;
  fileName: string;
  time: number;
}

const SharableLinkContainer = ({ link, fileName, time }: Props) => {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>{fileName}</Title> <span>{new Date(time).toLocaleString()}</span>
      </TitleContainer>
      <Container>
        <LinkContainer>{link}</LinkContainer>
        <QRContainer>
          <QRCode value={link} size={200} />,
        </QRContainer>
      </Container>
    </Wrapper>
  );
};

export default SharableLinkContainer;

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-flow: column wrap;
`;

const LinkContainer = styled.div``;

const QRContainer = styled.div``;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2``;
