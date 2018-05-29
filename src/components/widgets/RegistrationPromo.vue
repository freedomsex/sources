<script>
export default {
  data: () => ({}),
};
</script>

<template>
  <div class="registration-promo"
   @click="$router.push('/confirm-sex/search')">
    <button class="btn btn-primary">  Начать  </button>
    <span class="registration-promo__tagline">
      В один клик,
      без регистрации
    </span>
  </div>
</template>

<style lang="less">
.registration-promo {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: @white;
  padding: @indent-sm @indent-sm;
  box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;

  &__tagline {
    padding: @indent-xs @indent-sm;
    padding-right: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
}
</style>
