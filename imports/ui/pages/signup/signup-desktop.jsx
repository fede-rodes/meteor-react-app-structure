import React, { PropTypes } from 'react';
import { Default } from '../../layouts/default.jsx';
import { Input } from '../../components/input.jsx';
import { AvatarsTable } from '../../components/signup/avatars-table.jsx';
import { Terms } from '../../components/signup/terms.jsx';
import { DisplaySelectedAvatar } from '../../components/signup/display-selected-avatar.jsx';

//------------------------------------------------------------------------------
// GLOBALS:
//------------------------------------------------------------------------------
const styles = {
  col: {
    maxWidth: '400px',
  },
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
export const SignupDesktop = (props) => (
  <Default width="880px">
    <div className="signup-page">
      <h1 className="row-title">Sign Up</h1>
      <p>
        Already have an account?&nbsp;
        <a href="/login" className="login-link">Sign in</a>
      </p>
      <br />
      <form onSubmit={props.handleSubmit}>
        <div className="row">
          <div className="col-xs-6" style={styles.col}>
            <Input
              inputType="text"
              fieldName="username"
              label="Username"
              placeholder="Choose and ambiguious nickname"
              isRequired
              value={props.username}
              onChange={props.handleInputChange}
              errors={props.errors}
            />
            <Input
              inputType="text"
              fieldName="email"
              label="Email Address"
              placeholder="Your email address. Required for activation"
              isRequired
              value={props.email}
              onChange={props.handleInputChange}
              errors={props.errors}
            />
            <Input
              inputType="password"
              fieldName="password"
              label="Create Password"
              placeholder="Create a password, nothing too easy!"
              isRequired
              value={props.password}
              onChange={props.handleInputChange}
              errors={props.errors}
            />
            <Input
              inputType="password"
              fieldName="password2"
              label="Repeat Password"
              placeholder="Re-enter the password, exactly the same"
              isRequired
              value={props.password2}
              onChange={props.handleInputChange}
              errors={props.errors}
            />
          </div>
          <div className="col-xs-6 pull-right" style={styles.col}>
            <AvatarsTable
              selectedAvatar={props.selectedAvatar}
              onAvatarSelect={props.handleAvatarSelect}
            />
            <br />
            <Terms
              checked={props.terms}
              onChange={props.handleInputChange}
              errors={props.errors}
            />
            <br />
            <button
              type="submit"
              className="btn create-account-button"
              disabled={!props.canSubmit}
            >
              <DisplaySelectedAvatar
                selectedAvatar={props.selectedAvatar}
              />
              Create my account
            </button>
          </div>
        </div>
      </form>
    </div>
  </Default>
);

SignupDesktop.propTypes = {
  // curUser: PropTypes.object,
  canSubmit: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  selectedAvatar: PropTypes.string.isRequired,
  terms: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleAvatarSelect: PropTypes.func.isRequired,
};
