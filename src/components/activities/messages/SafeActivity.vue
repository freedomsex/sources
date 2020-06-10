<script>
import _ from 'underscore';
import ActivityActions from '~activities/ActivityActions';

export default {
  props: ['text'],
  watch: {
    message: _.debounce(function f() {
      this.check();
      this.variants();
    }, 700),
  },
  data: () => ({
    edited: true,
    allowed: true,
    process: true,
    message: '',
    list: [],
  }),
  components: {
    ActivityActions,
  },
  mounted() {
    this.message = this.text;
    this.preload();
    this.$refs.input.focus();
  },
  computed: {
    trust() {
      return !this.process && this.allowed;
    },
  },
  methods: {
    async check() {
      this.process = true;
      const {data} = await this.$api.res('message/verify', 'a4sex').post({message: this.message});
      this.process = false;
      this.allowed = false;
      if (data) {
        this.allowed = true;
      }
    },
    async variants() {
      const {data} = await this.$api.res('message/variants', 'a4sex').post({message: this.message});
      this.list = data;
    },
    async preload() {
      const {data} = await this.$api.res('message/first', 'a4sex').load();
      this.list = data;
      console.log(['list', data]);
    },
    toggle() {
      this.$store.commit('trusting');
    },
    select(text) {
      this.$emit('select', text);
      this.$emit('close');
    },
  },
};
</script>

<template>
  <ActivityActions caption="Варианты" @close="$emit('close')">

    <template slot="option">
      <div class="header-bar__button" @click="">
        <a class="header-bar__title" href="http://docs.freedomsex.info/blog/#/Как-пользоваться/Верификация-общения" target="_blank">
          Информация
        </a>
        <i class="material-icons">&#xE88F;</i>
      </div>
    </template>

    <!-- <template slot="option">
      <div class="header-bar__button" v-if="$store.state.trustCheck" @click="toggle()">
        <i class="material-icons">&#xE86C;</i>
        <span class="header-bar__title">
          Включено
        </span>
      </div>
      <div class="header-bar__button" @click="toggle()" v-else>
        <i class="material-icons">&#xE611;</i>
        <span class="header-bar__title">
          Отключено
        </span>
      </div>
    </template> -->

    <div class="variants-module" key="humanId">
      <div class="variant-list">
        <div class="variant-list__item reversed" v-for="item in list" :key="item.key" @click="select(item.text)">
          {{item.text}}
        </div>
      </div>
      <div class="messages__alert" v-show="0" @click.self="">

      </div>
      <div class="message-dialog__tools">
        <div class="safe-form">
          <div class="safe-form__button-safe" :class="{trust}" @click="">
            <i class="material-icons" v-if="process">&#xE40C;</i>
            <i class="material-icons" v-else-if="allowed">&#xE86C;</i>
            <i class="material-icons" v-else>&#xE000;</i>
          </div>
          <div class="safe-form__textarea">
            <textarea ref="input" class="safe-form__message-text" v-model="message" v-resized
             @keyup.ctrl.enter.prevent="select(message)"></textarea>
          </div>
          <div class="safe-form__button-send" @click="select(message)">
            <i class="material-icons">&#xE5C8;</i>
          </div>
        </div>
      </div>
    </div>

  </ActivityActions>
</template>

<style lang="less">

.variants-module {
  display: flex;
  flex: 1 1 auto;
  border: 0px solid gray;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 100%;
}

.variant-list {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  flex: 1 1 auto;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;

  &__item {
    .list-item();
    min-height: inherit;
  }
}

.safe-form {
  position: relative;
  display: flex;
  width: 100%;
  // min-height: 64px;
    border-top: 1px solid #cccccc;
  align-items: flex-end;
  &__textarea {
    flex: 1 1 auto;
    border: 0px solid gray;
    padding: 5px 0;
    line-height: 1;
    align-self: center;
  }
  &__message-text {
    height: 0;
    overflow: auto;
    min-height: 36px;
    padding: 10px 5px;
    font-size: 14px;
    margin: auto;
    overflow-y: hidden;
    resize: vertical;
  }

  &__button {
    .menu-button() {
      cursor: pointer;
      flex: 0 0 auto;
      color: @dark-light;
      padding: 0 5px 7px;
    }

    &-send {
      .menu-button();
    }
    &-safe {
      .menu-button();
      padding: 0 2px 1px 3px;
      &.trust {
        color: @green-dark !important;
      }

      i {
        font-size: 45px !important;
      }
    }
  }

  i {
    font-size: 32px;
    vertical-align: bottom;
  }
}
</style>
