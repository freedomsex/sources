<script>
import BottomBar from '~widgets/BottomBar';

export default {
  data: () => ({}),
  components: {
    BottomBar,
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
  <BottomBar>
    <div class="registration-promo" @click="$router.push('/confirm-sex/search')">
      <button class="btn btn-primary"> {{$t('Начать')}} </button>
      <span class="registration-promo__tagline">
        {{$t('В один клик, без регистрации')}}
      </span>
    </div>
  </BottomBar>
</template>

<style lang="less">
.registration-promo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: @indent-sm @indent-sm;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;

  &__tagline {
    padding-left: @indent-sm;
  }
}
</style>
