function PageContainer(props) {
    const {classes} = props;
    return (
        <div className={classes ? `page ${classes}` : "page"}>
            {props.children}
        </div>
    )
}

export default PageContainer;
