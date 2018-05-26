<script>
import lscache from 'lscache';

// TODO: Remame to RELEASEs
export default {
  data() {
    return {
      enable: true,
      version: '2017-12-01',
      users: {
        idUp: null,
        idTo: 67300000,
        sex: null,
        city: [],
      },
      accept: true,
    };
  },
  mounted() {
    this.accept = lscache.get('release-info') <= this.version;
  },
  computed: {
    userId() {
      return this.$store.state.user.uid;
    },
    sex() {
      return this.$store.state.user.sex;
    },
    city() {
      return this.$store.state.user.city;
    },
    show() {
      return this.enable && !this.accept && this.forId(this.userId);
    },
  },
  methods: {
    forId(id) {
      let result = true;
      if (this.users.idUp || this.users.idTo) {
        result = false;
      }
      if (id) {
        result = this.users.idUp ? id > this.users.idUp : result;
        result = this.users.idTo ? id < this.users.idTo : result;
      }
      return result;
    },
    confirm() {
      lscache.set('release-info', this.version);
      this.accept = true;
    },
    more() {
      this.$router.push(`/releases/${this.version}`);
    },
  },
};
</script>

<template>
  <div class="container info-widget split-bottom" v-if="show">
    <div class="info-widget__title">ЧТО НОВОГО</div>
    <div>
      Сейчас проект рассчитан только на девушек,
      которые хотят найти парня и парней которые ищут
      девушку в данный момент. Сервис быстрых знакомств
      с возможностью анонимного общения и приватного обмена фотографиями.
      <div class="info-widget__new-list">
        <div class="item-new">* Теперь только гетеро знакомства, парень-девушка</div>
        <div class="item-new">* Теперь без оскорблений, БДСМ общение нарушает правила</div>
      </div>
    </div>
    <div class="info-widget__options">
      <button class="btn btn-default" @click="confirm()">Хорошо, спасибо</button>
      <button class="btn btn-link" @click="more()">Читать подробнее...</button>
    </div>
  </div>
</template>

<style lang="less">
@import './widget.less';

.info-widget {
  .widget();
  background: @yellow-light;
  color: #8a6d3b;
  padding: @indent-md @indent-md @indent-md;
  border-bottom: 2px solid #faebcc;
  border-top: 2px solid #faebcc;

  &__title {
    font-size: @font-xl;
    margin-bottom: @indent-xs;
  }

  &__options {
    margin-top: @indent-md;
  }

  &__new-list {
    font-size: @font-md;
    margin-top: @indent-sm;
    .item-new {
    }
  }
}
</style>
