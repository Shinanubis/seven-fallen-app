import {forwardRef} from "react";

function FInputFile({text, id, className, onChange, labelClasses, accept}, ref){
    return (
            <label 
                className={labelClasses ? labelClasses : "input__file--label"} 
                htmlFor={id && id}
            >
                <span>
                    {text}
                </span>
                <input 
                    ref={ref}
                    id={id && id} 
                    className={className ? className : "input__file"} 
                    type="file"
                    onChange={onChange}
                    accept={accept && accept} 
                />
            </label>
    )
}


const InputFile = forwardRef(FInputFile);
export default InputFile;