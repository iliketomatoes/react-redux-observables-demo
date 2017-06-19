// @flow
import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import type { RateDate } from '../types';

const optionsStyle = {
	maxWidth: 255,
	marginRight: 'auto'
};

class DateSelect extends React.Component {
	constructor(props: {
		currentDate: RateDate,
		maxDate: RateDate,
		onDateChange: (d: RateDate) => void
	}) {
		super(props);
	}

	makeDateObj(rateDate: RateDate) {
		return new Date(rateDate.year, rateDate.month - 1, rateDate.day);
	}

	handleChange(ev: any, date: any) {
		this.props.onDateChange({
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate()
		});
	}

	render() {
		const maxDate = this.makeDateObj(this.props.maxDate);
		const currentDate = this.makeDateObj(this.props.currentDate);

		return (
			<div className="date">
				{this.props.maxDate.year !== 0 &&
					this.props.currentDate.year != 0
					? <DatePicker
							floatingLabelText="Current rate exchange date"
							container="inline"
							defaultDate={maxDate}
							minDate={new Date(2000, 0, 3)}
							maxDate={maxDate}
							formatDate={date => date.toDateString()}
							value={currentDate}
							onChange={(ev: any, date: any) => this.handleChange(ev, date)}
						/>
					: ''}
			</div>
		);
	}
}

export default DateSelect;
