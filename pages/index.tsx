import type { NextPage } from 'next';
import React from 'react';

import Typography from '../components/common/typography';

const Home: NextPage = () => (
  <>
    <Typography variant="h1">Heading 1</Typography>
    <Typography variant="h2">Heading 2</Typography>
    <Typography variant="h3">Heading 3</Typography>
    <Typography variant="h4">Heading 4</Typography>
    <Typography variant="h5">Heading 5</Typography>
    <Typography variant="h6">Heading 6</Typography>
    <Typography variant="body">body</Typography>
  </>
);

export default Home;
