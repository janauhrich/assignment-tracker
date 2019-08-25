import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

// Helpers
import * as auth from "../api/auth";
import * as token from "../helpers/local-storage";

// Components
import Header from "./shared/Header";
import Navigation from "./shared/Navigation/Navigation";
import Login from "./auth/Login.Form";
import Signup from "./auth/Signup.Form";
import UsersContainer from "./users/Container";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUserId: null,
      loading: true,
      failure: null
    };

    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.signupUser = this.signupUser.bind(this);
  }

  async componentDidMount() {
    if (token.getToken()) {
      const { user } = await auth.home();
      if (user) {
        this.setState({ currentUserId: user._id, loading: false });
      }
    } else {
      this.setState({ loading: false });
    }
  }

  async loginUser(user) {
    const response = await auth.login(user);
    if (response.message) {
      this.setState({ failure: response.message });
      return;
    } else {
      await token.setToken(response);
      const home = await auth.home();

      if (home) {
        this.setState({ currentUserId: home.user._id });
      }
    }
  }

  logoutUser() {
    token.clearToken();
    this.setState({ currentUserId: null });
  }

  async signupUser(user) {
    const response = await auth.signup(user);

    await token.setToken(response);

    const home = await auth.home();
    this.setState({ currentUserId: home.user._id });
  }

  render() {
    const { currentUserId, loading } = this.state;
    if (loading) return <span />;

    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={currentUserId}
          logoutUser={this.logoutUser}
        />
        <Switch>
          <Route
            path="/login"
            exact
            component={() => {
              return currentUserId ? (
                <Redirect to="/users" />
              ) : (
                <Login onSubmit={this.loginUser} failure={this.state.failure} />
              );
            }}
          />
          <Route
            path="/signup"
            exact
            component={() => {
              return currentUserId ? (
                <Redirect to="/users" />
              ) : (
                <Signup onSubmit={this.signupUser} />
              );
            }}
          />

          <Route
            path="/users"
            render={() => {
              return currentUserId ? (
                <UsersContainer currentUserId={currentUserId} />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />

          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
