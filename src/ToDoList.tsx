import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import Button from './components/Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (valueTitle: string) => void
    toggleCheckBox: (taskID: string, checked: boolean) => void

}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>('')

    const mappedTasks = props.tasks.map(t => {
        const removeTaskHandler = () => {
            props.removeTask(t.id)
        }
        const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.toggleCheckBox(t.id, event.currentTarget.checked)
        }

        return (
          <li key={t.id}>
              <input type="checkbox" onChange={onChangeCheckboxHandler} checked={t.isDone}/>
              <span>{t.title}</span>
              <Button buttonName={'X'} callBack={removeTaskHandler}/>
          </li>)
    })

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (title.trim()) {
            props.addTask(title.trim())
            setTitle('')
        }

    }

    const onClickChangeFilterButtonHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input  value={title} onChange={onChangeInputHandler} onKeyDown={onKeydownHandler}/>
            <Button buttonName={'+'} callBack={addTaskHandler}/>
        </div>
        <ul>
            {mappedTasks}

        </ul>
        <div>
            <Button buttonName={'All'}
                    callBack={() => onClickChangeFilterButtonHandler('all')}/>
            <Button buttonName={'Active'}
                    callBack={() => onClickChangeFilterButtonHandler('active')}/>
            <Button buttonName={'Completed'}
                    callBack={() => onClickChangeFilterButtonHandler('completed')}/>

        </div>
    </div>
}
