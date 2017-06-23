// @flow
import React from 'react';
import './statistic-fact.css';

function StatisticFact(props: {
	type: string,
	title: string,
	content: string,
	conversion: string
}) {
	if (props.type === 'currency') {
		return (
			<div className="statistic-fact">
				<span className="statistic-fact__title">{props.title}:</span>
				<span className="statistic-fact__content">{props.content}</span>
				<span className="statistic-fact__conversion">
					{' '}({props.conversion})
				</span>
			</div>
		);
	} else {
		return (
			<div className="statistic-fact">
				<span className="statistic-fact__title">{props.title}:</span>
				<span className="statistic-fact__content">{props.content}</span>
			</div>
		);
	}
}

export default StatisticFact;
