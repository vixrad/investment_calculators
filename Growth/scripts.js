let investmentChart; // Declare the chart globally

// Investment Growth Function
function investmentGrowth(principal, rate, timesCompounded, years) {
    return principal * Math.pow((1 + rate / timesCompounded), timesCompounded * years);
}

// Function to Get Input Values and Display Result
function calculateInvestmentGrowth() {
    // Get input values
    let principal = parseFloat(document.getElementById('principal').value);
    let rate = parseFloat(document.getElementById('rate').value) / 100; // Convert percentage to decimal
    let timesCompounded = parseInt(document.getElementById('timesCompounded').value);
    let years = parseInt(document.getElementById('years').value);

    // Check if all inputs are valid
    if (isNaN(principal) || isNaN(rate) || isNaN(timesCompounded) || isNaN(years)) {
        alert("Please enter valid numbers in all fields.");
        return;
    }

    // Calculate future value
    let futureValue = investmentGrowth(principal, rate, timesCompounded, years);

    // Display result
    document.getElementById('result').textContent = futureValue.toFixed(2);

    // Visualize the result with the chart using Chart.js
    updateChart(principal, rate, timesCompounded, years);
}

// Function to visualize the investment over time using Chart.js
function updateChart(principal, rate, timesCompounded, years) {
    const ctx = document.getElementById('investmentChart').getContext('2d');

    // Prepare data for each year
    let labels = [];
    let data = [];
    for (let i = 0; i <= years; i++) {
        labels.push(i.toString());
        data.push(investmentGrowth(principal, rate, timesCompounded, i));
    }

    // If the chart already exists, destroy it before creating a new one
    if (investmentChart) {
        investmentChart.destroy();
    }

    // Create the new chart
    investmentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Investment Growth',
                data: data,
                borderColor: '#007bff',
                borderWidth: 2,
                fill: false,
                pointRadius: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Investment Value ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}
