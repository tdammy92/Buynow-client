import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category Chart',
      },
    },
  };



function CategoryChart({data}) {
    return (
        <div>
            <Doughnut data={data} options={options}/>
        </div>
    )
}

export default CategoryChart
