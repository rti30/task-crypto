<template>
  <div class="diagram">
    <h2 class="sub-title sub-title--center">
      Диаграмма распределения финансов
    </h2>
    <transition-group name="fade" mode="ease-in">
      <DoughnutChart
        :chartData="diagramData"
        v-if="diagramData?.datasets[0].data.length"
      />
      <p v-else class="text text-sp">В портфеле пока нет финансов</p>
    </transition-group>
  </div>
</template>
<script>
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { mapGetters } from "vuex";
export default {
  name: "AssetsDiagram",
  components: {
    DoughnutChart,
  },
  computed: {
    ...mapGetters("portfolio", { assets: "assets", total: "total" }),
    coinNames() {
      return this.assets.map(({ name, price, count }) => {
        return `${name.toUpperCase()} (${count} ед: ${(
          (price / this.total) *
          count *
          100
        ).toFixed(2)}%)`;
      });
    },
    coinValues() {
      return this.assets.map((coin) => {
        return coin.price * coin.count;
      });
    },
    coinsBackground() {
      return this.assets.map(() => {
        return (
          "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
        );
      });
    },
    diagramData() {
      return {
        labels: this.coinNames,
        datasets: [
          {
            data: this.coinValues,
            backgroundColor: this.coinsBackground,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss">
.diagram {
  display: grid;
  gap: 25px 0;
}
</style>