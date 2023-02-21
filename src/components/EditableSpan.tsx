import React, {ChangeEvent, useState} from 'react';

type PropsTypeEditableSpan = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: PropsTypeEditableSpan) => {
    const [newTitle, setNewTitle] = useState<string>(props.title)
    const [edit, setEdit] = useState(false)
    const transformHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
      edit
        ? <input value={newTitle}
                 autoFocus
                 onChange={onChangeHandler}
                 onBlur={transformHandler}/>
        : <span onDoubleClick={transformHandler}> {props.title}</span>
    );
};
