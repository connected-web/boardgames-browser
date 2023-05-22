<template>
  <div>
    <canvas ref="chartCanvas" style="height: 200px; width: 100%;"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

function defaultLineChartData() {
  return {
    labels: ['January', 'February', 'March', /* ... */],
    datasets: [
      {
        label: 'Hannah',
        data: [10, 8, 5, /* ... */],
        borderColor: 'blue',
        fill: false
      },
      {
        label: 'John',
        data: [5, 7, 9, /* ... */],
        borderColor: 'red',
        fill: false
      }
    ]
  }
}

export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return defaultLineChartData()
      }
    }
  },
  mounted() {
    // Get the canvas element reference
    const ctx = this.$refs.chartCanvas.getContext('2d');

    // Create the chart
    new Chart(ctx, {
      type: 'line',
      data: this.chartData ?? defaultLineChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            cubicInterpolationMode: 'monotone'
          }
        }
      }
    })
  }
};
</script>