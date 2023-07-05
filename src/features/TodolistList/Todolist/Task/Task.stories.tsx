import type {ComponentStory, Meta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../state/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import React, {useState} from 'react';
import {SuperCheckBox} from "../../../../components/SuperCheckBox/SuperCheckBox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../Todolist.module.css";
import {action} from '@storybook/addon-actions';
import {TaskStatuses, TaskType} from "../../../../api/tasksAPI/tasks-api";
import {useAppSelector} from "../../../../hooks/useSelector/useSelector";


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta;

type TaskReduxType = {
    todolistId: string
}

const TaskRedux = ({todolistId}: TaskReduxType) => {
    const task = useAppSelector<TaskType>(state => state.tasks[todolistId][1])
    const [status, setStatus] = useState(TaskStatuses.New)

    const changeCheckboxStatus = () => {
        if (status === TaskStatuses.Completed) {
            setStatus(TaskStatuses.New)
        } else {
            setStatus(TaskStatuses.Completed)
        }
    }

    return (
      <li className={status === TaskStatuses.Completed ? styles.isDoneTask : ''}>
          <SuperCheckBox
            callBack={changeCheckboxStatus}
            checked={status === TaskStatuses.Completed}/>

          <EditableSpan title={task.title}
                        callBack={action('Tasks\'s title was changing')}/>
          <IconButton aria-label="delete"
                      onClick={action('Task Removed')}>
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
