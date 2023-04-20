import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../state/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
    args: {
        todolistId: 'Hudul'
    }
}

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDone: Story = {
    args: {
        task: {id: '1', title: 'React', isDone: true},
    }
}
export const TaskNotIsDone: Story = {
    args: {
        task: {id: '2', title: 'Js', isDone: false},
    }
}