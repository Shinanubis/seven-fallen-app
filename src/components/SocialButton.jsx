import React from "react";
import "./SocialButton.css";
const SocialButton = (props) => {
	return (
		<a
			style={{ backgroundColor: props.bgcolor }}
			href={props.url}
			className="btn btn__social"
		>
			{props.children}
		</a>
	);
};

export default SocialButton;
