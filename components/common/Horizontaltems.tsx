import Image from 'next/image'
import Link from 'next/link'
import { createMediaUrl } from '../../utils/mediaID';
import imageUrl from '../../utils/imageUrl';
import { NoImage } from '@/constants';
type itemHorizontalContainerProps = {
    createMediaiId: number
    createMediaTitle: string
    imgSrc: string | null
}

export default function HorizontalItems({ createMediaiId, createMediaTitle, imgSrc }: itemHorizontalContainerProps) {
    return (
        <Link
            passHref
            href={`/movie/${createMediaUrl(createMediaiId, createMediaTitle)}`}
        >
            <a>
                <div>
                    <div className="aspect-[2/3] h-[200px] w-[150px] md:h-[300px] md:w-[250px] relative rounded">
                        <Image
                            src={imageUrl(imgSrc ?? NoImage, 300)}
                            alt={createMediaTitle}
                            layout="fill"
                            objectFit="contain"
                            className='rounded-md cursor-pointer'
                        />
                    </div>
                </div>
            </a>
        </Link>
    )
}