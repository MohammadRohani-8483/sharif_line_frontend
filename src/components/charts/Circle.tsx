import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartOptions, ChartData } from 'chart.js';
import { ChartParent } from '@/src/styles/components/chartContainer';
import { ChartResponse } from '@/src/utils/functions/charts';
import { shortenString } from '@/src/utils/functions/global';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Circle = ({ data, colors }: { data: ChartResponse, colors: (index: number) => number[] }) => {
  const chartData: ChartData<'doughnut'> = {
    labels: data.map((item => item.text)),
    datasets: [{
      data: data.map(item => item.counts),
      backgroundColor: data.map(((_, i) => `rgb(${colors(i).join()})`)),
      borderRadius: 8,
    }],
  }

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: "55%",
    onHover: (event: any, chartElement) => {
      event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: context => shortenString(context[0].label,30),
          label: (context) => {
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          }
        },
        titleAlign: 'center',
        bodyAlign: 'center',
        titleFont: {
          size: 12,
          weight: 'bold',
          family: 'IranYekan, sans-serif',
        },
        bodyFont: {
          size: 12,
          family: 'IranYekan, sans-serif',
        },
        boxWidth: 200,
        displayColors: false,
        cornerRadius: 8,
      }
    },
  };

  return (
    <ChartParent aspect={true}>
      <Doughnut data={chartData} options={chartOptions} />
    </ChartParent>
  )
}

export default Circle