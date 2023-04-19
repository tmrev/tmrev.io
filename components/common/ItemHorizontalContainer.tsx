import Image from 'next/image'
import Link from 'next/link'
import { createMediaUrl } from '../../utils/mediaID';
import imageUrl from '../../utils/imageUrl';

type itemHorizontalContainerProps = {
    createMediaiId: number
    createMediaTitle: string
    imgSrc: string | null
}

export default function ItemHorizontalContainer({ createMediaiId, createMediaTitle, imgSrc }: itemHorizontalContainerProps) {
    return (
        <Link
            passHref
            href={`/movie/${createMediaUrl(createMediaiId, createMediaTitle)}`}
        >
            <img
                src={imageUrl(imgSrc ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR146ol1kIouwij5k13asDyhmmTbRSLzqiVNpO34GLnVg&s', 300)}
                alt={createMediaTitle}
                style={{ height: "200px" }}
                className='rounded-md cursor-pointer'

            />
        </Link>
    )
}
