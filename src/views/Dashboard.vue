<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0 dashboard-card">
            <h1 class="mb-0">45.25%</h1>
            <p>Projects</p>
          </b-card-body>
          <card-line-chart chartId="card-chart-01" class="chart-wrapper" style="height:70px;" :height="70" :chart-data="projects" :options="options"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0 dashboard-card">
            <h1 class="mb-0">2.50%</h1>
            <p>Lean</p>
          </b-card-body>
          <card-line-chart chartId="card-chart-02" class="chart-wrapper" style="height:70px;" :height="70" :chart-data="lean" :options="options"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-warning">
          <b-card-body class="pb-0 dashboard-card">
            <h1 class="mb-0">34.75%</h1>
            <p>Professional Development</p>
          </b-card-body>
          <card-line-chart chartId="card-chart-03" class="chart-wrapper" style="height:70px;" :height="70" :chart-data="professionalDevelopment" :options="options"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0 dashboard-card">
            <h1 class="mb-0">12.75%</h1>
            <p>User Specific</p>
          </b-card-body>
          <card-line-chart chartId="card-chart-04" class="chart-wrapper" style="height:70px;" :height="70" :chart-data="userSpecific" :options="options"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-secondary text-white">
          <b-card-body class="pb-0 dashboard-card">
            <h1 class="mb-0">8.25%</h1>
            <p>Communication & Perf. Mgmt.</p>
          </b-card-body>
          <card-line-chart chartId="card-chart-05" class="chart-wrapper" style="height:70px;" :height="70" :chart-data="communication" :options="options"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-dark">
          <b-card-body class="pb-0 dashboard-card">
            <h1 class="mb-0">16.00%</h1>
            <p>Overhead</p>
          </b-card-body>
          <card-line-chart chartId="card-chart-06" class="chart-wrapper" style="height:70px;" :height="70" :chart-data="overhead" :options="options"/>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" lg="3">
        <b-card>
            <h1 id="traffic" class="card-title mb-0">Allocation</h1>
            <div class="small text-muted">{{ month }} 2019</div>
          <doughnut-chart chartId="main-chart-01" class="chart-wrapper" style="height:300px;margin-top:40px;" :chart-data="allocation" :options="options" ></doughnut-chart>
        </b-card>
      </b-col>
      <b-col sm="12" lg="9">
        <b-card>
          <b-row>
            <b-col sm="5">
              <h1 id="traffic" class="card-title mb-0">Progress</h1>
              <div class="small text-muted">January 2019</div>
            </b-col>
            <b-col sm="7" class="d-none d-md-block">
              <b-button type="button" variant="primary" class="float-right"><i class="icon-cloud-download"></i></b-button>
              <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
                <b-form-radio-group class="mr-3" id="radiosBtn" buttons button-variant="outline-secondary" v-model="selected" name="radiosBtn">
                  <b-form-radio class="mx-0" value="Day">Day</b-form-radio>
                  <b-form-radio class="mx-0" value="Month">Month</b-form-radio>
                  <b-form-radio class="mx-0" value="Year">Year</b-form-radio>
                </b-form-radio-group>
              </b-button-toolbar>
            </b-col>
          </b-row>
          <main-line-chart chartId="main-chart-01" class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-line-chart>
        </b-card>
      </b-col>
    </b-row>
    
  </div>
</template>

<script>
import CardLineChart from './dashboard/CardLineChart'
import MainLineChart from './dashboard/MainLineChart'
import DoughnutChart from './dashboard/DoughnutChart'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default {
  name: 'dashboard',
  components: {
    CardLineChart,
    MainLineChart,
    DoughnutChart,
  },
  data() {
    return {
      selected: false,
      month: '',
      labels: [],
      options: {
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      },
      datasets:{
        yearly: {},
        monthly: {},
        daily: {},
        total: {}
      }
    }
  },
  created() {
    this.labels = this.getMonthLabels()
    this.month = this.getMonthLabel()
  },
  computed: {
    projects() {
      return this.fillData(this.labels, [
        {
          label: 'This Year',
          backgroundColor: 'rgba(255,255,255,.3)',
          borderColor: 'rgba(255,255,255,.65)',
          data: [1,42,6346,675,47,2,426,10,1500,7000,6000,50]
        },
        {
          label: 'Last Year',
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.2)',
          borderDash: [10, 5],
          data: [20,18,800,500,16,1600,8000,6000,90,100,1000,700]
        },
      ])
    },
    lean() {
      return this.fillData(this.labels, [
        {
          label: 'This Year',
          backgroundColor: 'rgba(255,255,255,.3)',
          borderColor: 'rgba(255,255,255,.65)',
          data: [1,42,6346,675,47,2,426,10,1500,7000,6000,50]
        },
        {
          label: 'Last Year',
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.2)',
          borderDash: [10, 5],
          data: [20,18,800,500,16,1600,8000,6000,90,100,1000,700]
        },
      ])
    },
    professionalDevelopment() {
      return this.fillData(this.labels, [
        {
          label: 'This Year',
          backgroundColor: 'rgba(255,255,255,.3)',
          borderColor: 'rgba(255,255,255,.65)',
          data: [1,42,6346,675,47,2,426,10,1500,7000,6000,50]
        },
        {
          label: 'Last Year',
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.2)',
          borderDash: [10, 5],
          data: [20,18,800,500,16,1600,8000,6000,90,100,1000,700]
        },
      ])
    },
    userSpecific() {
      return this.fillData(this.labels, [
        {
          label: 'This Year',
          backgroundColor: 'rgba(255,255,255,.3)',
          borderColor: 'rgba(255,255,255,.65)',
          data: [1,42,6346,675,47,2,426,10,1500,7000,6000,50]
        },
        {
          label: 'Last Year',
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.2)',
          borderDash: [10, 5],
          data: [20,18,800,500,16,1600,8000,6000,90,100,1000,700]
        },
      ])
    },
    communication() {
      return this.fillData(this.labels, [
        {
          label: 'This Year',
          backgroundColor: 'rgba(255,255,255,.3)',
          borderColor: 'rgba(255,255,255,.65)',
          data: [1,42,6346,675,47,2,426,10,1500,7000,6000,50]
        },
        {
          label: 'Last Year',
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.2)',
          borderDash: [10, 5],
          data: [20,18,800,500,16,1600,8000,6000,90,100,1000,700]
        },
      ])
    },
    overhead() {
      return this.fillData(this.labels, [
        {
          label: 'This Year',
          backgroundColor: 'rgba(255,255,255,.3)',
          borderColor: 'rgba(255,255,255,.65)',
          data: [1,42,6346,675,47,2,426,10,1500,7000,6000,50]
        },
        {
          label: 'Last Year',
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.2)',
          borderDash: [10, 5],
          data: [20,18,800,500,16,1600,8000,6000,90,100,1000,700]
        },
      ])
    },
    allocation() {
      return this.fillData(['Projects', 'Lean', 'Professional Development', 'User Specific', 'Communication & Perf. Mgmt.', 'Overhead'], [{
        label: 'Hours',
        backgroundColor: this.getColors(),
        data: [150,42,60,95,47,110]
      }])
    },
    progress() {
      return this.fillData(this.labels, [{
        label: 'Hours',
        backgroundColor: 'rgba(255,0,0,.75)',
        borderColor: 'rgba(255,0,0,1)',
        data: [1,42,6346,675,47,2,426,10]
      }])
    },
  },
  methods: {
    getMonthLabel() {
      const today = new Date()
      return ['January','February','March','April','May','June','July','August','September','October','November','December'][today.getMonth()]
    },
    getMonthLabels() {
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const currentMonth = new Date().getMonth();
      const after = months.slice(0, currentMonth)
      const before = months.slice(currentMonth, months.length)
      return [...before, ...after]
    },
    fillData(labels, datasets) {
      return {
          labels: labels,
          datasets: datasets
      }
    },
    getColors(){
      return ['#FF9B00', '#1C1259', '#00b88a', '#EE4266', '#08a4bd', '#2f353a']
    },
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    }
  }
}
</script>

