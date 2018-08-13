<script>
export default {
  props: ['human', 'text'],
  computed: {
    status() {
      let {vip} = this.human;
      return vip ? vip.status : null;
    },
    style() {
      return {
        special: this.status === 1,
        gold: this.status === 2,
        vip: this.status === 3,
      };
    },
    hint() {
      let result = '';
      result = this.status === 1 ? 'Особый статус' : result;
      result = this.status === 2 ? 'Золотой статус' : result;
      result = this.status === 3 ? 'VIP статус' : result;
      return result;
    },
    title() {
      if (this.text && this.text !== true) {
        return this.text;
      }
      return this.hint;
    },
  },
};
</script>

<template>
  <div class="vip-status" v-if="status">
    <i class="material-icons" :class="style" :title="hint">&#xE853;</i>
    <span class="vip-status__title" :class="style" v-show="text">
      {{title}}
    </span>
  </div>
</template>

<style lang="less">
.vip-status {
  display: flex;

  &__title {
    font-size: 15px;
    margin-left: 5px;
  }

  .material-icons {
    font-size: 20px;
  }
  .special {
    color: @green;
  }
  .gold {
    color: @orange;
  }
  .vip {
    color: @red-dark;
  }
}
</style>
