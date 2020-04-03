import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
class Updates extends Component {
  constructor(props) {
    super();
    this.state = {
      render: null,
      currentUser: {},
      status: null
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  async componentDidMount() {
    const search = this.props.location.UserID;
    const url = '/api/users/open/' + search;
    try {
      const up = await axios.get(url);
      this.setState({ currentUser: up.data });
      console.log(up);
    } catch (error) {
      console.log(error.message);
    }
    if (this.state.currentUser.POST == 'Tele_caller') {
      console.log(this.state.currentUser);
      this.setState({
        status: (
          <div className='container'>
            <h1>Call Reports</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date </th>
                  <th>Total Calls</th>
                  <th>Calls Received</th>
                  <th>Calls not received</th>
                  <th>resposnse</th>
                </tr>
              </thead>
              <tbody>
                {this.state.currentUser.updates.map(upd => (
                  <tr>
                    <td>{upd.date.slice(0, 10)}</td>
                    <td> {upd.total_Calls}</td>
                    <td>{upd.calls_received}</td>
                    <td>{upd.calls_not_received}</td>
                    <td>
                      {upd.response.map(each => (
                        <p>{each}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )
      });
    }

    this.setState({
      render: (
        <div>
          <div className='container'>
            <div className='jumbotron'>
              <div className='row' style={{ marginLeft: '20px' }}>
                <Card style={{ width: '18rem', height: '20rem' }}>
                  <Card.Img
                    style={{ height: '100%' }}
                    variant='top'
                    src={this.state.currentUser.image}
                  />
                </Card>
                <div
                  style={{
                    margin: '60px 40px',
                    height: '15rem'
                  }}
                >
                  <ul>
                    <li>
                      <h1 style={{ textAlign: 'left' }}>
                        {this.state.currentUser.name}
                      </h1>
                    </li>
                    <br />
                    <li>
                      <h2 style={{ textAlign: 'left' }}>
                        {this.state.currentUser.POST}
                      </h2>
                    </li>
                    <br />
                    <li>
                      <h3 style={{ textAlign: 'left' }}>
                        {this.state.currentUser.email}
                      </h3>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='container'>
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
                    {this.state.currentUser.leaves.map(upd => (
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
              <br />
              {this.state.status}

              <br />
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
                    {this.state.currentUser.dailyUpdates.map(upd => (
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
        </div>
      )
    });
  }
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
              <Link to='/' onClick={this.onLogoutClick}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
        {this.state.render}
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
