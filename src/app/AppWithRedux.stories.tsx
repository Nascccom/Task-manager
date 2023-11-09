import type {Meta, StoryObj} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import {AppWithRedux} from "./AppWithRedux";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/App',
    component: AppWithRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;


export const Default: Story = {
    args: {
        isInitialized: true,
    }
}
