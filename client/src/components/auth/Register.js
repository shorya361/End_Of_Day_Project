import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      POST: '',
      image: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.POST !== 'Manager') {
      this.props.history.push('/dashboard');
    }
    // If logged in and user navigates to Register page, should redirect them to dashboard
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      POST: this.state.POST,
      image: this.state.image
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <nav className='navbar bg- pink'>
          <ul>
            <Link to='/'>HOME</Link>
            <li>
              <Link to='/'>Dashboard</Link>
            </li>
          </ul>
        </nav>
        <div className='container' style={{ padding: '120px' }}>
          <div className='jumbotron'>
            {' '}
            <h1 style={{ textAlign: 'center' }}>Register Employee</h1>
            <form
              noValidate
              onSubmit={this.onSubmit}
              style={{ width: '60%', textAlign: 'center', margin: 'auto' }}
            >
              <input
                autoComplete='off'
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id='name'
                type='text'
                placeholder='Name'
                className={classnames('', {
                  invalid: errors.name
                })}
              />
              <input
                autoComplete='off'
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id='email'
                type='email'
                placeholder='email'
                className={{
                  invalid: errors.email
                }}
              />
              <input
                autoComplete='off'
                onChange={this.onChange}
                value={this.state.image}
                id='image'
                type='text'
                placeholder='image (drive link)'
              />
              <input
                autoComplete='off'
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id='password'
                type='password'
                placeholder='password'
                className={classnames('', {
                  invalid: errors.password
                })}
              />
              <input
                autoComplete='off'
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id='password2'
                type='password'
                placeholder='Confirm password'
                className={classnames('', {
                  invalid: errors.password2
                })}
              />
              <br />
              <select
                onChange={this.onChange}
                id='POST'
                value={this.state.POST}
              >
                <option> </option>
                <option value='Manager'>Manager </option>
                <option value='Executive'>Executive </option>
                <option value='Tele_caller'>Tele caller</option>
              </select>
              <br />
              <Button type='submit'>submit</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
