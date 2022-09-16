/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-closing-tag-location */
import { ComponentStory } from '@storybook/react';
import React from 'react';

import Button from '../../components/common/Button';

export default {
  component: Button,
  title: 'Component/Button',
};

const Template: ComponentStory<typeof Button> = (props) => <Button {...props} />;

export const Primary = Template.bind({});

Primary.args = {
  children: 'Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: 'Button',
  variant: 'secondary',
};

export const Text = Template.bind({});

Text.args = {
  children: 'Text Button',
  variant: 'text',
};

export const Icon = Template.bind({});

Icon.args = {
  children: <span className="material-icons">
    favorite
  </span>,
  variant: 'icon',
};
