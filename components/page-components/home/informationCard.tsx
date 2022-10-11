import Link from 'next/link';
import React, { FunctionComponent } from 'react';

interface Props {
  title: string
  description: string
  href: string
  icon: string
}

const InformationCard: FunctionComponent<Props> = ({
  title, description, href, icon,
}: Props) => (
  <Link passHref href={href}>
    <a
      className="bg-tmrev-gray-dark flex h-[170px] md:h-[100px] items-center space-x-2 rounded p-2 space-y-2 opacity-90 hover:opacity-100"
    >
      <div>
        <span className="material-icons-outlined text-6xl text-white opacity-70">
          {icon}
        </span>
      </div>
      <div className="text-white opacity-85">
        <h2 className=" text-lg font-semibold">{title}</h2>
        <p>{description}</p>
      </div>
    </a>
  </Link>
);

export default InformationCard;
