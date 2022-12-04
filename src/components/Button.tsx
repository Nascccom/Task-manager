import React from 'react';

type ButtonType = {
    buttonName: string
    callBack: () => void
}

export const Button = (props: ButtonType) => {

    const onclickButtonHandler = () => {
        props.callBack()
    }

    return (
      <button onClick={onclickButtonHandler}>{props.buttonName}</button>
    );
};

export default Button;