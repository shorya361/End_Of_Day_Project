import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { Button } from 'react-bootstrap';
import { logoutUser } from '../../actions/authActions';
import axios from 'axios';
class LeaveForm extends Component {
  constructor() {
    super();

    this.state = {
      No_of_days: '',
      date: '',
      reason: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.No_of_days == '') {
      alert('no of days is required');
    } else if (this.state.date == '') {
      alert('date of leave is required');
    } else if (this.state.reason == '') {
      alert('reason of leave is required');
    } else {
      const new_Leave = {
        No_of_days: this.state.No_of_days,
        reason: this.state.reason,
        date: this.state.date,
        UserID: this.props.auth.user.id
      };

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      axios
        .post('/register/leaves', new_Leave, config)
        .then(res => {
          console.log(res.data);
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
        <div className='container' style={{ padding: '150px' }}>
          <h1 style={{ textAlign: 'center' }}>Leave Form </h1>
          <form
            noValidate
            onSubmit={this.onSubmit}
            style={{ width: '60%', textAlign: 'center', margin: 'auto' }}
          >
            <input
              autoComplete='off'
              id='No_of_days'
              type='number'
              placeholder='No of dates'
              required
              onChange={this.onChange}
            />
            <input
              autoComplete='off'
              required
              id='date'
              type='date'
              placeholder='date'
              onChange={this.onChange}
            />
            <input
              autoComplete='off'
              required
              id='reason'
              type='text'
              placeholder='Reason'
              onChange={this.onChange}
            />
            <br />

            <Button type='submit'>submit</Button>
          </form>
        </div>
      </div>
    );
  }
}

LeaveForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { logoutUser, registerUser })(
  withRouter(LeaveForm)
);
