import styled from "styled-components";
import { Text } from "./Container";

interface Props {
  width: number;
}

const ProgressBar: React.FC<Props> = ({ width }) => {
  console.log(width);

  return (
    <ProgressBarContainer>
      <ProgressBarDiv>
        <ProgressBarInnerDiv width={width} />
      </ProgressBarDiv>
      <Text>
        {width}% upload{width / 100 ? "ing" : "ed"}
      </Text>
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    text-align: center;
    margin: 10px 0;
    font-size: 18px;
    font-weight: bold;
  }
`;

const ProgressBarDiv = styled.div`
  min-width: 350px;
  width: 60%;
  height: 10px;
`;

const ProgressBarInnerDiv = styled.div<{ width: number }>`
  background-color: ${({ width }) => {
    if (width <= 30) return "#e40017";
    else if (width > 75) return "rgb(57, 209, 57)";
    else if (width > 30) return "#046582";
  }};
  border-radius: 1rem;
  transition: 1s ease;
  height: 100%;
  transition-delay: 0.15s;
  width: ${(props) => `${props.width}%`};
`;
