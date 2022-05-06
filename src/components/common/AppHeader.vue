<template>
  <header class="header">
    <div class="content-width">
      <div class="header__body">
        <div class="header__logo">
          <router-link :to="{name: 'main'}">
            <img
              src="@/assets/logo.png"
              alt="Логотип: логотип в виде буквы 'V'"
            >
          </router-link>
        </div>
        <nav class="header__nav nav">
          <ul class="nav__menu text">
            <li>
              <router-link
                class="nav__link hover-color"
                :to="{ name: 'main' }"
              >Конвертер валют</router-link>
            </li>
            <li>
              <router-link
                class="nav__link hover-color"
                :to="{ name: 'portfolio' }"
              >Мои финансы</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "AppHeader",
};
</script>
<style lang="scss">
.header {
  padding: 20px 0 21px;
  /*   font-size: 14px;
  line-height: calc(28 / 14); */
  background-color: #2b2b2b;
  border-bottom: 1px solid #f1f1f1;

  /*   @media (min-width: $tabletWidth + "px") {
    font-size: 18px;
    line-height: calc(28 / 18);
  } */
  // .header__logo
  &__body {
    display: flex;
    align-items: center;
    gap: 0 25px;
    @media (min-width: $tabletWidth + "px") {
      gap: 0 50px;
    }
    img {
      height: 60px;
      @media (min-width: $tabletWidth + "px") {
        height: 100px;
      }
    }
  }

  // .header__nav
  &__nav {
    flex: 1 1 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.nav {
  // .nav__menu
  &__menu {
    display: flex;
    flex-wrap: wrap;
    gap: 0 20px;
    @media (min-width: $tabletWidth + "px") {
      gap: 0 40px;
    }
  }

  // .nav__link
  &__link {
    position: relative;
    padding: 5px 5px 5px;
    color: $c-second;
    @media (min-width: $tabletWidth + "px") {
      padding: 5px 5px 10px;
    }
  }
  &__link.router-link-exact-active {
    color: $c-main;
    &::before {
      content: "";
      background-color: $c-main;
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
    }
  }
}
</style>