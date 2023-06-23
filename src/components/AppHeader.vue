<template>
  <header class="header">
    <router-link class="header__link" to="/">
      <h2 class="header__title">Vue Employees</h2>
    </router-link>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba($color: $color-blue, $alpha: 0.5);

  &__link {
    margin: auto;
    text-decoration: none;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: $color-white;
    margin-bottom: 0;
  }
}
</style>
