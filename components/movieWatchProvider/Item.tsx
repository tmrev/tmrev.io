import Image from "next/image"
import Link from "next/link";
import React,  { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";

import { Buy } from "@/models/tmdb";
import imageUrl from "@/utils/imageUrl";

import Chip from "../chip";

interface ProviderItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: Buy
  link: string
}


const ProviderItem: FunctionComponent<ProviderItemProps> = ({ data, link, className }) => (
  <Chip className={twMerge('max-w-xs', className)}>
    <Link key={data.provider_id} passHref href={link}>
      <div key={data.provider_id} className="flex items-center">
        <div className="relative md:w-8 md:h-8 w-6 h-6">
          <Image
            fill
            alt={data.provider_name}
            className="rounded object-cover"
            src={imageUrl(data.logo_path)}
          />
        </div>
      </div>
    </Link>
  </Chip>
);


export default ProviderItem