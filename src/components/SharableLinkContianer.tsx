import styled from "styled-components";
import QRCode from "react-qr-code";
import LinesEllipsis from "react-lines-ellipsis";
interface Props {
  link: string;
  fileName: string;
  time: number;
  emitToast: (type: "success" | "info", message?: string | undefined) => void;
  setQrcode: (qrCodeLink: string) => void;
}

const SharableLinkContainer = ({
  link,
  fileName,
  time,
  emitToast,
  setQrcode,
}: Props) => {
  return (
    <Wrapper>
      <Container>
        <LinkContainer>
          <TextContainer>
            <Title>
              <LinesEllipsis text={fileName} maxLine="1" />
            </Title>
            <span className="date">
              {new Date(time).toLocaleString("en-IN")}
            </span>
          </TextContainer>
          <TextContainer>
            <p>{link}</p>
            <button
              onClick={() =>
                navigator.clipboard.writeText(link) &&
                emitToast("success", "copied to clipboard")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </button>
          </TextContainer>
        </LinkContainer>
        <QRContainer onClick={() => setQrcode(link)}>
          <QRcode value={link} size={125} />,
        </QRContainer>
      </Container>
    </Wrapper>
  );
};

export default SharableLinkContainer;

const Wrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  min-width: 350px;
  margin: 30px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0px 7px 9px 5px #2626260a;
  transition: 200ms ease-in all;
  &:hover {
    box-shadow: none;
  }
`;

const LinkContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  /* margin: 0 25px; */
  p {
    padding: 4px;
    font-size: 19px;
  }
`;

const QRcode = styled(QRCode)`
  cursor: pointer;
`;

const QRContainer = styled.div`
  padding: 5px;
  margin: 0 25px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  padding: 8px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  flex-wrap: wrap;
  align-items: center;
  margin: 5px 0;

  span.date {
    margin: 0 10px;
    text-align: center;
    background: #e2fbfc;
    padding: 3px;
    border-radius: 8px;
    color: #00aeb2;
    font-weight: bold;
  }
  p {
    text-align: center;
    padding: 3px 6px;
    background: #fafafa;
    color: #262626;
    border: 1px solid lightblue;
  }
  button {
    height: 100%;
    margin: 0 5px;
    width: 30px;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    background: #0fcd7c;
    border-radius: 6px;
    svg {
      color: #fff;
    }
  }
`;

const Title = styled.h2`
  text-transform: uppercase;
  text-align: center;
  color: #fff;
  font-size: 18px;
  background-color: #4a81e6;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 3px;
  margin: 5px 0;
`;
