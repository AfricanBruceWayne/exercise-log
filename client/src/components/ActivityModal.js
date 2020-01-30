import React, { Component } from 'react';
import {
    Button,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup,
    Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';

import { activityActions } from '../redux/actions';

class ActivityModal extends Component {

    state = {
        modal: false,
        title: '',
        description: '',
        date: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = (e) => {

        e.preventDefault();

        const newActivity = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date
        };

        // Add activity via addActivity action
        this.props.dispatch(activityActions.add(newActivity));

        // Close modal
        this.toggle();
    };

    render() {
        return (
            <div>
                { this.props.isAuthenticated ? (
                    <Button
                        color='dark'
                        style={{ marginBottom: '2rem' }}
                        onClick={this.toggle}
                        >
                            Add Activity
                    </Button>
                ) :  (
                    null
                )}

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add to Activity List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='title'>Activity</Label>
                                <Input
                                    type='text'
                                    name='title'
                                    id='title'
                                    placeholder='Activity title'
                                    onChange={this.onChange}
                                />
                                <Label for='description'>Description</Label>
                                <Input
                                    type='text'
                                    name='description'
                                    id='description'
                                    placeholder='Description of activity'
                                    onChange={this.onChange}
                                />
                                <Label for='date'>Date</Label>
                                <Input
                                    type='text'
                                    name='date'
                                    id='date'
                                    placeholder='Enter date of activity'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Save Activity
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { activity } = state.activity;
    const { isAuthenticated } = state.auth;
    return { activity, isAuthenticated };
};

export default connect(
    mapStateToProps
)(ActivityModal);