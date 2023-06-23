import React from 'react'

import HeaderText from '@/components/common/typography/headerText'

import InformationCard from '../informationCard'

const WelcomeSection: React.FC = () => (
  <section>
    <HeaderText>What we do</HeaderText>
    <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mt-8">
      <InformationCard
        description="In a world driven by data,
      it seems like movie reviews have been left behind..."
        href="/welcome#review"
        icon="reviews"
        title="Unique Review System"
      />
      <InformationCard
        description="View in depth movie data on beautiful charts and graphs."
        href="/welcome#data-visualization"
        icon="analytics"
        title="Data Visualization"
      />
      <InformationCard
        description="Create your own personal list and share it with your friends."
        href="/welcome#list"
        icon="list"
        title="Lists"
      />
      <InformationCard
        description="Keep a list of every movie you&lsquo;ve seen to date."
        href="/welcome#watched"
        icon="visibility"
        title="Watched"
      />
    </div>
  </section>
)

export default WelcomeSection