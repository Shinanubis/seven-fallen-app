import React from 'react'

const hasProvider = Component => (props) => {
    let Provider = props.provider;
    return (
        <Provider>
            <Component>
                {props.children}
            </Component>
        </Provider>
    )
}

export default hasProvider;
