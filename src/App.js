import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import RecordMarks from "./components/RecordMarks";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/record_marks">
            <RecordMarks />
          </Route>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
