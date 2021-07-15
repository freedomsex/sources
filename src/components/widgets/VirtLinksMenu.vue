<script>
export default {
  props: [],
  data: () => ({
    site: 'https://virt4.com/',
  }),
  components: {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<template>
  <div class="virt-links-menu split-bottom" v-if="1">
    <a class="btn btn-warning" target="_blank" :href="site">
      ВИРТ СЕКС
    </a>
    <a class="btn btn-success" target="_blank" :href="site + `virt-sex/search/gay`">
      ГЕЙ ЗНАКОМСТВА
    </a>
    <a class="btn btn-danger" target="_blank" :href="site + `virt-sex/search/lesbian`">
      ЛЕСБИ СЕКС
    </a>
    <a class="btn btn-primary" target="_blank" :href="site + `virt-sex`">
      СМОТРЕТЬ ФОТО
    </a>
    <a class="btn btn-warning" target="_blank" :href="site + `virt-sex/search/couple`">
      ПАРЫ И СВИНГЕРЫ
    </a>
    <a class="btn btn-success" target="_blank" :href="site + `virt-sex/search/group`">
      СЕКС ВЕЧЕРИНКИ
    </a>
  </div>
</template>

<style lang="less">
.virt-links-menu {
  margin-top: 15px;

  display: flex;
  overflow: hidden;
  overflow-x: auto;
  padding: 0 5px;
  .btn {
    margin-right: 5px;
  }
}
</style>
