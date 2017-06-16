// @flow
import React from 'react';
import './bar.css';

class Bar extends React.Component {
	state = {
		opacity: 0
	};

	constructor(props: {
		curr: string,
		val: number,
		symbol: string,
		isVisible: boolean,
		barIndex: number,
		height: number
	}) {
		super(props);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				opacity: 1
			});
		}, 150);
	}

	render() {
		if (this.props.isVisible) {
			const style = {
				height: this.props.height
			};

			return (
				<div className="bar">
					<div
						className="bar__column"
						style={{
							height: this.props.height,
							opacity: this.state.opacity
						}}
					/>
					<div className="bar__desc">
						{this.props.symbol}
						<span className="bar__desc--secondary">
							{this.props.curr}
						</span>
					</div>
				</div>
			);
		} else {
			return;
		}
	}
}

export default Bar;
