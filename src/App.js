import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import Counter from "./01/Counter";
import UserList from "./01/UserList";
import Timer from "./04/Timer";
import SearchUserList from "./04/SearchUserList";
import ThemeSwitch from "./04/ThemeSwitch";
import UseCounter from "./06/UseCounter";
import UseAsync from "./06/UseAsyncSample";
import UseScroll from "./06/UseScroll";
import BlogList from "./06/BlogList";

const routes = [
  ["01 Counter", Counter],
  ["01 UserList", UserList],
  ["04 Timer", Timer],
  ["04 SearchUserList", SearchUserList],
  ["04 ThemeSwitch", ThemeSwitch],
  ["06 UseCounter", UseCounter],
  ["06 UseAsync", UseAsync],
  ["06 UseScroll", UseScroll],
  ["06 BlogList", BlogList]
];

const Empty = () => "";
export default function App() {
  return (
    <Router>
      <div className="app">
        <Empty />
        <ul className="sider">
          {routes.map(([label]) => (
            <li>
              <Link to={`/${label.replace(" ", "/")}`}>{label}</Link>
            </li>
          ))}
        </ul>
        <div id="pageContainer" className="page-container">
          <Switch>
            {routes.map(([label, Component, additionalRoute = ""]) => (
              <Route
                key={label}
                path={`/${label.replace(" ", "/")}${additionalRoute}`}
              >
                <Component />
              </Route>
            ))}
            <Route path="/" exact>
              <h1>Welcome!</h1>
            </Route>
            <Route path="*">Page not found.</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
