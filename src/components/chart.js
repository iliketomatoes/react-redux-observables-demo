import React from 'react';
import Bar from '../components/bar';
import { currencies } from '../currencies';
import type { Currency, Rates, RateDate } from '../types';
import './chart.css';

class Chart extends React.Component {
	constructor(props: { rates: Rates, curr: Currency }) {
		super(props);
	}

	getNormalizedHeight(val: number): number {
		const height = val * 20;
		return height < 500 ? height : 500;
	}

	render() {
		return (

			<div className="chart">
				<div className="chart__current-currency">
				<div className="chart__current-currency__name">
				1 {this.props.curr} {currencies[this.props.curr]} 
				</div>
				</div>
					{this.props.rates.map((rate, index) =>
						<div className="chart__bar" key={index}>
							<Bar
								curr={rate.id}
								val={rate.value}
								symbol={rate.symbol}
								isVisible={rate.isVisible}
								barIndex={index}
								height={this.getNormalizedHeight(rate.value)}
							/>
						</div>
					)}
			</div>
		);
	}
}

export default Chart;
