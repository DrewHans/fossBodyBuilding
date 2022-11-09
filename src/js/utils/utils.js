// miscellaneous functions

var utils = {
  getBodyWeightChartConfig: function (chartData) {
    const data = {
      datasets: [{
        label: 'Weight',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 4,
        spanGaps: true,
        lineTension: 0.25,
        data: chartData
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        title: {
          display: false,
          text: 'Weight Change Over Time'
        }
      },
      hover: {
        mode: 'index',
        intersec: false
      },
      scales: {
        x: {
          ticks: {
            color: 'rgba(255, 255, 255, 0.5)'
          },
          title: {
            color: 'rgba(255, 255, 255, 0.8)',
            display: true,
            text: 'Date ( last 7 weigh-ins )'
          }
        },
        y: {
          grid: {
            color: 'rgba(54, 162, 235, 0.2)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.5)',
            stepSize: 0.5,
          },
          title: {
            color: 'rgba(255, 255, 255, 0.8)',
            display: true,
            text: 'Weight ( lb )'
          }
        }
      }
    };

    const config = {
      type: 'line',
      data: data,
      options: options
    };

    return config;
  },
};

export default utils;
