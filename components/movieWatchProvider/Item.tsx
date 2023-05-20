import Image from "next/image"
import Link from "next/link";
import React,  { FunctionComponent } from "react";

import { Buy } from "@/models/tmdb";
import imageUrl from "@/utils/imageUrl";

import Chip from "../chip";

interface ProviderItemProps {
  data: Buy
  link: string
}


const ProviderItem: FunctionComponent<ProviderItemProps> = ({ data, link }) => (
  <Chip className='max-w-xs'>
    <Link key={data.provider_id} passHref href={link}>
      <a rel="noopener" target="_blank">
        <div key={data.provider_id} className="flex items-center">
          <div className="relative md:w-8 md:h-8 w-6 h-6">
            <Image
              alt={data.provider_name}
              className="rounded"
              layout="fill"
              objectFit="cover"
              src={imageUrl(data.logo_path)}
            />
          </div>
        </div>
      </a>
    </Link>
  </Chip>
);


export default ProviderItem