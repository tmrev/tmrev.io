/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory } from '@storybook/react';
import React from 'react';

import Typography from '../../components/common/typography';

export default {
  component: Typography,
  title: 'Component/Typography',
};

const ExampleText = 'Example Text';

const Template: ComponentStory<typeof Typography> = (props) => <Typography {...props} />;

export const H1 = Template.bind({});

H1.args = {
  children: ExampleText,
  variant: 'h1',
};

export const H2 = Template.bind({});

H2.args = {
  children: ExampleText,
  variant: 'h2',
};

export const H3 = Template.bind({});

H3.args = {
  children: ExampleText,
  variant: 'h3',
};

export const H4 = Template.bind({});

H4.args = {
  children: ExampleText,
  variant: 'h4',
};

export const H5 = Template.bind({});

H5.args = {
  children: ExampleText,
  variant: 'h5',
};

export const H6 = Template.bind({});

H6.args = {
  children: ExampleText,
  variant: 'h6',
};

export const Body = Template.bind({});

Body.args = {
  children: ExampleText,
  variant: 'body',
};
