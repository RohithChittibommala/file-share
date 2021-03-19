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
        <LinkContainer>
          <p>{link}</p>
        </LinkContainer>
        <QRContainer>
          <QRCode value={link} size={125} />,
        </QRContainer>
      </Container>
    </Wrapper>
  );
};

export default SharableLinkContainer;

const Wrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-flow: column wrap;
  background: #fff;
`;

const LinkContainer = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  p {
    font-size: 19px;
  }
`;

const QRContainer = styled.div`
  padding: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  align-items: center;

  span {
    margin: 0 10px;
  }
`;

const Title = styled.h2``;
