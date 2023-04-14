/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-closing-tag-location */
import { ComponentStory } from '@storybook/react';
import React from 'react';

import Spinner from '../../components/common/spinner';

export default {
  component: Spinner,
  title: 'Component/Spinner',
};

const Template: ComponentStory<typeof Spinner> = () => <Spinner />;

export const Default = Template.bind({});
