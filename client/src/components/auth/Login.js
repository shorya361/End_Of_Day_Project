import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      POST: ''
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '150px' }}>Welcome</h1>
        <div className='container' style={{ padding: '120px' }}>
          <div className='jumbotron'>
            <h3 style={{ textAlign: 'center' }}>Login here</h3>
            <form
              noValidate
              onSubmit={this.onSubmit}
              style={{ width: '60%', textAlign: 'center', margin: 'auto' }}
            >
              <input
                autoComplete='off'
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id='email'
                type='email'
                placeholder='email'
                className={classnames('', {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              {errors.email}
              {errors.emailnotfound}
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                placeholder='password'
                id='password'
                type='password'
                className={classnames('', {
                  invalid: errors.password || errors.passwordincorrect
                })}
              />
              {errors.password}
              {errors.passwordincorrect}

              <br />

              <Button type='submit' style={{ textAlign: 'center' }}>
                Login
              </Button>
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
