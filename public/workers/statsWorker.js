/*
* Round the currency exchange rate value to 3 decimal digits at most.
* Also remove the trailing zero(es).
* e.g. 23.45678 -> 23.457
* e.g. 15.9999 -> 16
* e.g. 15.999 -> 15.999
* e.g. 2.230 -> 2.23
*/
function roundCurrencyExchangeRate(val) {
	// Separate the integer part from the decimal part
	const explodedValue = val.toString().split('.');
	const decimals = explodedValue[1];

	// If there are no decimal digits or they are less than 4 it returns the original value
	if (explodedValue.length < 2 || decimals.length <= 3) {
		return val;
	}

	const exceedingDecimals = decimals.length - 3;

	const roundedDecimals =
		Math.round(decimals / Math.pow(10, exceedingDecimals)) /
		Math.pow(10, decimals.length - exceedingDecimals);

	const fixedDecimals = roundedDecimals.toString().split('.')[1];

	return parseFloat(+explodedValue[0] + roundedDecimals).toFixed(
		fixedDecimals ? fixedDecimals.length : 0
	);
}

function standardDeviation(values) {
	const avg = average(values);

	const squareDiffs = values.map(function(value) {
		const diff = value - avg;
		const sqrDiff = diff * diff;
		return sqrDiff;
	});

	const avgSquareDiff = average(squareDiffs);

	const stdDev = Math.sqrt(avgSquareDiff);
	return stdDev;
}

function average(data) {
	const sum = data.reduce(function(sum, value) {
		return sum + value;
	}, 0);

	const avg = sum / data.length;
	return avg;
}

this.onmessage = ({ data: action }) => {
	// `data` should be a FSA compliant action object.
	switch (action.type) {
		case 'ON_DATA_RECEIVED':
			const roundedRates = action.payload.map((rate, index) => {
				return {
					id: rate.id,
					value: roundCurrencyExchangeRate(rate.value),
					isVisible: rate.isVisible
				};
			});
			this.postMessage({
				type: 'ON_DATA_ROUNDED',
				// Notice that we remove the `meta.WebWorker` field from the payload.
				// Since the returned data will be dispatched as a new action and be passed through all the middlewares,
				// keeping the `meta.WebWorker` field may cause an infinite loop.
				payload: roundedRates
			});
			break;

		case 'COMPUTE_STATISTICS':
			const visibleRates = action.payload.filter(rate => rate.isVisible);

			const max = visibleRates.reduce(function(prev, curr) {
				return prev.value > curr.value ? prev : curr;
			});

			const min = visibleRates.reduce(function(prev, curr) {
				return prev.value <= curr.value ? prev : curr;
			});

			const valueArr = visibleRates.map(rate => parseFloat(rate.value));

			const mean = average(valueArr);

			const stdDev = standardDeviation(valueArr);

			this.postMessage({
				type: 'STATISTICS_COMPUTED',
				payload: {
					max: max,
					min: min,
					mean: mean,
					standardDeviation: stdDev
				}
			});
			break;

		default:
			break;
	}
};
