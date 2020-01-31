import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import ActivityList from '../components/ActivityList';

class Home extends Component {
    render() {
        return (
            <div>
                <Container className="jumbotron mt-4 my-4">
                    <h1 className="display-4">Hi! Welcome!</h1>
                    <p className="lead">This is a simple application, keep a record of your workouts and training.</p>
                    <hr className="my-4" />
                    <div className='mb-3 ml-4 lead' />
                </Container>
                <Container>
                    <ActivityList />
                </Container>
            </div>
            );
    }
}

function mapStateToProps(state) {
    const { isAuthenticated } = state.auth
    return {isAuthenticated};
};

export default connect(
    mapStateToProps
)(Home);