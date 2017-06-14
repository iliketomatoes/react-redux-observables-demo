// @flow
import React from 'react';

const About = (props: { name: string }) => {
	return (
		<div>
			<h1>{props.name}</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
				aliquam architecto at exercitationem ipsa iste molestiae nobis
				odit! Error quo reprehenderit velit! Aperiam eius non odio
				optio, perspiciatis suscipit vel?
			</p>
		</div>
	);
};

export default About;
