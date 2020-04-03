import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { logoutUser } from '../../actions/authActions';

class Fill_updates extends Component {
  constructor() {
    super();

    this.state = {
      total_Calls: '',
      Calls_received: '',
      calls_not_received: '',
      response: ''
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  componentDidMount() {
    if (this.props.auth.POST === 'Manager') {
      this.props.history.push('/dashboard');
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.total_Calls == '') {
      alert('total calls required');
    } else if (this.state.Calls_received == '') {
      alert('calls received required');
    } else if (this.state.calls_not_received == '') {
      alert('calls not received required');
    } else if (this.state.response == '') {
      alert('response is required');
    } else {
      const newUpdate = {
        total_Calls: this.state.total_Calls,
        calls_received: this.state.Calls_received,
        calls_not_received: this.state.calls_not_received,
        response: this.state.response,
        UserID: this.props.auth.user.id,
        date: this.state.Date
      };

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      axios
        .post('/register/updates', newUpdate, config)
        .then(res => {
          this.props.history.push({
            pathname: '/dashboard',
            state: {
              message: res.data.message,
              type: res.data.type
            }
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <nav className='navbar bg- pink'>
          <ul>
            <Link to='/'>HOME</Link>
            <li>
              <Link to='/'>Dashboard</Link>
            </li>
            <li>
              <Link to='#' onClick={this.onLogoutClick}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
        <div className='container' style={{ marginTop: '90px' }}>
          <h1 style={{ textAlign: 'center' }}>Add new Call Records </h1>
          <form
            noValidate
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            style={{ width: '60%', textAlign: 'center', margin: 'auto' }}
          >
            <input
              autoComplete='off'
              id='total_Calls'
              type='number'
              onChange={this.onChange}
              required
              placeholder='total calls'
            />
            <input
              required
              autoComplete='off'
              onChange={this.onChange}
              id='Calls_received'
              type='number'
              max={this.state.total_Calls}
              placeholder='Calls received'
            />
            <input
              required
              autoComplete='off'
              onChange={this.onChange}
              id='calls_not_received'
              type='number'
              max={this.state.total_Calls}
              placeholder='Calls not received'
            />
            <br />
            <br />
            <h4>Response</h4>

            <input
              autoComplete='off'
              required
              id='response'
              onChange={this.onChange}
              type='text'
              placeholder='enter mobile numbers'
            />
            <br />
            <Button type='submit' onSubmit={this.onClick}>
              submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

Fill_updates.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser, logoutUser })(
  withRouter(Fill_updates)
);
