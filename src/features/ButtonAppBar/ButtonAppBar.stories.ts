import type {Meta, StoryObj} from '@storybook/react';
import {ButtonAppBar} from "./ButtonAppBar";


const meta: Meta<typeof ButtonAppBar> = {
    title: 'TODOLISTS/ButtonAppBar',
    component: ButtonAppBar,
    tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof ButtonAppBar>;

export const ButtonAppBarStory: Story = {

}