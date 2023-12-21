import type { Meta, StoryObj } from "@storybook/react";
import { [FTName] } from "./[FTName]";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/shared/const/theme";

const meta = {
    title: "shared/[FTName]",
    component: [FTName],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        
    },
    argTypes: {
       
    },
} satisfies Meta<typeof [FTName]>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [ThemeDecorator(Theme.LIGHT)],
};