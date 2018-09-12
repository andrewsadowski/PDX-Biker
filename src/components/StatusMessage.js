import React, { Component } from 'react';
import './StatusMessage.css'

class StatusMessage extends Component {
  render() {
    const { status } = this.props;

		return (
			<div className="status-message-container">
				{ status.error ?
					<div className="status-error">
						<h2>Sorry, something went wrong:</h2>
						<p>{status.message}</p>
					</div>
					:
					<div className="status-message">
						<p>{status.message || 'Loading'}...</p>
					</div>
				}
			</div>
		);
  }
}

export default StatusMessage;
