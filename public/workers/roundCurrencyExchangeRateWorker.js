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
	if (explodedValue.length < 2 || decimals.length <= 3) return val;

	const exceedingDecimals = decimals.length - 3;

	const roundedDecimals = (Math.round(decimals /  Math.pow(10, exceedingDecimals)) / Math.pow(10, decimals.length - exceedingDecimals));

	const fixedDecimals = roundedDecimals.toString().split('.')[1];

	return parseFloat(+explodedValue[0] + roundedDecimals).toFixed(fixedDecimals ? fixedDecimals.length : 0);
}

this.onmessage = ({ data: action }) => { // `data` should be a FSA compliant action object.
	const roundedRates = action.payload.map((rate, index) => {
		return { id: rate.id, value: roundCurrencyExchangeRate(rate.value) };
	});
  this.postMessage({
    type: action.type,
    // Notice that we remove the `meta.WebWorker` field from the payload.
    // Since the returned data will be dispatched as a new action and be passed through all the middlewares,
    // keeping the `meta.WebWorker` field may cause an infinite loop.
    payload: roundedRates
  });
};
