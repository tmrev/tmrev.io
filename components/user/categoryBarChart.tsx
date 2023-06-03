import { ChartOptions } from 'chart.js'
import React, { FC, useMemo, useRef } from 'react'

import { Categories, NumberedArray } from '@/models/tmrev/categories'

import BarChart, { Datasets } from '../common/charts/bar'

interface Props {
  numberArray: NumberedArray
  category: Categories
}

const CategoryBarChart: FC<Props> = ({numberArray, category}: Props) => {

  const chartRef = useRef()



  const dataset: Datasets = useMemo(() => ({
    backgroundColor: '#4E26E2',
    data: Object.values(numberArray).map((n: number[]) => n.length),
    label: category
  }), [numberArray, category])

  const options: ChartOptions = useMemo(() => ({
    plugins: {
      legend: {
        display: false,
        position: 'top' as const
      },
      title: {
        color: 'white',
        display: true,
        text: category.toUpperCase()
      },
    },
    responsive: true,
    scales: {
      x: {
        // to remove the y-axis grid
        grid: {
          display: false,
          drawBorder: false,
        },
        
        ticks: {
          beginAtZero: true,
          display: false,
        },
      },
      y: {
        // to remove the y-axis grid
        grid: {
          display: false,
          drawBorder: false,
        },
        
        ticks: {
          beginAtZero: true,
          display: false,
        },
      },
    },
  }), [numberArray, category])
  

  // const handleClick = (event: any) => {
  //   if(!chartRef.current) return;

  //   const data = getElementAtEvent(chartRef.current, event)    
  // }

  return (
    <div className='aspect-video w-96 border rounded border-tmrev-gray-dark'>
      <BarChart 
        ref={chartRef}
        datasets={[dataset]}
        labels={Object.keys(numberArray).map(value => value)}
        options={options}
        // onClick={handleClick}
      />
    </div>
  )
}

export default CategoryBarChart