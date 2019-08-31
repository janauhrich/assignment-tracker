import React from "react";
import { Route } from "react-router-dom";

// Helpers
import * as users from "../../api/users";

// Components
import List from "./List/List";
import AssignmentsContainer from "../assignments/Container";

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      assignmentList: [],
      loading: true
    };
    this.refreshUsers = this.refreshUsers.bind(this);
    this.refreshAssignments = this.refreshAssignments.bind(this);
  }

  async componentDidMount() {
    this.refreshUsers().then(() => this.setState({ loading: false }));
    this.refreshAssignments();
  }

  // Internal
  async refreshUsers() {
    const { response } = await users.fetchUsers();
    this.setState({ users: response });
  }

  async refreshAssignments() {
    const { response } = await users.fetchAssignments();
    this.setState({ assignmentList: response });
  }

  render() {
    const { currentUserId, isAdmin } = this.props;
    const { users, assignmentList, loading } = this.state;
    if (loading) return <span />;

    return (
      <main className="container">
        <Route
          path="/users"
          exact
          render={() => {
            return <List users={users} isAdmin={isAdmin} />;
          }}
        />
        <AssignmentsContainer
          currentUserId={currentUserId}
          refreshUsers={this.refreshUsers}
          users={users}
          assignmentList={assignmentList}
          refreshAssignments={this.refreshAssignments}
        />
      </main>
    );
  }
}
