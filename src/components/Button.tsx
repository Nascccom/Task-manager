import React from 'react';
import styles from './../Todolist.module.css'

type ButtonType = {
    buttonName: string
    callBack: () => void
    activeFilter?: string
}

export const Button = (props: ButtonType) => {

    const onclickButtonHandler = () => {
        props.callBack()
    }

    return (
      <button className={props.buttonName == props.activeFilter ? styles.activeFilter : ''}
              onClick={onclickButtonHandler}>{props.buttonName}</button>
    );
};

export default Button;



