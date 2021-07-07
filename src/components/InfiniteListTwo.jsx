import {useEffect} from 'react';
import dotenv from 'dotenv';
dotenv.config();

function InfiniteListTwo(props) {
    const { classesContainer, 
            classesElement,
            classesImages, 
            datas
          } = props;
    
    useEffect(() => {
        console.log(datas)
    }, [])

    return (
        <ul className={classesContainer ? classesContainer : "infinite__container"}>
            {
                datas instanceof Array &&
                datas.map(elmt => {
                    return (
                        <li className={classesElement ? classesElement : "infinite__element"}>
                            <img className={classesImages ? classesImages : "infinite__image"} src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default InfiniteListTwo;
