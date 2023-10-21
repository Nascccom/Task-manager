import type {Meta, StoryObj} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import {AppWithRedux} from "./AppWithRedux";
import {RequestStatusType} from "./app-reducer";
import {ButtonAppBar} from "../features/ButtonAppBar/ButtonAppBar";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import {TodolistList} from "../features/TodolistList/TodolistList";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import React from "react";

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

const ReduxApp = ({status}: { status: RequestStatusType }) => {

    return (
      <div className="App">
          <ButtonAppBar/>

          {status === 'loading' && <LinearProgress color={'secondary'}/>}

          <Container fixed maxWidth={false}>
              <TodolistList/>
          </Container>

          <ErrorSnackbars/>
      </div>
    );
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// export const AppWithLoading: Story = {
//     render: () => <ReduxApp status={'loading'}/>
// };
export const AppWithLoading: Story = {
    render: () => <ReduxApp status={'loading'}/>
}

export const AppWithoutLoading: Story = {
    render: () => <ReduxApp status={'failed'}/>
}

