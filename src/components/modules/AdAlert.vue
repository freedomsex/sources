<script>
export default {
  props: [],
  data: () => ({
    chance: 5,
  }),
  components: {},
  mounted() {},
  computed: {
    variant() {
      return this.random(1, this.chance); // ${this.random(3, 3)}
    },
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * ((max - min) + 1)) + min;
    },
  },
};
</script>

<template>
  <div class="">
    <div class="container freedom-alert-1-2" v-if="variant == chance">
      <a href="//fapbook.me/" target="_blank" rel="nofollow">
        Сохраните лучшее порно или эротические фото для себя. Смотрите их в любой момент!
        <span class="link_simple">Подробнее...</span>
      </a>
    </div>
    <div class="container freedom-alert-1-3" v-else>
      <a href="http://virt4.com/" target="_blank" rel="nofollow">
        Виртуальный секс. Интимные возбуждающие разговоры. Начни создавать свои истории!
        <span class="link_simple">Подробнее...</span>
      </a>
    </div>
  </div>
</template>

<style lang="less">
.freedom-alert() {
  .widget();
  margin-top: 5px;
  background: #f5ca59;
  color: @dark;
  padding: @indent-sm @indent-md;
  cursor: pointer;
  a {
    color: @dark;
    text-decoration: none;
    &:hover {
      color: @dark-light;
      text-decoration: none;
    }
  }
}

.freedom-alert-1 {
  &-2 {
    .freedom-alert();
    background: #f5ca59;
  }
  &-3 {
    .freedom-alert();
    background: #ff99cc;
  }
}
</style>
