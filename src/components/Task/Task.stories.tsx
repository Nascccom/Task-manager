import type {ComponentStory, Meta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../state/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store/store";
import React from 'react';
import {SuperCheckBox} from "../SuperCheckBox/SuperCheckBox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../Todolist/Todolist.module.css";
import {changeToggleTaskAC, removeTaskAC, updateTaskAC} from "../../state/reducers/task-reducer";
import {action} from '@storybook/addon-actions';
import {TaskType} from "../../api/tasksAPI/tasks-api";


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta;

type TaskRedux = {
    todolistId: string
}

const TaskRedux = ({todolistId}: TaskRedux) => {

    const task = useSelector<AppRootStateType, TaskType>(
      state => state.tasks[todolistId][1])
    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(todolistId, task.id))
    }

    const updateTaskTitleHandler = (newTitle: string) => {
        dispatch(updateTaskAC(todolistId, task.id, newTitle))
    }

    const changeCheckboxStatus = (checked: boolean) => {
        dispatch(changeToggleTaskAC(todolistId, task.id, checked))
    }


    return (
      <li className={task.completed ? styles.isDone : ''}>
          <SuperCheckBox callBack={(checked) => changeCheckboxStatus(checked)}
                         checked={task.completed}/>

          <EditableSpan title={task.title}
                        callBack={updateTaskTitleHandler}/>

          <IconButton aria-label="delete"
                      onClick={action('Removed task')}>
              <DeleteIcon/>
          </IconButton>
      </li>
    )
}


const Template1: ComponentStory<typeof TaskRedux> = (args) => <TaskRedux {...args} />

export const TaskIsDone = Template1.bind({});
TaskIsDone.args = {
    todolistId: 'todolistId2'
}

export const TaskNotIsDone = Template1.bind({});
TaskNotIsDone.args = {
    todolistId: 'todolistId1'
}
