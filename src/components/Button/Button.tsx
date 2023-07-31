import React, {memo, useCallback} from 'react';
import Button from '@mui/material/Button';

type ButtonType = {
    /** Name of the button */
    buttonName: string
    /** Action which happens on click */
    callBack: () => void
    /** Button color */
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    /** Button size */
    size?:  "small" | "medium" | "large"
    /** Button appearance */
    variant?:  "text" | "outlined" | "contained"
    /** Additional button styles */
    style?: object
}

export const ButtonUniversal = memo((props: ButtonType) => {

    const onclickButtonHandler = useCallback(() => {
        props.callBack()
    }, [props.callBack])

    return (
      <Button onClick={onclickButtonHandler}
              color={props.color}
              size={props.size}
              variant={props.variant}
              style={props.style}
      >
          {props.buttonName}
      </Button>
    );
});

