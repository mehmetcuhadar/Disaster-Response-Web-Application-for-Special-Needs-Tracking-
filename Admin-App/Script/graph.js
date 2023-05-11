var colors = [
  '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40', '#ffcd56', '#45b7af', '#f05b5b'
];

total_info = document.getElementById("total-request-info");
pending_info = document.getElementById("pending-request-info");
approved_info = document.getElementById("approved-request-info");
completed_info = document.getElementById("completed-request-info");

var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {},
    options: {
      plugins: {
        title: {
          display: true,
          text: 'İL İHTİYAÇ SAYILARI'
        },
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false
          },
          stacked: true
        },
        y: {
          grid: {
            display: false
          },
          stacked: true
        }
      }
    }
  });

  // Fetch the ihtiyac_title values from the server endpoint using axios
  axios.get('https://localhost:3000/getIhtiyac')
    .then(response => {
      // Parse the JSON data and extract the ihtiyac_title values
      var ihtiyac_titles = response.data.map(item => item.ihtiyac_title);

      // Fetch the data from the server endpoint using axios
      return axios.get('https://localhost:3001/getIlCounts')
        .then(response => {
          // Parse the JSON data and extract the necessary information
          var data = response.data;
          data.sort((a, b) => b.total_count - a.total_count); // Sort data by descending total_count values
          var il_titles = data.slice(0, 5).map(item => item.il_title); // Extract the first 5 il_title values
          // Dynamically generate the chart dataset based on the ihtiyac_title values
          var datasets = ihtiyac_titles.map((ihtiyac_title, index) => {
            var counts = data.slice(0, 5).map(item => {
              var need = item.ihtiyac_counts.find(need => need.ihtiyac_title === ihtiyac_title);
              return need ? need.count : 0;
            });
            return {
              label: ihtiyac_title,
              data: counts,
              backgroundColor: colors[index%5],
              borderColor: 'black',
              borderWidth: 1
            };
          });

          // Update the chart data with the extracted information
          myChart.data.labels = il_titles;
          myChart.data.datasets = datasets;

          // Update the chart options and render the chart
          myChart.update();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching ihtiyac_title values:', error);
    });

  // Helper function to generate a random color
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color + '33';
  }

  // Make a GET request to get the list of il's and populate the dropdown menu
axios.get('https://localhost:3000/getSehir')
.then(response => {
  const il_select = document.getElementById('il_select');

  // Add each il as an option in the dropdown menu
  response.data.forEach(il => {
    const option = document.createElement('option');
    option.value = il.sehir_key;
    option.textContent = il.sehir_title;
    il_select.appendChild(option);
  });
})
.catch(error => console.error(error));

// When a new il is selected from the dropdown menu, make a GET request to get its ihtiyac_counts and update the pie chart
const il_select = document.getElementById('il_select');
const pie_chart = document.getElementById('pie_chart').getContext('2d');
let currentIl = '';
let chartInstance = null;

il_select.addEventListener('change', () => {
    currentIl = il_select.options[il_select.selectedIndex].textContent;
    // Make a GET request to get the list of il's with their ihtiyac_counts
    axios.get('https://localhost:3001/getIlCounts')
    .then(response => {
      // Filter the response to get the ihtiyac_counts for the selected il
      const ilCounts = response.data.filter(item => item.il_title === currentIl);

      if (ilCounts.length > 0) {
        const ihtiyac_counts = ilCounts[0].ihtiyac_counts;

        // Extract the ihtiyac titles and counts from the response
        const ihtiyac_titles = ihtiyac_counts.map(count => count.ihtiyac_title);
        const counts = ihtiyac_counts.map(count => count.count);
        if (chartInstance !== null) {
            chartInstance.destroy();
        }
        // Create a new pie chart
        chartInstance = new Chart(pie_chart, {
          type: 'pie',
          data: {
            labels: ihtiyac_titles,
            datasets: [{
              data: counts,
              backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#4bc0c0',
                '#9966ff',
                '#ffcc99',
                '#ff9900'
              ]
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'İL İHTİYAÇ DAĞILIMLARI'
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: `ihtiyac_counts for ${currentIl}`
            }
          }
        });
      } else {
        // Display a warning message if there are no ihtiyac_counts for the selected il_title
        const warningMessage = `No ihtiyac_counts found for ${currentIl}`;
        console.warn(warningMessage);
        alert(warningMessage);
      }
    })
    .catch(error => console.error(error));
  });


  
  var ct = document.getElementById('ihtiyacChart').getContext('2d');
  var need_chart = new Chart(ct, {
    type: 'bar',
    data: {},
    options: {
      plugins: {
        title: {
          display: true,
          text: 'İL İHTİYAÇ SAYILARI'
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      }
    }
  });
  

  // Fetch the ihtiyac_title values from the server endpoint using axios
  axios.get('https://localhost:3001/getIhtiyacCounts')
  .then(response => {
    var ihtiyac_titles = response.data.map(item => item.ihtiyac_title);
    var counts = response.data.map(item => item.count);

    // Create an array of dataset objects
    var datasets = [{
      data: counts,
      backgroundColor: colors.slice(0, counts.length)
    }];

    // Assign the labels and datasets to the chart data
    need_chart.data.labels = ihtiyac_titles;
    need_chart.data.datasets = datasets;
    need_chart.options.plugins.legend = {
      display: false
    };
    // Update the chart options and render the chart
    need_chart.update();
  })
  .catch(error => {
    console.error('Error fetching ihtiyac_title values:', error);
  });


  // Make a GET request to get the list of il's and populate the dropdown menu
axios.get('https://localhost:3000/getIhtiyac')
.then(response => {
  const ihtiyac_select = document.getElementById('ihtiyac_select');

  // Add each il as an option in the dropdown menu
  response.data.forEach(ihtiyac => {
    const option = document.createElement('option');
    option.value = ihtiyac._id;
    option.textContent = ihtiyac.ihtiyac_title;
    ihtiyac_select.appendChild(option);
  });
})
.catch(error => console.error(error));

// When a new il is selected from the dropdown menu, make a GET request to get its ihtiyac_counts and update the pie chart
const ihtiyac_select = document.getElementById('ihtiyac_select');
const pie_chart_2 = document.getElementById('pie_chart_2').getContext('2d');
let currentIhtiyac = '';
let chartInstance_2 = null;

ihtiyac_select.addEventListener('change', () => {
    currentIhtiyac = ihtiyac_select.options[ihtiyac_select.selectedIndex].textContent;
 
    // Make a GET request to get the list of il's with their ihtiyac_counts
    axios.get('https://localhost:3001/getIhtiyacCounts')
    .then(response => {
      // Filter the response to get the ihtiyac_counts for the selected il
      const ilCounts = response.data.filter(item => item.ihtiyac_title === currentIhtiyac);

      if (ilCounts.length > 0) {
        const il_dist = ilCounts[0].il_title;
        // Extract the ihtiyac titles and counts from the response
        const ihtiyac_titles = il_dist.map(count => count.il_title);
        const counts = il_dist.map(count => count.count);
        if (chartInstance_2 !== null) {
            chartInstance_2.destroy();
        }
        // Create a new pie chart
        chartInstance_2 = new Chart(pie_chart_2, {
          type: 'pie',
          data: {
            labels: ihtiyac_titles,
            datasets: [{
              data: counts,
              backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#4bc0c0',
                '#9966ff',
                '#ffcc99',
                '#ff9900'
              ]
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'İL İHTİYAÇ DAĞILIMLARI'
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: `ihtiyac_counts for ${currentIhtiyac}`
            }
          }
        });
      } else {
        // Display a warning message if there are no ihtiyac_counts for the selected il_title
        const warningMessage = `No ihtiyac_counts found for ${currentIhtiyac}`;
        console.warn(warningMessage);
        alert(warningMessage);
      }
    })
    .catch(error => console.error(error));
  });


  