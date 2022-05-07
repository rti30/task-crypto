<template>
  <section class="portfolio">
    <div class="content-width">
      <div class="portfolio__body">
        <h1 class="portfolio__title title">
          Портфель
        </h1>
        <div class="portfolio__total">
          <span class="text text--sp">
            {{total}}&#36;
          </span>
          <svg
            class="sprite-icon sprite-icon--update"
            :class="{'active' : request==='pending'}"
            @click="updatePrices()"
          >
            <use xlink:href="@/assets/img/sprite.svg#icon-update"></use>
          </svg>
        </div>
        <form
          @submit.prevent=""
          class="portfolio__add add-coin"
        >
          <CoinSelect
            :options="coins"
            :selected="selectCoin"
            @select="changeSelect({
              coin:$event
             })"
          ></CoinSelect>
          <CoinSum
            :isValue="sum.count"
            :labelValue="'Введите значение'"
            @isInput="inputSum($event)"
          ></CoinSum>
          <div class="add-coin__controler">
            <button
              class="btn"
              type="button"
              :disabled="!canAct"
              @click="change({op:'increase', coin:selectCoin, count:sum.count})"
            >Добавить</button>
            <button
              class="btn"
              type="button"
              :disabled="!canAct"
              @click="change({op:'decrease', coin:selectCoin, count:sum.count})"
            >Вычесть</button>
            <button
              class="btn"
              type="button"
              :disabled="!hasIn"
              @click="change({op:'remove', coin:selectCoin})"
            >Удалить</button>
          </div>
        </form>
      </div>
      <CoinsDiagram />
    </div>
  </section>
</template>
<script>
import CoinSelect from "@/components/ui/ui-select.vue";
import CoinSum from "@/components/ui/ui-input.vue";
import CoinsDiagram from "@/components/portfolio/AssetsDiagram.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AssetsIndex",
  components: {
    CoinSelect,
    CoinSum,
    CoinsDiagram,
  },
  data() {
    return {
      selectCoin: null,
      sum: {
        count: 1,
        require: /[^\d/.]/g,
      },
    };
  },
  computed: {
    ...mapGetters("coin", { coins: "coins" }),
    ...mapGetters("portfolio", {
      assets: "assets",
      total: "total",
      request: "request",
    }),
    canAct() {
      return this.sum.count && this.selectCoin;
    },
    hasIn() {
      return this.assets?.some((coin) => coin?.id === this.selectCoin?.id);
    },
  },
  methods: {
    ...mapActions("portfolio", {
      change: "changeAssets",
      updatePrices: "updateAssetsPrices",
    }),
    changeSelect({ coin }) {
      this.selectCoin = coin;
    },
    inputSum(count) {
      count = Number(
        count
          .replace(this.sum.require, "")
          .split(".")
          .reduce((acc, el, i) => (acc += i == 1 ? "." + el : el), "")
      );
      this.sum.count = count ? count : 0;
    },
  },
};
</script>
<style lang="scss">
.portfolio {
  // .portfolio__title
  &__body {
    display: grid;
    grid-template-areas:
      "title total"
      "add-coin add-coin";
    align-items: center;
  }
  &__title {
    grid-area: title;
    text-align: left;
    &::before {
      display: none;
    }
  }

  // .portfolio__total
  &__total {
    grid-area: total;
    justify-self: right;
    display: flex;
    align-items: center;
    gap: 0 10px;
  }

  // .portfolio__add
  &__add {
    grid-area: add-coin;
  }
}

.add-coin {
  display: grid;
  gap: 25px 0;
  grid-template-areas: "";
  // .add-coin__controler
  &__controler {
    justify-content: center;
    margin: 0 0 30px 0;
    display: flex;
    gap: 0 10px;
  }
}
</style>