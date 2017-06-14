// @flow
import React from 'react';
import About from '../containers/about';
import './home.css';

class Home extends React.Component {
	render() {
		return (
			<header className="mdl-grid">
				<h1 className="mdl-cell mdl-cell--12-col">
					Benvenuto in serie A
				</h1>
				<div className="mdl-cell mdl-cell--12-col">
					<About name="Giancarlo" />
				</div>
				<div className="mdl-cell mdl-cell--12-col">
					<div className="mdl-grid">
						<div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
							6 (8 tablet)
						</div>
						<div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet">
							4 (6 tablet)
						</div>
						<div className="mdl-cell mdl-cell--2-col mdl-cell--4-col-phone">
							2 (4 phone)
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default Home;
