import {v1} from 'uuid';
import {TodolistType} from '../App';
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

let todolistID1: string
let todolistID2: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ];
})

test('correct todolist should be removed', () => {

    const endState: Array<TodolistType> = todolistsReducer(startState, removeTodolistAC(todolistID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);

});
test('correct todolist should be added', () => {
    let newTodolist = 'New Todolist'

    const endState: Array<TodolistType> = todolistsReducer(startState, addTodolistAC(newTodolist));

    expect(endState.length).toBe(3);
    expect(endState[0].id).toBe(todolistID1);
    expect(endState[2].title).toBe('New Todolist');
});
test('correct todolist should be changed tittle todolist', () => {

    let newTodolistTitle = 'New Todolist';

    const endState: Array<TodolistType> = todolistsReducer(startState, changeTitleTodolistAC(todolistID1,
      newTodolistTitle));

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistID1);
    expect(endState[0].title).toBe('New Todolist');
    expect(endState[1].title).toBe("What to buy");
});
test('correct filter of the todolist should be changed ', () => {

    const newFilter = 'Completed'

    const endState: Array<TodolistType> = todolistsReducer(startState,
      changeFilterAC(todolistID2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});