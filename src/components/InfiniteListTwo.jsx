import React from 'react'

function InfiniteListTwo(props) {
    const { classesContainer, 
            classesElement,
            classesImages, 
            datas
          } = props;

    return (
        <ul classes={classesContainer ? classesContainer : "infinite__container"}>
            {
                datas instanceof Array &&
                datas.map(elmt => {
                    return (
                        <li className={classesElement ? classesElement : "infinite__element"}>
                            <img className={classesImages ? classesImages : "infinite__image"} src={datas.image_path} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default InfiniteListTwo;
