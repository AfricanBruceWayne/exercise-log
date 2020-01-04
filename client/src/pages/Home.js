import React, { Component } from 'react';
import { Container } from 'reactstrap';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Container className="jumbotron mt-4 my-4">
                    <h1 className="display-4">Hi! Welcome!</h1>
                    <p className="lead">This is a simple application, keep a record of your workouts and training.</p>
                    <hr className="my-4" />
                </Container>

                <Container>
                    { this.props.isAuthenticated ? (
                        <a className="btn btn-primary btn-lg" href="/activities/new" role="button">Add activity</a>
                    ) : (
                        <p className='lead mb-3'>Please log in to manage activities</p>
                    )}
                </Container>
            </div>
            );
    }
}