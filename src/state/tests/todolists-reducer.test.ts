import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from '../../features/TodolistList/todolists-reducer';
import {TodolistType} from "../../api/todolists-api";

let startState: Array<TodolistDomainType>

beforeEach(() => {
    startState = [
        {id: 'todolistID1', title: 'What to learn', filter: 'All', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistID2', title: 'What to buy', filter: 'All', addedDate: 'string', order: 0, entityStatus: 'idle'}
    ];
})

test('correct todolist should be removed', () => {

    const endState: Array<TodolistDomainType> = todolistsReducer(startState, removeTodolistAC('todolistID1'));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe('todolistID2');

});

test('correct todolist should be added', () => {
    let newTodolist: TodolistType = {id: 'todolistID3', title: 'React.FC', order: 0, addedDate: ''}

    const endState: Array<TodolistDomainType> = todolistsReducer(startState, addTodolistAC(newTodolist));

    expect(endState.length).toBe(3);
    expect(endState[0].id).toBe('todolistID3');
    expect(endState[1].id).toBe('todolistID1');
    expect(endState[2].id).toBe('todolistID2');
    expect(endState[0].title).toBe('React.FC');
});

test('correct todolist should be changed tittle todolist', () => {

    let newTodolistTitle = 'New Todolist';

    const endState: Array<TodolistDomainType> = todolistsReducer(startState,
      changeTitleTodolistAC('todolistID1', newTodolistTitle));

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe('todolistID1');
    expect(endState[0].title).toBe('New Todolist');
    expect(endState[1].title).toBe("What to buy");
});

test('correct filter of the todolist should be changed ', () => {

    const newFilter = 'Completed'

    const endState: Array<TodolistDomainType> = todolistsReducer(startState,
      changeFilterAC('todolistID2', newFilter));

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});