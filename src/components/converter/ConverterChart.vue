<template>
  <p
    class="text"
    v-if="request === 'pending'"
  >График загружается...</p>
  <p
    class="text"
    v-if="!request"
  >
    При загрузке данных графика произошла ошибка. Попробуйте позже...
  </p>
  <transition name="fade">
    <div
      class="converter__chart converter-chart"
      v-if="dataChart?.length"
    >
      <h2 class="converter-chart__title sub-title">
        График курса. Колличесво дней: {{ days }}
      </h2>
      <LineChart
        :chartData="chartData"
        @mouseover="pointRadius = 2.5"
        @mouseout="pointRadius = 0"
        @touchend="pointRadius = pointRadius === 0 ? 2.5 : 0"
      />
    </div>
  </transition>
</template>
<script>
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { mapGetters } from "vuex";
export default {
  name: "ConvertChart",
  components: {
    LineChart,
  },
  data() {
    return {
      showChart: false,
      pointRadius: 0,
    };
  },
  computed: {
    ...mapGetters("coin", {
      convert: "convert",
    }),
    ...mapGetters("chartData", {
      dataChart: "chart",
      days: "days",
      converted: "convert",
      request: "request",
    }),
    chartData() {
      return {
        labels: this.dataTime.times,
        datasets: [
          {
            label: `${this.converted.from.toUpperCase()} / ${this.converted.to.toUpperCase()}`,
            data: this.dataTime.values,
            backgroundColor:
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
            borderColor:
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
            pointRadius: this.pointRadius,
          },
        ],
      };
    },
    dataTime() {
      const { times, values } = this.dataChart.reduce(
        (acc, item) => {
          const [time, value] = item;
          const date = new Date(time);
          const month = date.getMonth();
          const dataData = date.getDate();
          const hour = date.getHours();
          const minutes = date.getMinutes();
          const getTime = (time) => (+time < 10 ? "0" + time : time);
          acc.times.push(
            `${getTime(dataData)}/${getTime(
              month
            )}/${date.getFullYear()}/${getTime(hour)}:${getTime(minutes)}`
          );
          acc.values.push(value);
          return acc;
        },
        { times: [], values: [] }
      );
      return { times, values };
    },
  },
};
</script>
<style lang="scss">
</style>