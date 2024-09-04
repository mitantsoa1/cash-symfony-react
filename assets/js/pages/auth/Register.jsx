import React from "react";

const Register = () => {
  return (
    <div>
      <form method="post">
        <h1 className="mb-3 h3 font-weight-normal">Please sign up</h1>
        <label>Fullname</label>
        <input
          type="text"
          name="fullname"
          id="inputFullname"
          className="form-control"
          required
          autoFocus
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="inputEmail"
          className="form-control"
          autoComplete="email"
          required
          autoFocus
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="inputPassword"
          className="form-control"
          autoComplete="current-password"
          required
        />

        <input type="hidden" name="_csrf_token" />

        <button className="btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Register;
