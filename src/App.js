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
import PureRedux from "./07/PureRedux";
import ReduxCounter from "./07/ReduxCounter";
import PriceInput from "./08/PriceInput";
import SearchBox from "./08/SearchBox";
import FilterList from "./08/FilterList";
import ArticleView from "./09/ArticleView";
import UserList2 from "./10/UserList";
import CounterRenderProps from "./10/CounterRenderProps";
import ListWithMore from "./10/ListWithMore";

const routes = [
  ["01 Counter", Counter],
  ["01 UserList", UserList],
  ["04 Timer", Timer],
  ["04 SearchUserList", SearchUserList],
  ["04 ThemeSwitch", ThemeSwitch],
  ["06 UseCounter", UseCounter],
  ["06 UseAsync", UseAsync],
  ["06 UseScroll", UseScroll],
  ["06 BlogList", BlogList],
  ["07 PureRedux", PureRedux],
  ["07 ReduxCounter", ReduxCounter],
  ["08 FilterList", FilterList],
  ["08 SearchBox", SearchBox],
  ["08 PriceInput", PriceInput],
  ["09 ArticleView", ArticleView],
  ["10 UserList2", UserList2],
  ["10 CounterRenderProps", CounterRenderProps],
  ["10 ListWithMore", ListWithMore]
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
