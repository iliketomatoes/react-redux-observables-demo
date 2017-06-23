// @flow
import React from 'react';
import './bar.css';

class Bar extends React.Component {
	state: {
		opacity: number
	};

	constructor(props: {
		curr: string,
		value: number,
		symbol: string,
		isVisible: boolean,
		barIndex: number,
		width: number
	}) {
		super(props);

		this.state = {
			opacity: 1
		};
	}

	componentDidMount() {
		/*setTimeout(() => {
			this.setState({
				opacity: 1
			});
		}, 100);*/
	}

	render() {
		if (this.props.isVisible) {
			return (
				<div className="bar">
					<div className="bar__desc">
						<span>
							{this.props.symbol}
						</span>
						<span className="bar__desc--secondary">
							{this.props.curr}
						</span>
					</div>
					<div
						className="bar__column"
						style={{
							width: this.props.width,
							opacity: this.state.opacity
						}}
					/>
					<div className="bar__caption">
						{this.props.value}
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default Bar;
