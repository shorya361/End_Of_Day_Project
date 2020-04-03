import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { logoutUser } from '../../actions/authActions';

class DailyUpdates extends Component {
  constructor() {
    super();

    this.state = {
      task_input: '',
      work_description: '',
      total_working_hour: 0
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
    if (this.state.task_input == '') {
      alert('task input required');
    } else if (this.state.work_description == '') {
      alert('work description required');
    } else if (this.state.total_working_hour < 3) {
      alert('working hours must be more than 3');
    } else if (this.state.total_working_hour > 8) {
      alert('working hours must be less  than 8');
    } else if (this.state.total_working_hour == 0) {
      alert('working hours required');
    } else {
      const Daily = {
        task_input: this.state.task_input,
        total_working_hour: this.state.total_working_hour,
        work_description: this.state.work_description,
        UserID: this.props.auth.user.id
      };

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      axios
        .post('/register/dailyUpdates', Daily, config)
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
          <h1 style={{ textAlign: 'center' }}>Add Daily Updates </h1>
          <form
            noValidate
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            style={{ width: '60%', textAlign: 'center', margin: 'auto' }}
          >
            <input
              required
              autoComplete='off'
              onChange={this.onChange}
              id='task_input'
              type='text'
              max={this.state.total_Calls}
              placeholder='task input'
            />
            <input
              autoComplete='off'
              id='total_working_hour'
              type='number'
              onChange={this.onChange}
              min='3'
              max='8'
              required
              placeholder='total working hour'
            />
            <input
              required
              autoComplete='off'
              onChange={this.onChange}
              id='work_description'
              type='text'
              max={this.state.total_Calls}
              placeholder='work description'
            />

            <br />

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

DailyUpdates.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser, logoutUser })(
  withRouter(DailyUpdates)
);
