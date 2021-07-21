import React from "react";

const Footer = (props) => {
	const { classes } = props;
	return (
		<footer className={classes}>
			{console.log(props)}
			{props.children}
		</footer>
	);
};

export default Footer;
