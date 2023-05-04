import type {Meta, StoryObj} from '@storybook/react';
import {ButtonUniversal} from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta : Meta<typeof ButtonUniversal> = {
    title: 'TODOLISTS/Button',
    component: ButtonUniversal,
    tags: ['autodocs'],
    argTypes: {
        callBack: {
            action: 'Click'
        }
    },
    args: {
        buttonName: 'Button',

    },
} ;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SecondaryColor: Story = {
    args: {
        color: 'secondary'
    },
};

export const SuccessColor: Story = {
    args: {
        color: 'success'
    },
};

export const ErrorColor: Story = {
    args: {
        color: 'error'
    },
};

export const AddButton: Story = {
    args: {
        size: "medium",
        color: 'error',
        variant: "outlined",
        style: {
            display: 'inline-flex',
            border: 'none',
            alignItems: 'center',
            borderRadius: '50%',
            backgroundColor: '#1976d2',
            color: '#fff',
            fontWeight: '600',
        },
        buttonName: '+'
    },
    argTypes: {
        callBack: {
            action: 'Add Task'
        }
    }
};

export const AddErrorButton: Story = {
    args: {
        size: "medium",
        color: 'error',
        variant: "outlined",
        style: {
            display: 'inline-flex',
            border: 'none',
            alignItems: 'center',
            borderRadius: '50%',
            backgroundColor: '#d2194a',
            color: '#fff',
            fontWeight: '600',
        },
        buttonName: '+'
    },
    argTypes: {
        callBack: {
            action: 'Error'
        }
    }
};
