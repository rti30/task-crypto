<template>
  <section class="converter">
    <div class="content-width">
      <h1 class="converter__title title">
        Конвертер валют
      </h1>
      <form
        @submit.prevent=""
        class="converter__convert convert"
      >
        <h2 class="convert__title sub-title">Конвертировать</h2>
        <label class="convert__title converter__label text">Преоброзовать из</label>
        <CoinSelect
          :options="optionsFrom"
          :selected="convertData.from"
          @select="selected({
           item:'from',
           coin:$event
          })"
        ></CoinSelect>
        <label class="convert__title converter__label text">Преоброзовать в</label>
        <CoinSelect
          :options="optionsTo"
          :selected="convertData.to"
          @select="selected({
           item:'to',
           coin:$event
          })"
        ></CoinSelect>
        <div
          v-if="convertData.result"
          class="convert__result text"
        >
          <label class="convert__title converter__label">Результат: </label>
          <span class="text--sp">{{convertData.result}} {{convertData.to.id.toUpperCase()}}</span>
        </div>
      </form>
      <CoinChart />
    </div>
  </section>
</template>
<script>
import CoinSelect from "@/components/ui/ui-select.vue";
import CoinChart from "@/components/converter/ConverterChart.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ConvertIndex",
  components: {
    CoinSelect,
    CoinChart,
  },
  computed: {
    ...mapGetters("coin", { coins: "coins", convertData: "convert" }),
    optionsFrom() {
      return this.convertData.to
        ? this.coins.filter((coin) => coin.id !== this.convertData.to.id)
        : this.coins;
    },
    optionsTo() {
      return this.convertData.from
        ? this.coins.filter((coin) => coin.id !== this.convertData.from.id)
        : this.coins;
    },
  },
  methods: {
    ...mapActions("coin", {
      getChartData: "getChartData",
      changeSelect: "changeSelect",
      convertTo: "convert",
    }),
    selected({ item, coin }) {
      this.changeSelect({ item, coin });

      if (this.convertData.to && this.convertData.from) {
        this.convertTo();
        this.getChartData({
          coin: this.convertData.from.name,
          toCoin: this.convertData.to.id,
        });
      }
    },
    /*     async convertTo() {
      this.result = await convert({
        coin: [this.convertData.from.name],
        toCoin: [this.convertData.to.id],
      });
    }, */
  },
};
</script>
<style lang="scss">
.converter {
  // .converter__title
  &__title {
  }

  // .converter__convert

  &__convert {
    display: grid;
    //grid-template-columns: 100%;
    gap: 10px 0;
  }

  // .converter__label

  &__label {
  }
}

.convert {
  // .convert__title

  &__title {
  }

  // .convert__result

  &__result {
  }
}
.sub-title {
}
.text {
}
</style>