// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { initialState } from '../store';
import { setError } from '../actions';
import type { Error } from '../types';

class ErrorDialog extends React.Component {
	constructor(props: { error: Error, dismissError: () => void }) {
		super(props);
	}

	handleClose = () => {
		this.props.dismissError();
	};

	render() {
		const actions = [
			<FlatButton
				label="Discard"
				primary={true}
				onTouchTap={this.handleClose}
			/>
		];

		return (
			<Dialog
				actions={actions}
				modal={false}
				open={this.props.error.status >= 0}
				onRequestClose={this.handleClose}
			>
				Error: {this.props.error.message}
				<br />
				The data you are requiring is missing, the chart will be reset to the initial settings.
			</Dialog>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dismissError: () => {
			dispatch(setError({ status: -1, message: '' }));
		}
	};
};

const mapStateToProps = (state: typeof initialState) => {
	return {
		error: state.error
	};
};

const connectedError = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ErrorDialog)
);

export default connectedError;
