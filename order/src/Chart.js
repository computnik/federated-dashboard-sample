import React from "react";
import { Bar } from "react-chartjs-2";

export const TransactionsChart = () => (
  <Bar
    pointStyle="star"
    data={{
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      responsive: true,
      offset: true,
      datasets: [
        {
          label: "FAILURE",
          backgroundColor: "#CBD2D6",
          barThickness: 20,
          categoryPercentage: 1,
          pointStyle: "triangle",
          data: [9, 15, 10, 26, 5, 1, 14, 19, 13, 29, 6] //From API
        },
        {
          label: "SUCCESS",
          pointStyle: "rectRounded",
          backgroundColor: "#640487",
          barThickness: 20,
          categoryPercentage: 1,
          data: [19, 35, 20, 36, 21, 11, 24, 29, 33, 39, 12] //From API
        }
      ]
    }}
    height={220}
    options={{
      offsetGridLines: true,
      drawTicks: true,
      layout: {
        padding: {
          top: 30,
          right: 40,
          bottom: 40
        }
      },
      legend: {
        display: true,
        position: "right",
        align: "start",
        labels: {
          usePointStyle: true
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            stacked: true,
            ticks: {
              padding: 5
            },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            stacked: false,
            gridLines: {
              drawBorder: false
            },
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 6,
              padding: 20,
              callback(n) {
                return n + "0K";
              }
            }
          }
        ]
      }
    }}
  />
);

export default TransactionsChart;
// export default function App() {
//   return (
//     <div className="App">
//       <h1>Transactions</h1>
//       <h2>Summary</h2>
//       <TransactionsChart />
//     </div>
//   );
// }
