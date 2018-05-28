<script>
export default {
  data: () => ({}),
};
</script>

<template>
  <div class="registration-promo">
    В один клик
    <button class="btn btn-fat btn-primary"
     @click="$router.push('/confirm-sex/search')">
      Начать
    </button>
    без регистрации
  </div>
</template>

<style lang="less">
.registration-promo {
  text-align: center;
  display: block;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: @white;
  padding: @indent-sm @indent-sm;
  box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, 0.08);
  z-index: 1;

  button {
    margin: 0 @indent-sm;
  }
}
</style>
