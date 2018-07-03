<script>
import CensoredText from '~components/CensoredText';

export default {
  data: () => ({}),
  components: {
    CensoredText,
  },
};
</script>

<i18n>
{
  "en": {
    "Начать": "Start now",
    "В один клик, без регистрации": "In one click, without registration"
  },
  "ua": {
    "Начать": "Почати",
    "В один клик, без регистрации": "В один клік, без реєстрації"
  },
  "kz": {
    "Начать": "Бастау",
    "В один клик, без регистрации": "Бір рет басып, тіркеусіз"
  }
}
</i18n>

<template>
  <div class="registration-promo"
   @click="$router.push('/confirm-sex/search')">
    <button class="btn btn-primary"> {{$t('Начать')}} </button>
    <span class="registration-promo__tagline">
      {{$t('В один клик, без регистрации')}}
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
