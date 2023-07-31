import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../state/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import React, {useState} from 'react';
import {SuperCheckBox} from "../../../../components/SuperCheckBox/SuperCheckBox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../Todolist.module.css";
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses, TaskType} from "../../../../api/tasksAPI/tasks-api";
import {useAppSelector} from "../../../../hooks/useSelector/useSelector";


export default {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}

type TaskReduxType = {
    todolistId: string
}

const TaskRedux = ({todolistId}: TaskReduxType) => {
    const task = useAppSelector<TaskType>(state => state.tasks[todolistId][0])
    const [status, setStatus] = useState(task.status)

    const changeCheckboxStatus = () => {
        if (status === TaskStatuses.Completed) {
            setStatus(TaskStatuses.New)
        } else {
            setStatus(TaskStatuses.Completed)
        }
    }

    return (
      <li className={status === TaskStatuses.Completed ? styles.isDone : ''}>
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

export const TaskIsDone = {
    args: {
        task: {
            id: '1',
            title: 'HTML&CSS',
            completed: true,
            description: 'I am task',
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            startDate: '',
            deadline: '',
            todoListId: 'todolistId1',
            order: 0,
            addedDate: ''
        }
    }
}
export const TaskNotDone = {
    args: {
        task: {
            ...TaskIsDone.args.task,
            status: TaskStatuses.New,
        }
    }
}
