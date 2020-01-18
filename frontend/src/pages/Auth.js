import React, { Component } from "react";

import "./Auth.css";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.emailEL = React.createRef();
    this.passwordEL = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEL.current.value;
    const password = this.passwordEL.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {};

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: null,
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEL} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEL} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button">Switch to Signup</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
