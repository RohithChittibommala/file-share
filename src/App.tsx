import { Route, Switch } from "react-router";
import Download from "./components/Download";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

interface Props {}

const App = (props: Props) => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/download/:id" exact component={Download} />
      </Switch>
    </div>
  );
};

export default App;
