import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
class Leaves extends Component {
  constructor() {
    super();
    this.state = {
      render: null,
      leaves: []
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

      up.data.leaves.map(dd => {
        this.state.leaves.unshift(dd);
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
          <h1>Leaves</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date </th>
                <th>No of days</th>
                <th>Reason</th>
                <th>Applied on</th>
              </tr>
            </thead>
            <tbody>
              {this.state.leaves.map(upd => (
                <tr>
                  <td>{upd.date.slice(0, 10)}</td>
                  <td> {upd.No_of_days}</td>
                  <td>{upd.reason}</td>
                  <td>{upd.submitted_on.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

Leaves.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Leaves));
