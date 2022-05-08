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
        <div class="converter__row">
          <label class="convert__title converter__label text">Преоброзовать из</label>
          <svg
            v-if="convertData.result||requests.convert==='pending'"
            class="sprite-icon sprite-icon--update"
            :class="{'active': requests.convert==='pending'}"
            @click="convertTo()"
          >
            <use xlink:href="@/assets/img/sprite.svg#icon-update"></use>
          </svg>
        </div>
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
          <div class="converter__row">
            <div>
              <label class="convert__title converter__label">Результат: </label>
              <span class="text--sp">{{convertData.result}} {{convertData.to.id.toUpperCase()}}</span>
            </div>
            <svg
              class="sprite-icon sprite-icon--remove"
              @click="clearData"
            >
              <use xlink:href="@/assets/img/sprite.svg#icon-remove"></use>
            </svg>
          </div>
        </div>
        <label
          class="convert__title converter__label"
          v-if="requests.convert==='pending'"
        >Данные загружаются...
        </label>
        <label
          class="convert__title converter__label"
          v-if="!requests.convert"
        >При получении данных произошла ошибка. Попробуйте позже...
        </label>
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
    ...mapGetters("coin", {
      coins: "coins",
      convertData: "convert",
      requests: "requests",
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
      getChartData: "getChartData",
      changeSelect: "changeSelect",
      convertTo: "convert",
      clearData: "clearData",
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
  },
};
</script>
<style lang="scss">
.converter {
  // .converter__title
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
</style>