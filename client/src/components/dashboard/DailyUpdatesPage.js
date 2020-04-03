import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
class Updates extends Component {
  constructor() {
    super();
    this.state = {
      render: null,
      updates: []
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  async componentDidMount() {
    const search = this.props.auth.user.id;
    const url = '/api/users/open/' + search;
    try {
      const up = await axios.get(url);
      console.log(up);
      up.data.dailyUpdates.map(dd => {
        this.state.updates.unshift(dd);
      });
    } catch (error) {
      console.log(error.message);
    }

    this.setState({
      render: (
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
        </div>
      )
    });
  }
  render() {
    return (
      <div>
        {this.state.render}
        <div
          className='container'
          style={{ marginTop: '90px', textAlign: 'center' }}
        >
          <div className='container'>
            <h1>Daily Updates</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date </th>
                  <th>Task Input</th>
                  <th>Total Hours</th>
                  <th>work description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.updates.map(upd => (
                  <tr>
                    <td>{upd.date.slice(0, 10)}</td>
                    <td> {upd.task_input}</td>
                    <td>{upd.total_working_hour}</td>
                    <td>{upd.work_description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

Updates.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Updates));
