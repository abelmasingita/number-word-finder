import React from 'react'
import Chart from 'react-apexcharts'

export interface ChartData {
  series: number[]
  labels: string[]
}


  /**
   * Visualises data in a bar chat
   * @returns {void}
   */
export const ChartVisualization: React.FC<{ data: ChartData }> = ({ data }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: data.labels,
    },
  }

  return (
    <Chart
      options={options}
      series={[
        {
          name: 'Series Name',
          data: data.series,
        },
      ]}
      type='bar'
      width={500}
    />
  )
}
