import React from 'react';
import Bar from '../components/bar';
import { currencySymbols } from '../currencies';
import type { Currency, Rates } from '../types';
import './chart.css';

function windowResizeHandler() {
	console.log(arguments);
}

class Chart extends React.Component {

	state: {
		availableWidth: number
	};

	constructor(props: { rates: Rates, curr: Currency }) {
		super(props);

		this.state = {
			availableWidth: 0
		};
	}

	getNormalizedWidth(val: number): number {
		const width = val * 20;
		return width < 500 ? width : 500;
	}

	componentDidMount() {
		const container = document.querySelector('.chart');
		const availableWidth = container.offsetWidth;
		console.log(availableWidth);
		this.setState({ availableWidth });
		window.addEventListener('resize', windowResizeHandler);
	}

	componentWillUnmount() {
		console.log('grafico smontato');
		window.removeEventListener('resize', windowResizeHandler);
	}

	render() {

		const currentBase = (
			<div className="chart__current-currency">
				<div className="chart__current-currency__name">
					1 {this.props.curr} {currencySymbols[this.props.curr]}
				</div>
			</div>
		);

		return (
			<div className="chart-container">
				<div className="chart">
					{this.props.rates.map((rate, index) => {

						if(rate.isVisible) {
						return <div className="chart__bar" key={index}>
							<Bar
								curr={rate.id}
								value={rate.value}
								symbol={currencySymbols[rate.id]}
								isVisible={rate.isVisible}
								barIndex={index}
								width={this.getNormalizedWidth(rate.value)}
							/>
						</div> } else {
							return null;
						}
					}
					)}
				</div>
			</div>
		);
	}
}

export default Chart;
