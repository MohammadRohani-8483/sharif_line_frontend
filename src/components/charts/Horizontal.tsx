import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, ChartData, ChartOptions, LinearScale, BarElement, BarController } from 'chart.js';
import { ChartParent } from '@/src/styles/components/chartContainer';
import { ChartResponse } from '@/src/utils/functions/charts';
import { shortenString } from '@/src/utils/functions/global';
import _ from 'lodash'

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, BarController); // Register CategoryScale

const Horizontal = ({ data, colors }: { data: ChartResponse, colors: (index: number) => number[]}) => {
  const labels = [''];
  const chartData: ChartData<'bar'> = {
    labels,
    datasets: data.map((item, i) => ({
      data: [item.counts],
      backgroundColor: `rgb(${colors(i).join()})`,
      borderRadius: 8,
      label: data[i].text
    }))
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            family: 'IranYekan, sans-serif'
          }
        }
      },
    },
    onHover: (event: any, chartElement) => {
      event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context) => shortenString(context[0].dataset.label!, 60),
          label: (context) => {
            const value = context.raw as number;
            const percentage = ((value / _.sumBy(data, 'counts')) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          },
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
        displayColors: false,
        cornerRadius: 8,
      }
    },
  };

  return (
    <ChartParent aspect={false}>
      <Bar data={chartData} options={chartOptions} />
    </ChartParent >
  );
};

export default Horizontal