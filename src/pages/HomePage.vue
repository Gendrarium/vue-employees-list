<template>
  <section class="home main__home">
    <h2 class="home__title">Добро пожаловать!</h2>
    <router-link to="/employees" class="home__link">
      Создайте таблицу с сотрудниками
    </router-link>
  </section>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  align-items: center;

  &__title {
    color: $color-text;
    font-size: 26px;
    font-weight: 500;
  }

  &__link {
    margin-top: 20px;
    font-size: 18px;
  }
}
</style>
