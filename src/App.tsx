import { useState } from "react";
import Container from "./components/Container";
import ProgressBar from "./components/ProgressBar";

interface Props {}

const App = (props: Props) => {
  const [width, setWidth] = useState(0);

  return (
    <div className="app">
      <Container />
      <ProgressBar width={width} />
    </div>
  );
};

export default App;
