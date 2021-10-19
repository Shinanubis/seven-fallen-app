function Text({classes="member__text", text = '01/01/1970' }) {
    return (
        <p className={classes}>{text}</p>
    )
}

export default Text;
