import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Hi! Welcome!</h1>
                <p className="lead">This is a simple application, keep a record of your workouts and training.</p>
                <hr className="my-4" />
                <p>Ready to start? Use this platform to record your progress</p>
                <a className="btn btn-primary btn-lg" href="/exerices" role="button">Add exercise</a>
            </div>
        );
    }
}