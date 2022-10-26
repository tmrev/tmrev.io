import clsx from 'clsx';
import Image from 'next/image';
import React, { FunctionComponent } from 'react';

import HeaderText from '../../../../../components/common/typography/headerText';

interface Props {
  title: string
  description: string
  imagePath: string
  id: string
  howTo: string
}

const WelcomeExplainer: FunctionComponent<Props> = ({
  title, description, imagePath, id, howTo,
}) => (
  <div
    className={clsx(
      'flex flex-col space-x-0 space-y-10 md:space-y-0 h-full justify-evenly',
      'md:even:flex-row-reverse md:even:space-x-reverse sm:flex-row md:space-x-12',
    )}
    id={id}
  >
    <div className="space-y-4 max-w-full sm:max-w-xs lg:max-w-sm xl:max-w-md 2xl:max-w-4xl">
      <HeaderText headingType="h2">{title}</HeaderText>
      <p className="text-lg">{description}</p>
      <div>
        <p className="text-lg font-light">{howTo}</p>
      </div>
    </div>
    <div className="w-full h-[500px] relative odd:order-first">
      <Image
        fill
        alt="icon"
        className="rounded"
        quality="100"
        src={imagePath}
      />
    </div>
  </div>
);

export default WelcomeExplainer;
