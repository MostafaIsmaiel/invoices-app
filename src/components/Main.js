import Aside from "./Aside";
import Content from "./Content";
import CurrentInvoice from "./CurrentInvoice";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Main() {
  return (
    <main className="main-container d-flex">
      <Router>
        <Aside />
        <Switch>
          <Route exact path="/">
            <Content />
          </Route>
          <Route path="/:id" children={<CurrentInvoice />} />
        </Switch>
      </Router>
    </main>
  );
}

export default Main;
