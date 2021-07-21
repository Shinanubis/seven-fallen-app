import React from "react";
import "./SocialButton.css";
const SocialButton = (props) => {
	const { color, bgcolor } = props;
	return (
		<a
			style={{ backgroundColor: bgcolor, color: color }}
			href={props.url}
			className="btn btn__social"
		>
			{props.children}
		</a>
	);
};

export default SocialButton;
