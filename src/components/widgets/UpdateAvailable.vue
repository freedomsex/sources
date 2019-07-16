<script>
export default {
  props: ['small'],
};
</script>

<i18n>
{
  "ru": {
    "text": "Доступна новая версия",
    "button": "Обновить"
  },
  "en": {
    "text": "A new version is available",
    "button": "Refresh"
  },
  "kz": {
    "text": "Жаңа нұсқа қол жетімді",
    "button": "Жаңарту"
  },
  "ua": {
    "text": "Доступна нова версія",
    "button": "Оновити"
  }
}
</i18n>

<template>
  <nav v-if="$store.state.update">
    <div class="notice-board"  :class="{'small-board': small}">
        <div class="glyphicon glyphicon-refresh"></div>
        {{$t('text')}}
        <button class="btn btn-sm btn-default" :class="{'btn-xs': small}" @click="$root.redirectHome()">
          {{$t('button')}}
        </button>
    </div>
  </nav>
</template>

<style lang="less">
.notice-board {
  background-color: @green-dark;
  padding: @indent-sm @indent-md;
  text-align: center;
  position: relative;
  color: @white;
  &.small-board {
    padding: @indent-sm;
  }

  .btn {
    margin: 0 @indent-xs;
    text-transform: uppercase;
  }
  .glyphicon {
    margin-right: @indent-xs;
    display: inline-block;
    top: 2px;
  }
}

</style>
