<template>
  <section class="converter">
    <div class="content-width">
      <h1 class="converter__title title">Конвертер валют</h1>
      <form @submit.prevent="" class="converter__convert convert">
        <h2 class="convert__title sub-title">Конвертировать</h2>
        <div class="converter__row">
          <label class="convert__title converter__label convert-to__label text"
            >Преобразовать из</label
          >
          <svg
            v-if="convertData.to && convertData.from && convertData.count"
            class="sprite-icon sprite-icon--update conver-to__update"
            :class="{ active: request === 'pending' }"
            @click="updateAll()"
          >
            <use xlink:href="@/assets/img/sprite.svg#icon-update"></use>
          </svg>
        </div>
        <div class="convert-to">
          <CoinCount
            class="convert-to__count"
            :isValue="convertData.count"
            :labelValue="'Введите число'"
            @isInput="
              selected({
                count: $event,
              })
            "
          ></CoinCount>
          <CoinSelect
            class="convert-to__from"
            :options="optionsFrom"
            :selected="convertData.from"
            @select="
              selected({
                item: 'from',
                coin: $event,
              })
            "
          ></CoinSelect>
        </div>

        <label class="convert__title converter__label text"
          >Преобразовать в</label
        >
        <CoinSelect
          :options="optionsTo"
          :selected="convertData.to"
          @select="
            selected({
              item: 'to',
              coin: $event,
            })
          "
        ></CoinSelect>
        <div v-if="result" class="convert__result text">
          <div class="converter__row">
            <div>
              <label class="convert__title converter__label">Результат: </label>
              <span class="text--sp"
                >{{ result }} {{ convertData.to.id.toUpperCase() }}</span
              >
              <span class="text">
                &nbsp; (по курсу: {{ convertData.price }} за ед.)</span
              >
            </div>
            <svg class="sprite-icon sprite-icon--remove" @click="clearData">
              <use xlink:href="@/assets/img/sprite.svg#icon-remove"></use>
            </svg>
          </div>
        </div>
        <p class="text" v-if="request === 'pending'">Данные загружаются...</p>
        <p class="text" v-if="!request">
          При получении данных произошла ошибка. Попробуйте позже...
        </p>
      </form>
      <CoinChart />
    </div>
  </section>
</template>
<script>
import CoinSelect from "@/components/ui/ui-select.vue";
import CoinChart from "@/components/converter/ConverterChart.vue";
import CoinCount from "@/components/ui/ui-input.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ConvertIndex",
  components: {
    CoinSelect,
    CoinChart,
    CoinCount,
  },
  computed: {
    ...mapGetters("coin", {
      coins: "coins",
      convertData: "convert",
      request: "request",
      result: "result",
    }),
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
      changeSelect: "changeSelect",
      convertTo: "convert",
      clearConvert: "clearData",
    }),
    ...mapActions("chartData", {
      getChartData: "getChartData",
      clearChart: "clearData",
    }),
    selected({ item, coin, count }) {
      this.changeSelect({ item, coin, count });
      if (this.convertData.to && this.convertData.from) {
        this.convertTo();
        this.getChartData({
          coin: this.convertData.from.name,
          toCoin: this.convertData.to.id,
        });
      }
    },
    updateAll() {
      this.convertTo();
      this.getChartData({
        coin: this.convertData.from.name,
        toCoin: this.convertData.to.id,
      });
    },
    clearData() {
      this.clearConvert();
      this.clearChart();
    },
  },
};
</script>
<style lang="scss">
.converter {
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // .converter__convert
  &__convert {
    display: grid;
    //grid-template-columns: 100%;
    gap: 10px 0;
  }
}

.convert-to {
  display: flex;
  gap: 0 10px;
  &__count {
    flex: 0 0 30%;
  }
  &__from {
    flex: 1 1 auto;
  }
}
</style>