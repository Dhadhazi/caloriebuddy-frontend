import React from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import { Route, Switch } from "react-router-dom";
import MessageBox from "./components/MessageBox";
import MainMenu from "./components/MainMenu";
import { useSelector } from "react-redux";
import { selectToken } from "./store/user/selectors";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Weight from "./pages/Weight";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";

function App() {
  const token = useSelector(selectToken);

  return (
    <div className="container">
      <header>
        <MainMenu />
        <MessageBox />
      </header>
      <content>
        <div className="container">
          {token ? (
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/logs" component={Logs} />
              <Route path="/budget" component={Budget} />
              <Route path="/weight" component={Weight} />
              <Route path="/settings" component={Settings} />
            </Switch>
          ) : (
            <>
              <Switch>
                <Route path="/registration" component={RegistrationForm} />
                <Route path="/" component={LoginForm} />
              </Switch>
            </>
          )}
        </div>
      </content>
    </div>
  );
}

export default App;
