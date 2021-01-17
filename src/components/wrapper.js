function Wrapper (props) {
    return (
        <div className="page-container">
            {props.children}
        </div>
    )
}

export default Wrapper;