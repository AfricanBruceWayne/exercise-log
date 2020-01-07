import React, { Component } from 'react';
import {
    Container,
    ListGroup, ListGroupItem,
    Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getActivities, deleteActivity } from '../redux/actions/activityActions';
import PropTypes from 'prop-types';

class ActivityList extends Component {

    componentDidMount() {
        this.props.getActivities();
    }

    onDeleteClick = id => {
        this.props.deleteActivity(id);
    }

      render() {
        const { activities } = this.props.activity;

        return (
          <Container>
            <ListGroup>
              <TransitionGroup className='activity-list'>
                {activities.map(({ _id, date, title, description }) => (
                  <CSSTransition key={_id} timeout={500} classNames='fade'>
                    <ListGroupItem>
                      {this.props.isAuthenticated ? (
                        <Button
                          className='remove-btn'
                          color='danger'
                          size='sm'
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>
                      ) : null}
                      {date}
                      {title} &dash; {description}
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          </Container>
        );
    }
}

ActivityList.propTypes = {
  getActivities: PropTypes.func.isRequired,
  activity: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    activity: state.activity,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getActivities, deleteActivity }
)(ActivityList);