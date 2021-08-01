function PageContainer(props) {
    const {classes} = props;
    return (
        <div className={classes ? `page ${classes}` : "page"}>
            
        </div>
    )
}

export default PageContainer;
