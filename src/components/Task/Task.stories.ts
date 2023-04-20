import type { Meta, StoryObj } from '@storybook/react';
import {Task} from "./Task";


const meta: Meta<typeof Task> = {
    title: 'Task',
    component: Task,

}

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDone: Story = {


}