import React, {memo, useCallback, useState} from 'react';
import {ButtonUniversal} from '../Button/Button';

import {EditableSpan} from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {
    changeFilterAC,
    changeTitleTodolistAC,
    FilterValuesType,
    removeTodolistAC
} from "../../state/reducers/todolists-reducer";
import {addTaskAC} from "../../state/reducers/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store/store";
import {Task} from "../Task/Task";
import {InputLine} from "../InputLine/InputLine";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    activeFilter: FilterValuesType
}

export const Todolist = memo((props: PropsType) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState<FilterValuesType>('All')

    const changeFilterButtonHandler = useCallback((todolistID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, filterValue))
        setActiveButton(filterValue)
    }, [dispatch])

    const deleteAllTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(props.todolistId))
    }, [dispatch, props.todolistId])

    const addTaskForTodolistHandler = useCallback((valueTitle: string) => {
        dispatch(addTaskAC(props.todolistId, valueTitle))
    }, [dispatch, props.todolistId])

    const updateTodolistHandler = useCallback((newTitleTodo: string) => {
        dispatch(changeTitleTodolistAC(props.todolistId, newTitleTodo))
    }, [dispatch, props.todolistId])

    const filteredTasks = () => {
        let tasksForTodolist;
        switch (props.activeFilter) {
            case 'Active':
                return tasksForTodolist = tasks.filter(t => !t.isDone);
            case 'Completed':
                return tasksForTodolist = tasks.filter(t => t.isDone);
            default:
                return tasksForTodolist = tasks;
        }
    }

    const mappedTasks = filteredTasks().map(t => <Task key={t.id}
                                                       task={t}
                                                       todolistId={props.todolistId}/>)

    return (
      <div>
          <h3>
              <EditableSpan title={props.title}
                            callBack={updateTodolistHandler}/>

              <IconButton aria-label="delete"
                          onClick={deleteAllTodolistHandler}>
                  <DeleteIcon/>
              </IconButton>
          </h3>
          <InputLine callBack={addTaskForTodolistHandler}/>

          <ul>
              {mappedTasks}
          </ul>

          <div>
              <ButtonUniversal buttonName={'All'}
                               variant={activeButton === 'All' ? 'outlined' : "text"}
                               color="secondary"
                               callBack={() => changeFilterButtonHandler(props.todolistId, 'All')}/>
              <ButtonUniversal buttonName={'Active'}
                               variant={activeButton === 'Active' ? 'outlined' : "text"}
                               color="success"
                               callBack={() => changeFilterButtonHandler(props.todolistId, 'Active')}/>
              <ButtonUniversal buttonName={'Completed'}
                               variant={activeButton === 'Completed' ? 'outlined' : "text"}
                               color="error"
                               callBack={() => changeFilterButtonHandler(props.todolistId, 'Completed')}/>
          </div>
      </div>
    )
})
