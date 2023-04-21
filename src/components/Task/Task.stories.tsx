import type {Meta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../state/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {TaskType} from "../Todolist/ToDoList";
import {AppRootStateType} from "../../state/store/store";
import React from 'react';


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],

}

const TaskReduxIsDone = () => {
    const task = useSelector<AppRootStateType, TaskType>(
      state => state.tasks['todolistId2'][1])
    return <Task task={task} todolistId={'todolistId2'}/>
}
const TaskReduxNotIsDone = () => {
    const task = useSelector<AppRootStateType, TaskType>(
      state => state.tasks['todolistId1'][1])
    return <Task task={task} todolistId={'todolistId1'}/>
}

export default meta;

const Template1 = () => <TaskReduxIsDone  />
export const TaskIsDone = Template1.bind({});
// @ts-ignore
TaskIsDone.args =  {

}


const Template2 = () => <TaskReduxNotIsDone  />
export const TaskNotIsDone = Template2.bind({});
// @ts-ignore
TaskNotIsDone.args =  {

}