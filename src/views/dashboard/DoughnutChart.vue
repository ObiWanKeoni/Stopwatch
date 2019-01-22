
<script>
import { Doughnut, mixins } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['chartData', 'options'],
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
