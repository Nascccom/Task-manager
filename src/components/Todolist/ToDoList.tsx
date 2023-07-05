import React, {memo, useCallback, useEffect, useState} from 'react';
import {ButtonUniversal} from '../Button/Button';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {
    changeFilterAC,
    FilterValuesType,
    removeTodolistTC,
    updateTodolistTitleTC
} from "../../state/reducers/todolists-reducer";
import {addTaskTC, getTasksTC} from "../../state/reducers/task-reducer";
import {Task} from "../Task/Task";
import {InputLine} from "../InputLine/InputLine";
import ButtonGroup from "@mui/material/ButtonGroup";
import {TaskType} from "../../api/tasksAPI/tasks-api";
import {useAppDispatch} from "../../hooks/useDiapstch/useDispacth";
import {useAppSelector} from "../../hooks/useSelector/useSelector";


type PropsType = {
    todolistId: string
    title: string
    activeFilter: FilterValuesType
}

export const Todolist = memo((props: PropsType) => {
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useAppDispatch()
    const [activeButton, setActiveButton] = useState<FilterValuesType>('All')

    useEffect(() => {
        dispatch(getTasksTC(props.todolistId))
    }, [])

    const changeFilterButtonHandler = useCallback((todolistID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, filterValue))
        setActiveButton(filterValue)
    }, [dispatch])

    const deleteTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC(props.todolistId))
    }, [dispatch, props.todolistId])

    const addTaskForTodolistHandler = useCallback((valueTitle: string) => {
        dispatch(addTaskTC(props.todolistId, valueTitle))
        // dispatch(addTaskAC(props.todolistId, valueTitle))
    }, [dispatch, props.todolistId])

    const updateTodolistHandler = useCallback((newTitleTodo: string) => {
        // dispatch(changeTitleTodolistAC(props.todolistId, newTitleTodo))
        dispatch(updateTodolistTitleTC(props.todolistId, newTitleTodo))
    }, [dispatch, props.todolistId])

    const filteredTasks = () => {
        switch (props.activeFilter) {
            case 'Active':
                return tasks.filter(t => !t.completed);
            case 'Completed':
                return tasks.filter(t => t.completed);
            default:
                return tasks;
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
                          onClick={deleteTodolistHandler}>
                  <DeleteIcon/>
              </IconButton>
          </h3>
          <InputLine callBack={addTaskForTodolistHandler}/>

          <ul>
              {mappedTasks}
          </ul>

          <ButtonGroup size="large" variant="text" aria-label="large outlined button group" sx={ButtonGroupStyles}>
              <ButtonUniversal buttonName={'All'}
                               color={activeButton === 'All' ? 'success' : "secondary"}
                               callBack={() => changeFilterButtonHandler(props.todolistId, 'All')}/>
              <ButtonUniversal buttonName={'Active'}
                               color={activeButton === 'Active' ? 'success' : "secondary"}
                               callBack={() => changeFilterButtonHandler(props.todolistId, 'Active')}/>
              <ButtonUniversal buttonName={'Completed'}
                               color={activeButton === 'Completed' ? 'success' : "secondary"}
                               callBack={() => changeFilterButtonHandler(props.todolistId, 'Completed')}/>
          </ButtonGroup>
      </div>
    )
})

const ButtonGroupStyles = {
    display: "flex",
    justifyContent: "space-between",
    ".MuiButtonGroup-grouped:not(:last-of-type)": {
        border: 'none',
    }
}
