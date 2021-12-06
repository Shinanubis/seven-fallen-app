import './flashMessage.css';
import {useEffect, useRef} from 'react';
import { AiOutlineWarning } from "react-icons/ai";
import { GrValidate } from "react-icons/gr";

function Flash({success, error, setFlash, redirect, redirectCallback}){
    const Warning = AiOutlineWarning;
    const Valid = GrValidate;

    let flashRef = useRef();

  useEffect(() => {
    let timer = "";

    if (success && success.length > 0) {
      flashRef.current.classList.add("fade-in", "success");
      timer = setTimeout(() => {
        if(flashRef.current){
          flashRef.current.classList.remove("fade-in", "success");
        }
      }, 600);
    }

    if (error && error.length > 0) {
      flashRef.current.classList.add("fade-in", "error");
      timer = setTimeout(() => {
        flashRef.current.classList.remove("fade-in", "error");
      }, 600);
    }

    timer = setTimeout(() => {
        if(redirect === true && success){
          redirectCallback();
        }
        setFlash({pending: false, error: "", success:""});
    },1000);

    return () => {
        clearTimeout(timer)
    };
  },[error, success, redirect, redirectCallback, setFlash]);

  return (
    <p ref={flashRef} className="flash__message">
      {error && (
        <>
          <Warning className="icon warning" />
          <span className="text">{error}</span>
        </>
      )}
      {success && (
        <>
          <Valid className="icon valid" />
          <span className="text">{success}</span>
        </>
      )}
    </p>
  );
}

export default Flash;