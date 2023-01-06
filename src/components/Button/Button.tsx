import React from 'react';
import {Button} from '@mui/material';


type ButtonType = {
    buttonName: string
    callBack: () => void
    activeFilter?: string
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    size?:  "small" | "medium" | "large"
    variant?:  "text" | "outlined" | "contained"
    startIcon?: React.ReactNode
    style?: object
}

export const ButtonUniversal = (props: ButtonType) => {
    const onclickButtonHandler = () => {
        props.callBack()
    }

    return (
      <Button onClick={onclickButtonHandler}
              color={props.color}
              size={props.size}
              variant={props.variant}
              style={props.style}
              startIcon={props.startIcon}
      >
          {props.buttonName}
      </Button>
    );
};



