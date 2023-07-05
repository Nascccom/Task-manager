import React, {ChangeEvent, memo} from 'react';

type SuperCheckBoxType = {
    callBack: (checked: boolean) => void
    checked: boolean
}

export const SuperCheckBox = memo((props: SuperCheckBoxType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }

    return (
      <input type="checkbox"
             onChange={onChangeHandler}
             checked={props.checked}
      />

    );
});
