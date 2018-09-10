import React, { Component } from 'react';

class StatusMessage extends Component {
	render() {
		const { status } = this.props;

		const styles = {
			root: {
				position : 'fixed',
				zIndex: 1001,
				width: '100vw',
				height: '100vh',
				paddingTop: '45%',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				color: '#fff'
			},
			error: {
				color: '#fff'
			}
		}

		return (
				<div style={styles.root}>
					{ status.error ?
						<div style={styles.error}>
							<h2>Sorry, something went wrong:</h2>
							<p>{status.message}</p>
						</div>
						:
						<div>
							<p>{status.message || 'Loading'}...</p>
						</div>
					}
				</div>
		);
	}
}

export default StatusMessage;