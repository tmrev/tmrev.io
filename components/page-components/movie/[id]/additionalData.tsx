import Image from 'next/image';
import React, { FunctionComponent } from 'react';

import { Body } from '../../../../models/tmrev/movie';
import imageUrl from '../../../../utils/imageUrl';
import HeaderText from '../../../common/typography/headerText';

interface AdditionalDataProps {
  movie: Body
}

const AdditionalData:FunctionComponent<AdditionalDataProps> = ({ movie }: AdditionalDataProps) => {
  const { production_companies } = movie;

  return (
    <div className="space-y-8">
      <HeaderText>
        Additional Information
      </HeaderText>
      <div>
        <h3 className="font-semibold text-xl">Production Companies</h3>
        <div className="flex flex-wrap space-x-6">
          {production_companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center space-x-3 m-3"
              title={company.name}
            >
              {company.logo_path ? (
                <div className="relative h-16 w-16 md:h-32 md:w-32">
                  <Image
                    fill
                    alt={company.name}
                    className='object-contain'
                    src={imageUrl(company.logo_path)}
                  />
                </div>
              )
                : <p className="text-lg"><i>{company.name}</i></p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalData;
