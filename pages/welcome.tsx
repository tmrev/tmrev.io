import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useEffect } from 'react'

import HeaderText from '@/components/common/typography/headerText'
import WelcomeExplainer from '@/components/page-components/home/welcome/explainer'
import imageUrl from '@/utils/imageUrl'

interface Props {}

const howToSearch: string =
  'You can start by selecting the search bar at the top of the page and searching for your desired film.'
const Welcome: FunctionComponent<Props> = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/login')
    router.prefetch('/register')
  }, [])

  return (
    <div className="p-8 text-white space-y-32">
      <div className="relative">
        <div className="w-full bg-tmrev-gray-dark h-96 rounded opacity-10">
          <Image
            fill
            alt="spiderman"
            className="object-cover"
            src={imageUrl('/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg')}
          />
        </div>
        <div className="absolute bottom-10 left-0 right-0 text-center m-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            &quot;You have power. And with great power, there must also come
            great responsibility.&quot;
          </h1>
          <p>- May Parker</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-36">
        <WelcomeExplainer
          description="In a world driven by data,
        it seems like movie reviews have been left behind,
        with most of the major movie review platforms only
        letting you review out of 5 or out of 10. With a
        review system like this, much is left to be desired.
        The TMREV team has crafted 10 categories each with a 1-10 scale,
        allowing a user to go more in-depth than ever before.
        For example, at a glance with TMREV, you could see which movie had the best plot
        you've seen within the last year or see how your favorite film stacks
        up to others with thoughtful data visualization."
          howTo={`${howToSearch} Once you select your film just click the "review movie"
          button and fill out the scorecard. Want to know what each category means? Click here.`}
          id="review"
          imagePath="/images/welcome/rating-system.png"
          title="Unique Review System"
        />
        <WelcomeExplainer
          description="With more data comes more responsibility for the user and
          how we present that data. Each movie will display a spider chart that
          allows a user to gain a vast amount of knowledge at a glance. A user
          will be able to determine the strong and weak points of a movie and compare
          their own opinion to the general audience's."
          howTo={`${howToSearch} Once you select your film, scroll down until you see
          the “Plotted Reviews” section. If you don't see this, then congratulations!
          You can be the first person to review this movie. After you review this movie,
          the chart will appear automatically.
          After you review this movie then the chart will automatically appear.`}
          id="data-visualization"
          imagePath="/images/welcome/data-visual.png"
          title="Data Visualization"
        />
        <WelcomeExplainer
          description="Creating your list is a great way
        to share a collection of your favorite films, actors, genres, or just anything you can dream up."
          howTo={`${howToSearch} Once you select your film, just click the 
        "Add to List" button, and you'll be prompted to 
        either create a new list or add to a pre-existing list.`}
          id="list"
          imagePath="/images/welcome/list.png"
          title="Lists"
        />
        <WelcomeExplainer
          description="Keep track of every movie you've seen and look back on them in your user profile."
          howTo={`${howToSearch} Once you select your film, just click the 
        "thumbs up" or "thumbs down" button to confirm that 
        you've seen this movie before.
         You'll be able to view this list from your profile page (The last button on the side navigation).`}
          id="watched"
          imagePath="/images/welcome/watched.png"
          title="Watched"
        />
        <WelcomeExplainer
          description="You can now look into the mind of a fellow movie reviewer with the profile preview.
          This will give you the ability to quickly see what a user's top ten favorite and least favorite
          movies are, and you'll also be able to view a user's public lists they have created."
          howTo="You can start by selecting the search bar at the top of the page and searching for a user.
          Once you select a user, you'll be taken directly to the profile preview page."
          id="profile-preview"
          imagePath="/images/welcome/profile-preview.png"
          title="Profile Preview"
        />
      </div>
      <div
        className="w-full flex flex-col text-center items-center justify-center space-y-3 mt-36"
        id="join"
      >
        <HeaderText>Lets Get Started </HeaderText>
        <div className="flex space-x-2 text-2xl">
          <Link passHref className="underline" href="/login">
            Log In
          </Link>
          <p>or</p>
          <Link passHref className="underline" href="/register">
            Create an Account
          </Link>
          <p>to join.</p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
