import styled from "styled-components";
interface Props {
  width: number;
  cancelFileUpload: () => void;
}

const ProgressBar: React.FC<Props> = ({ width, cancelFileUpload }) => {
  console.log(width);

  return (
    <ProgressBarContainer>
      <ProgressBarDiv>
        <ProgressBarInnerDiv width={width} />
      </ProgressBarDiv>
      {width / 100 < 1 && <Button onClick={cancelFileUpload}>cancel</Button>}
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const Button = styled.div`
  background: transparent;
  color: red;
  margin: 0 12px;
  height: 100%;
  cursor: pointer;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
`;

const ProgressBarDiv = styled.div`
  min-width: 350px;
  width: 60%;
  height: 13px;
`;

const ProgressBarInnerDiv = styled.div<{ width: number }>`
  background-color: ${({ width }) => {
    if (width <= 30) return "#e40017";
    else if (width > 75) return "rgb(57, 209, 57)";
    else if (width > 30) return "#046582";
  }};
  border-radius: 1rem;
  transition: 200ms ease;
  height: 100%;
  transition-delay: 50ms;
  width: ${(props) => `${props.width}%`};
`;
