<script>
import CityDefaultList from '~assets/CityDefaultList';

export default {
  props: [],
  data: () => ({
    width: 0,
    cities: CityDefaultList,
  }),
  mounted() {
    this.width = this.$el.offsetWidth;
  },
  computed: {
    list() {
      const limit = this.width > 700 ? 150 : 25;
      return this.cities.slice(0, limit);
    },
  },
  methods: {
    route() {
      this.$router.push('/wizard/city');
    },
  },
};
</script>

<template>
    <div class="container city-widget">
      <div class="row">
        <div class="widget__caption">Города для секса</div>
        <div class="widget__wrapper">
          <a class="city-item"
           :href="`/${item}`"
           :title="`Секс знакомства ${item}`"
           v-for="(item, index) in list">
            {{item}}
          </a>
          <div class="city-widget__next" v-show="1">
            <span class="btn btn-default btn-sm"
              @click="route">
              <span aria-hidden="true" class="glyphicon glyphicon-globe"></span>
              Выбрать город
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="less">
@import './widget.less';

.city-widget {
  .widget();

  .city-item {
    background-color: @gray-dark;
    border-radius: @radius-xs;
    border: 0px solid @gray;
    color: @white;
    cursor: pointer;
    display: inline-block;
    font-size: @font-sm;
    font-style: normal;
    margin-bottom: @indent-xs;
    margin-right: @indent-xs;
    padding: @indent-xs+2 @indent-sm;
    line-height: 1;
    &:hover {
      background-color: @dark-light;
      text-decoration: none;
    }
  }
  &__next {
    margin-top: 5px;
    text-align: center;
  }
}
</style>
