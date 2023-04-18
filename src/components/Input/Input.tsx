import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {ButtonUniversal} from '../Button/Button';
import TextField from '@mui/material/TextField';

type PropsType = {
    callBack: (valueTitle: string) => void
}

export const Input = memo((props: PropsType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<null | string>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }
    const onKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (title.trim()) {
            props.callBack(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
      <div>
          <TextField id="outlined-basic"
                     label={error ? error : "Enter something..."}
                     variant="outlined"
                     size="small"
                     error={!!error}
                     value={title}
                     onChange={onChangeInputHandler}
                     onKeyDown={onKeydownHandler}
          />
          <ButtonUniversal size="medium"
                           variant="outlined"
                           style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                           buttonName={'+'}
                           callBack={addTaskHandler}
          />
      </div>
    );
});

