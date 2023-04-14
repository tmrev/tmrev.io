/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-closing-tag-location */
import { ComponentStory } from '@storybook/react';
import React from 'react';

import Input from '../../components/common/Input';

export default {
  component: Input,
  title: 'Component/Input',
};

const Template: ComponentStory<typeof Input> = (props) => <Input {...props} />;

export const Default = Template.bind({});

Default.args = {
  error: {
    message: 'This is an error message',
    type: 'value',
  },
  label: 'Label',
  variant: 'input',
};

export const Textarea = Template.bind({});

Textarea.args = {
  error: {
    message: 'This is an error message',
    type: 'value',
  },
  label: 'Textarea Label',
  variant: 'textarea',
};
