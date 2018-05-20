<script>
import _ from 'underscore';

/* Сложность вызвана очередностью и приоритетом каждой соцсети */
export default {
  props: ['human'],
  data: () => ({
    icons: [],
    order: {
      first: ['em', 'ok', 'vk', 'fb', 'go', 'sk', 'ph'],
      second: ['vk', 'ok', 'fb', 'go', 'sk', 'ph'],
      third: ['sk', 'ph', 'em', 'ok', 'vk', 'fb', 'go'],
    },
  }),
  mounted() {
    this.find('first');
    this.find('second');
    this.find('third');
  },
  methods: {
    find(index) {
      _.find(_.pick(this.human, this.order[index]), (value, key) => {
        if (value && _.indexOf(this.icons, key) < 0) {
          this.icons.push(key);
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<template>
  <span class="contacts">
    <div class="icon" :class="icons[0]" v-if="icons[0]"></div>
    <div class="icon" :class="icons[1]" v-if="icons[1]"></div>
    <div class="icon" :class="icons[2]" v-if="icons[2]"></div>
  </span>
</template>

<style lang="less" scoped>

.contacts {
  display: flex;

  .icon {
    height: 16px;
    width: 16px;
    margin-left: 5px;
    background-repeat: no-repeat;
    background-position: left center;

    &.vk {
      background: url('~static/img/icon/social/search/vk.png');
    }
    &.sk {
      background: url('~static/img/icon/social/search/sk.png');
    }
    &.ok {
      background: url('~static/img/icon/social/search/ok.png');
    }
    &.fb {
      background: url('~static/img/icon/social/search/fb.png');
    }
    &.ph {
      background: url('~static/img/icon/social/search/ph.png');
    }
    &.em {
      background: url('~static/img/icon/social/search/em.png');
    }
    &.go {
      background: url('~static/img/icon/social/search/go.png');
    }
  }
}


</style>
