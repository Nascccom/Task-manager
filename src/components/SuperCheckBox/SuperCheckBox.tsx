import React, {ChangeEvent} from 'react';

type SuperCheckBoxType = {
    callBack: (checked: boolean) => void
    checked: boolean
}

export const SuperCheckBox = (props: SuperCheckBoxType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }

    return (
      <div>
          <input type="checkbox"
                 onChange={onChangeHandler}
                 checked={props.checked}
          />
      </div>
    );
};
