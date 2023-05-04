import type {Meta, StoryObj} from '@storybook/react';
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {Task} from "../Task/Task";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {InputLine} from "../InputLine/InputLine";
import {action} from "@storybook/addon-actions";
import ButtonGroup from "@mui/material/ButtonGroup";
import {addTaskAC} from "../../state/reducers/task-reducer";
import {AppRootStateType} from "../../state/store/store";
import {TaskType, Todolist} from "./ToDoList";
import {ReduxStoreProviderDecorator} from "../../state/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import {
    changeFilterAC,
    changeTitleTodolistAC,
    FilterValuesType,
    removeTodolistAC
} from "../../state/reducers/todolists-reducer";
import {ButtonUniversal} from "../Button/Button";


const meta: Meta<typeof Todolist> = {
    title: 'TODOLISTS/Todolist',
    component: Todolist,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}

export default meta;
type Story = StoryObj<typeof Todolist>;

type ReduxTodolistType = {
    todolistId: string
    title: string
}

const ReduxTodolist = ({todolistId, title}: ReduxTodolistType) => {
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState<FilterValuesType>('All')

    const changeFilterButtonHandler = (todolistID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, filterValue))
        setActiveButton(filterValue)
    }

    const deleteAllTodolistHandler = () => {
        dispatch(removeTodolistAC(todolistId))
    }

    const addTaskForTodolistHandler = (valueTitle: string) => {
        dispatch(addTaskAC(todolistId, valueTitle))
    }

    const updateTodolistHandler = (newTitleTodo: string) => {
        dispatch(changeTitleTodolistAC(todolistId, newTitleTodo))
    }

    const filteredTasks = (): TaskType[] => {
        let tasksForTodolist;
        switch (activeButton) {
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
                                                       todolistId={todolistId}/>)

    return (
      <div>
          <h3>
              <EditableSpan title={title}
                            callBack={updateTodolistHandler}/>

              <IconButton aria-label="delete"
                          onClick={action('Removed Todolist')}>
                  <DeleteIcon/>
              </IconButton>
          </h3>
          <InputLine callBack={addTaskForTodolistHandler}/>

          <ul>
              {mappedTasks}
          </ul>

          <ButtonGroup size="large" variant="text" aria-label="large outlined button group" sx={{
              display: "flex",
              justifyContent: "flex-start",
              ".MuiButtonGroup-grouped:not(:last-of-type)": {
                  border: 'none',
              }
          }}>
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

export const TodolistStory: Story = {
    render: () => <ReduxTodolist todolistId={'todolistId1'} title={'My hobbies'}/>,
};