import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {Task} from "./Task/Task";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {InputLine} from "../../../components/InputLine/InputLine";
import {action} from "@storybook/addon-actions";
import ButtonGroup from "@mui/material/ButtonGroup";
import {addTaskAC} from "../../../state/reducers/task-reducer";
import {Todolist} from "./ToDoList";
import {ReduxStoreProviderDecorator} from "../../../state/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import {changeFilterAC, FilterValuesType} from "../../../state/reducers/todolists-reducer";
import {ButtonUniversal} from "../../../components/Button/Button";
import {TaskPriorities, TaskStatuses, TaskType} from "../../../api/tasksAPI/tasks-api";
import {v1} from "uuid";
import {ButtonGroupStyle} from "./TodolistStyles";
import {useAppSelector} from "../../../hooks/useSelector/useSelector";


export default {
    title: 'TODOLISTS/Todolist',
    component: Todolist,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
    excludeStories: /.*initialGlobalState$/,
}

type ReduxTodolistType = {
    todolistId: string
    title: string
}

const newTask = (todolistId: string, valueTitle: string): TaskType => {
    return {
        id: v1(),
        completed: true,
        title: valueTitle,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todolistId,
        order: 0,
        addedDate: '',
        description: ''
    }
}

const ReduxTodolist = ({todolistId, title}: ReduxTodolistType) => {
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState<FilterValuesType>('All')

    const changeFilterButtonHandler = (todolistID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, filterValue))
        setActiveButton(filterValue)
    }

    const addTaskForTodolistHandler = (valueTitle: string) => {
        dispatch(addTaskAC(todolistId, newTask(todolistId, valueTitle)))
    }

    const filteredTasks = (): TaskType[] => {
        let tasksForTodolist;
        switch (activeButton) {
            case 'Active':
                return tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
            case 'Completed':
                return tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
            default:
                return tasksForTodolist = tasks;
        }
    }

    const mappedTasks = filteredTasks().map(t => <Task key={t.id}
                                                       task={t}
                                                       todolistId={todolistId}/>)

    return (
      <div>
          <h3>
              <EditableSpan title={title}
                            callBack={action('Title was changed')}/>

              <IconButton aria-label="delete"
                          onClick={action('Todolist was removed')}>
                  <DeleteIcon/>
              </IconButton>
          </h3>
          <InputLine callBack={addTaskForTodolistHandler}/>

          <ul>
              {mappedTasks}
          </ul>

          <ButtonGroup size="large" variant="text" aria-label="large outlined button group" sx={ButtonGroupStyle}>
              <ButtonUniversal buttonName={'All'}
                               color={activeButton === 'All' ? 'success' : "secondary"}
                               callBack={() => changeFilterButtonHandler(todolistId, 'All')}/>
              <ButtonUniversal buttonName={'Active'}
                               color={activeButton === 'Active' ? 'success' : "secondary"}
                               callBack={() => changeFilterButtonHandler(todolistId, 'Active')}/>
              <ButtonUniversal buttonName={'Completed'}
                               color={activeButton === 'Completed' ? 'success' : "secondary"}
                               callBack={() => changeFilterButtonHandler(todolistId, 'Completed')}/>
          </ButtonGroup>
      </div>
    )
}

export const Todolist1 = {
    decorators: [
        () => (<ReduxTodolist todolistId={'todolistId1'} title={'Cold '}/>)
    ]
}

export const Todolist2 = {
    decorators: [
        () => (<ReduxTodolist todolistId={'todolistId2'} title={'New '} />)
    ]
}
