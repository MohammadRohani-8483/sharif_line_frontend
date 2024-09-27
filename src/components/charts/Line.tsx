import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, ChartData, ChartOptions, LinearScale, LineElement, BarController, LineController, PointElement } from 'chart.js';
import { ChartParent } from '@/src/styles/components/chartContainer';
import { ChartResponse } from '@/src/utils/functions/charts';
import { shortenString } from '@/src/utils/functions/global';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarController, LineController, LineElement, PointElement);


const LineChart = ({ data, colors }: { data: ChartResponse, colors: (index: number) => number[] }) => {
  const datasets = [{
    data: data.map(item => item.counts),
    label: 'data',
    borderColor: '#666',
    borderWidth: 0.5,
    backgroundColor: data.map((_, i) => `rgb(${colors(i).join()})`),
    pointStyle: 'circle',
    pointRadius: 10,
    pointHoverRadius: 15
  }]
  const chartData: ChartData<'line'> = {
    labels: data.map(() => ''),
    datasets
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
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
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: context => shortenString(data[context[0].dataIndex].text,60),
          label: context => {
            const value = context.raw as number
            const total = (context.dataset.data as number[]).reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          }
        },
        rtl: true,
        titleAlign: 'center',
        bodyAlign: 'center',
        titleFont: {
          size: 12,
          weight: 700,
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
      <Line data={chartData} options={chartOptions} />
    </ChartParent>
  );
};

export default LineChart