<script>
export default {
  props: ['user', 'idle', 'loader', 'compact'],
  data: () => ({

  }),
  computed: {
    name() {
      let result = '•••';
      if (!this.loader) {
        result = 'Парень или девушка';
      }
      if (this.user) {
        if (this.user.sex) {
          result = this.user.sex == 2 ? 'Девушка' : 'Парень';
        }
        if (this.user.name) {
          result = this.user.name;
        }
      }
      return result;
    },
    age() {
      return (this.user && this.user.age) ? this.user.age : '';
    },
    city() {
      if (this.compact) {
        return '';
      }
      return (this.user && this.user.city) ? this.user.city : '';
    },
  },
};
</script>

<template>
  <span class="colored-user-info">
    <span class="colored-user-info__name" :class="{idle: idle}">{{name}}</span>
    <span class="colored-user-info__age" :class="{idle: idle}" v-show="age">{{age}}</span>
    <span class="colored-user-info__city" :class="{idle: idle}" v-show="city">{{city}}</span>
  </span>
</template>

<style lang="less">
.colored-user-info {

  display: flex;
  // flex: 0 1 auto;
  white-space: nowrap;
  overflow: hidden;

  span {
    margin-right: 5px;
    &:last-child {
      margin-right: 0px;
    }
  }

  &__name {
    color: @dark;
    flex: none;
  }
  &__age {
    color: @red-dark;
    flex: none;
  }
  &__city {
    color: @link-color;
    flex: 0 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .idle {
    color: @gray-dark;
  }
}
</style>
