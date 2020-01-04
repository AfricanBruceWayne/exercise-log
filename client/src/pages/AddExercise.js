import React, { Component } from 'react';
import axios from 'axios';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { addExercise, clearErrors } from '../actions/exerciseActions';
import classnames from 'classnames';

class AddExercise extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            date: '',
            formClassName: '',
            SuccessMsg: '',
            ErrorMsg: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount()
    {
        // Fill in the form with the appropriate data if user id is provided
        if (this.props.userId)
        {
            axios.get(`${this.props.server}/api/exercises/${this.props.userId}`)
            .then((res) => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    date: res.data.date
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    handleInputChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e)
    {
        // Prevent browser refresh
        e.preventDefault();
        const newUser = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date
        }

        // Acknowledge that if the user id is provided, we're updating via PUT
        // Otherwise, we're creating a new data via POST
        const method = this.props.userId ? 'put' : 'post';
        const params = this.props.userId ? this.props.userId : '';

        axios({
            method: method,
            responseType: 'json',
            url: `${this.props.server}/api/users/${params}`,
            data: newUser
        })
        .then((res) => {
            this.setState({
                formClassName: 'success',
                SuccessMsg: res.data.msg
            });

        if (!this.props.userId)
        {
            this.setState({
                title: title,
                description: description,
                date: date
            });
            this.props.onExerciseAdded(res.data.result);
            this.props.socket.emit('add', res.data.result);
        } else
        {
            this.props.onExerciseUpdated(res.data.result);
            this.props.socket.emit('update', res.data.result);
        }

        })
        .catch((err) => {
            if (err.response) 
            {
                if (err.response.data) 
                {
                  this.setState({
                    formClassName: 'warning',
                    ErrorMsg: err.response.data.msg
                  });
                }
              }
            else 
            {
                this.setState({
                  formClassName: 'warning',
                  ErrorMsg: 'Something went wrong: ' + err
                });
            }
        });
    }

    render() {

        const formClassName = this.state.formClassName;
        const SuccessMsg = this.state.SuccessMsg;
        const ErrorMsg = this.state.ErrorMsg;

        return (
            <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Add Exercise</h2>
            <Form className={formClassName} onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <Form.Input
                        type="text"
                        placeholder="Title"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.title
                        })}
                        name="title"
                        required
                        onChange={ this.handleInputChange }
                        value={ this.state.name }
                        />
                        {errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
                    </div>
                    <div className="form-group">
                        <Form.Input
                        type="text"
                        placeholder="Description"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.description
                        })}
                        name="description"
                        onChange={ this.handleInputChange }
                        value={ this.state.description }
                        />
                        {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                    </div>
                    <div className="form-group">
                        <Form.Input
                        type="text"
                        placeholder="Date"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.date
                        })}
                        name="date"
                        onChange={ this.handleInputChange }
                        value={ this.state.date }
                        />
                        {errors.date && (<div className="invalid-feedback">{errors.date}</div>)}
                    </div>
                    <Message 
                        success
                        color='green'
                        header='Nice one'
                        content={SuccessMsg}
                    />
                    <Message 
                        success
                        color='yellow'
                        header='Woah!!!'
                        content={ErrorMsg}
                    />
                    <Button color={this.props.buttonColor} floated='right'>
                        Add New Exercise
                    </Button>
                    <br /><br />
                </Form>
                <div className="container">
                    <Link className="nav-link" to="/">
                        {"Back to home"}
                    </Link>
                </div>
            </div>
        )
    }
}

AddExercise.propTypes = {
    addExercise: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { addExercise, clearErrors }
)(AddExercise);