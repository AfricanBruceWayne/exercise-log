import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import ActivityList from '../components/ActivityList';

class Home extends Component {
    render() {
        return (
            <div>
                { this.props.isAuthenticated ? (
                    <ActivityList />
                ) :  (
                    <Container className="jumbotron mt-4 my-4">
                        <h1 className="display-4">Hi! Welcome!</h1>
                        <p className="lead">This is a simple application, keep a record of your workouts and training.</p>
                        <hr className="my-4" />
                        <p className='mb-3 ml-4 lead'>Please log in to manage activities</p>
                    </Container>
                )}
            </div>
            );
    }
}

Home.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps
)(Home);