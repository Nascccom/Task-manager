import React, {memo, useCallback, useState} from 'react';
import {ButtonUniversal} from '../../../components/Button/ButtonUniversal';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {changeFilterAC, FilterValuesType, removeTodolistTC, updateTodolistTitleTC} from "../todolists-reducer";
import {addTaskTC} from "./Task/task-reducer";
import {Task} from "./Task/Task";
import {InputLine} from "../../../components/InputLine/InputLine";
import ButtonGroup from "@mui/material/ButtonGroup";
import {TaskStatuses} from "../../../api/tasks-api";
import {useAppDispatch} from "../../../hooks/useDiapstch/useDispacth";
import {RequestStatusType} from "../../../app/app-reducer";
import {selectTasks} from "../../../hooks/useSelector/selectors";
import {useAppSelector} from "../../../hooks/useSelector/useSelector";


type PropsType = {
    todolistId: string
    title: string
    activeFilter: FilterValuesType
    entityStatus: RequestStatusType
}

export const Todolist = memo((
  {
      todolistId,
      title,
      activeFilter,
      entityStatus
  }: PropsType) => {

    const tasks = useAppSelector(selectTasks(todolistId));
    const dispatch = useAppDispatch()
    const [activeButton, setActiveButton] = useState<FilterValuesType>('All')

    const changeFilterButtonHandler = useCallback((todolistId: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC({todolistId, filter: filterValue}))
        setActiveButton(filterValue)
    }, [dispatch])

    const deleteTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch, todolistId])

    const addTaskForTodolistHandler = useCallback((valueTitle: string) => {
        dispatch(addTaskTC(todolistId, valueTitle))
    }, [dispatch, todolistId])

    const updateTodolistHandler = useCallback((newTitle: string) => {
        dispatch(updateTodolistTitleTC(todolistId, newTitle))
    }, [dispatch, todolistId])

    const filteredTasks = () => {
        switch (activeFilter) {
            case 'Active':
                return tasks.filter(t => t.status === TaskStatuses.New);
            case 'Completed':
                return tasks.filter(t => t.status === TaskStatuses.Completed);
            default:
                return tasks;
        }
    }

    const mappedTasks = filteredTasks().map(t => <Task key={t.id}
                                                       task={t}
                                                       todolistId={todolistId}/>)

    return (
      <div>
          <h3>
              <EditableSpan title={title}
                            callBack={updateTodolistHandler}
              />

              <IconButton aria-label="delete"
                          onClick={deleteTodolistHandler}
                          disabled={entityStatus === 'loading'}>
                  <DeleteIcon/>
              </IconButton>
          </h3>
          <InputLine callBack={addTaskForTodolistHandler}
                     disabled={entityStatus === 'loading'}/>

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
})

export const ButtonGroupStyle = {
    display: "flex",
    justifyContent: "flex-start",
    ".MuiButtonGroup-grouped:not(:last-of-type)": {
        border: 'none',
    }
}