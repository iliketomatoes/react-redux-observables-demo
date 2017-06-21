// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Topic from './topic';
import Topics from '../containers/topics';
import Home from '../containers/home';
import About from '../containers/about';
import ErrorDialog from '../containers/error-dialog';
import './root.css';

class RootComponent extends React.Component {
	constructor(props: { appName: string }) {
		super(props);
	}

	closeMenu() {
		const targetElement = document.querySelector(
			'.mdl-layout__obfuscator.is-visible'
		);
		if (targetElement) targetElement.click();
	}

	render() {
		return (
			<Router>
				<div className="mdl-layout mdl-js-layout mdl-layout--no-desktop-drawer-button">
					<header className="mdl-layout__header">
						<div className="mdl-layout-icon" />
						<div className="mdl-layout__header-row">
							<span className="mdl-layout__title">
								{this.props.appName}
							</span>
							<div className="mdl-layout-spacer" />
							<nav className="mdl-navigation">
								<Link className="mdl-navigation__link" to="/">
									Home
								</Link>
								<Link
									className="mdl-navigation__link"
									to="/about"
								>
									About
								</Link>
								<Link
									className="mdl-navigation__link"
									to="/topics"
								>
									Topics
								</Link>
							</nav>
						</div>
					</header>
					<div className="drawer-buffer" />
					<div className="mdl-layout__drawer">
						<span className="mdl-layout__title">
							{this.props.appName}
						</span>
						<nav className="mdl-navigation">
							<Link
								className="mdl-navigation__link"
								to="/"
								onClick={() => this.closeMenu()}
							>
								Home
							</Link>
							<Link
								className="mdl-navigation__link"
								to="/about"
								onClick={() => this.closeMenu()}
							>
								About
							</Link>
							<Link
								className="mdl-navigation__link"
								to="/topics"
								onClick={() => this.closeMenu()}
							>
								Topics
							</Link>
						</nav>
					</div>
					<main className="mdl-layout__content">
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/topics" component={Topics} />
						<ErrorDialog />
					</main>
				</div>
			</Router>
		);
	}
}
export default RootComponent;
