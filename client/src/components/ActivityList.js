import React, { Component } from 'react';
import {
    Container,
    Button, Table
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';

import { activityActions } from '../redux/actions';

class ActivityList extends Component {

    componentDidMount() {
        this.props.dispatch(activityActions.getAll());
    }

    onDeleteClick(id) {
        this.props.dispatch(activityActions.delete(id));
    }

      render() {

        const { activities } = this.props.activity;

        return (
          <div>
            { this.props.isAuthenticated ? (
                  <Container>
                  <TransitionGroup className='activity-list'>
                  <Table hover>
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Title</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                  <tbody>
                  {activities.map(({ _id, date, title, description }) => (
                    <CSSTransition key={_id} timeout={500} classNames='fade'>
                      <tr>
                        <th scope="row">1</th>
                        <td>{date}</td>
                        <td>{description}</td>
                        <td>{title}</td>
                        <td>
                          <Button 
                              className='remove-btn'
                              color='danger'
                              size='sm'
                              onClick={this.onDeleteClick.bind(this, _id)}>
                            &times;
                          </Button>
                        </td>
                      </tr>
                    </CSSTransition>
                    ))}
                    </tbody>
                  </Table>
                  </TransitionGroup>
                </Container>      
            ) :  (
                null
            )}
          </div>
        );
    }
}

function mapStateToProps(state) {
    const  { activity } =  state;
    const { isAuthenticated } = state.auth;
    return {
      activity, isAuthenticated
    };
}

export default connect(
    mapStateToProps 
)(ActivityList);