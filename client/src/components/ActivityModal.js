import React, { Component } from 'react';
import {
    Button,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup,
    Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addActivity } from '../redux/actions/activityActions';
import PropTypes from 'prop-types';

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
        this.props.addActivity(newActivity);

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
                    <h4 className='mb-3 ml-4'>Please log in to manage items</h4>
                )}

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add to Activity List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='activity'>Activity</Label>
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

ActivityModal.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    activity: state.activity,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { addActivity }
)(ActivityModal);