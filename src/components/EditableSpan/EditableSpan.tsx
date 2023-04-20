import React, {ChangeEvent, memo, useState} from 'react';

export type PropsTypeEditableSpan = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = memo((props: PropsTypeEditableSpan) => {
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
});
