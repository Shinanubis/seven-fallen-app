import React from "react";
import { useHistory } from "react-router-dom";

const Footer = (props) => {
	const { classes } = props;

	return(
		<footer className={classes}>{props.children}</footer>
	);
};

export default Footer;
