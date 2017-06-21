// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Topic from './topic';
import Topics from '../containers/topics';
import Home from '../containers/home';
import About from '../containers/about';
import ErrorDialog from '../containers/error-dialog';
import './root.css';

class RootComponent extends React.Component {
	state: {
		isDrawerOpen: boolean
	};

	constructor(props: { appName: string }) {
		super(props);

		this.state = {
			isDrawerOpen: false
		};
	}

	closeMenu() {
		const targetElement = document.querySelector(
			'.mdl-layout__obfuscator.is-visible'
		);
		if (targetElement) targetElement.click();
	}

	openMenu() {
		this.setState({ isDrawerOpen: true });
	}

	closeMenu() {
		this.setState({ isDrawerOpen: false });
	}

	render() {
		return (
			<Router>
				<div className="mdl-layout mdl-js-layout mdl-layout--no-desktop-drawer-button">
					<AppBar
						title={this.props.appName}
						iconClassNameRight="muidocs-icon-navigation-expand-more"
						onLeftIconButtonTouchTap={ev => this.openMenu()}
					/>
					<Drawer docked={false} open={this.state.isDrawerOpen} onRequestChange={(open) => this.closeMenu()}>
						<MenuItem>
							<Link
								className="navigation__link"
								to="/"
								onClick={() => this.closeMenu()}
							>
								Home
							</Link>
						</MenuItem>
						<MenuItem>
							<Link
								className="navigation__link"
								to="/about"
								onClick={() => this.closeMenu()}
							>
								About
							</Link>
						</MenuItem>
						<MenuItem>
							<Link
								className="navigation__link"
								to="/topics"
								onClick={() => this.closeMenu()}
							>
								Topics
							</Link>
						</MenuItem>
					</Drawer>
					<main>
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
