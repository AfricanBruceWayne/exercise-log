import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendFlashMessage } from '../redux/actions/flashActions';

class FlashMessage extends Component {

    render() {

        const { message, class_name } = this.props.flashMessage;
        if (!message)
        {
            return null;
        }

        return (
            <div className="row">
                <div
                    className={'col-md-12 alert ' + class_name}
                    role='alert'
                    >
                        {message}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({flashMessage}) => {
    return { flashMessage };
};

export default connect(
    mapStateToProps
)(FlashMessage);