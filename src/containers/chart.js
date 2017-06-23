import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Bar from '../components/bar';
import Stats from '../components/statistic-fact';
import { currencySymbols, humanReadableCurrencies } from '../currencies';
import type { Currency, Rates, Statistics } from '../types';
import './chart.css';

// https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

function windowResizeHandler() {
	console.log(arguments);
}

class Chart extends React.Component {
	state: {
		availableWidth: number,
		magnitude: number
	};

	constructor(props: {
		rates: Rates,
		curr: Currency,
		statistics: Statistics
	}) {
		super(props);

		this.state = {
			availableWidth: 0,
			magnitude: 0
		};
	}

	getNormalizedWidth(val: number): number {
		const availableWidth = this.state.availableWidth - 140;
		const width = val * (availableWidth / (this.props.statistics.mean / 2));
		console.log(availableWidth / (this.props.statistics.mean / 2));
		return width < availableWidth ? width : availableWidth;
	}

	componentDidMount() {

		let onResizeFn = () => {
			const container = document.querySelector('.chart');
			const availableWidth = container.offsetWidth;
			this.setState({ availableWidth });
		};

		window.addEventListener('resize', onResizeFn);

		onResizeFn();

		setTimeout(() => {
			this.setState({
				magnitude: 1
			});
		}, 200);
	}

	componentWillUnmount() {
		console.log('grafico smontato');
		window.removeEventListener('resize', windowResizeHandler);
	}

	render() {
		if (
			this.props.statistics.max.value === 0 ||
			this.state.availableWidth === 0
		) {
			return (
				<div className="chart-container">
					<div className="chart" />
				</div>
			);
		}

		const bars = this.props.rates.map((rate, index) => {
			if (rate.isVisible) {
				return (
					<div className="chart__bar" key={index}>
						<Bar
							curr={rate.id}
							value={rate.value}
							symbol={currencySymbols[rate.id]}
							isVisible={rate.isVisible}
							barIndex={index}
							width={
								this.getNormalizedWidth(rate.value) *
									this.state.magnitude || 0
							}
						/>
					</div>
				);
			} else {
				return null;
			}
		});

		return (
			<div className="chart-container">
				<div className="chart">
					{bars}
				</div>
				<div className="chart-info">
					<Stats
						type="currency"
						title={`Strongest currency against ${humanReadableCurrencies[
							this.props.curr
						]}`}
						content={`${humanReadableCurrencies[
							this.props.statistics.min.id
						]}`}
						conversion={`1 ${this.props.statistics.min.id} = ${(1 /
							this.props.statistics.min.value).toFixed(
							3
						)} ${currencySymbols[this.props.curr]}`}
					/>
					<Stats
						type="currency"
						title={`Weakest currency against ${humanReadableCurrencies[
							this.props.curr
						]}`}
						content={`${humanReadableCurrencies[
							this.props.statistics.max.id
						]}`}
						conversion={`1 ${this.props.statistics.max.id} = ${(1 /
							this.props.statistics.max.value).toFixed(
							4
						)} ${currencySymbols[this.props.curr]}`}
					/>
					<Stats
						type="statistic"
						title="Mean"
						content={this.props.statistics.mean.toFixed(4)}
					/>
					<Stats
						type="statistic"
						title="Standard deviation"
						content={this.props.statistics.standardDeviation.toFixed(
							4
						)}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: typeof initialState) => {
	return {
		curr: state.currency,
		rates: state.rates,
		statistics: state.statistics
	};
};

const connectedChart = withRouter(connect(mapStateToProps)(Chart));

export default connectedChart;
