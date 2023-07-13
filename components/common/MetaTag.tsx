import Head from 'next/head';
import React, { FunctionComponent } from 'react';

interface Props {
  title: string;
  description: string;
  image?: string;
  largeImage?: string;
  url?: string;
}

const MetaTags: FunctionComponent<Props> = ({
  title,
  description,
  image,
  largeImage,
  url,
}: Props) => (
  <Head>
    <title>{title}</title>
    <meta key="title" content={title} name="title" />
    <meta key="description"  content={description} name="description" />
    <meta key="type" content="website" property="og:type" />
    <meta key="og:url" content={`https://tmrev.io${url}`} property="og:url" />
    <meta key="og:title" content={title} property="og:title" />
    <meta key='og:description' content={description} property="og:description" />
    <meta key="og:image" content={image} property="og:image" />
    <meta key="twitter:card" content="summary_large_image" property="twitter:card" />
    <meta
      key="twitter:url"
      content={`https://tmrev.io${url}`}
      property="twitter:url"
    />
    <meta key="twitter:title" content={title} property="twitter:title" />
    <meta key="twitter:description" content={description} property="twitter:description" />
    <meta key="twitter:image" content={largeImage} property="twitter:image" />
  </Head>
);

MetaTags.defaultProps = {
  image: '',
  largeImage: '',
  url: ''
};

export default MetaTags;
