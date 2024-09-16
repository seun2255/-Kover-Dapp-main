import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  aspectRatio: 5,
  plugins: {
    legend: {
      display: false,
    },
    labels: {
      display: false,
    },
  },
  bezierCurve: false,
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
}

interface ChartRenderProps {
  datam: number[]
  color: string
  aspectRatio?: number
}

function ChartRender({ datam, color, aspectRatio }: ChartRenderProps) {
  const data = {
    labels: datam,
    datasets: [
      {
        label: 'Dataset 1',
        data: datam,
        borderColor: color || '#FF0000',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="w-full">
      <Line
        options={{
          ...options,
          aspectRatio: aspectRatio ? aspectRatio : options.aspectRatio,
        }}
        data={data}
      />
    </div>
  )
}

export default ChartRender
