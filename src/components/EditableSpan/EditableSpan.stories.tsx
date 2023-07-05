import type {Meta, StoryObj} from '@storybook/react';
import React, {ChangeEvent, useState} from "react";
import {EditableSpan, PropsType} from "./EditableSpan";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callBack: {
            description: "Change title's name",
            action: 'EditableSpan',
        },
    },
    args: {
        title: 'This is span. Click me'
    },

};

export default meta;
type Story = StoryObj<typeof EditableSpan>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const SpanText: Story = {

};

export const SpanInput = (args: PropsType) => {
    const [newTitle, setNewTitle] = useState<string>(args.title)
    const [edit, setEdit] = useState(true)
    const transformHandler = () => {
        setEdit(!edit)
        args.callBack(newTitle)
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
        : <span onDoubleClick={transformHandler}> {args.title}</span>
    );
}

