<script>
import HalfDialog from '~halves/HalfDialog';
import HumanTitle from '~assets/HumanTitle';

// import LoadingWall from '~dialogs/LoadingWall';
import AttentionWall from '~dialogs/AttentionWall';
import CensoredText from '~components/CensoredText';

import Loadable from '~mixins/Loadable';
import SendForm from '~modules/SendForm';
import DesireListCompact from '~modules/DesireListCompact';
import HumanSummary from './HumanSummary';

export default {
  props: ['humanId', 'index', 'initial'],
  mixins: [Loadable],
  data: () => ({
    loading: false,
    confirm: false,
    ignore: false,
    code: null,
  }),

  mounted() {
    this.reload();
  },
  computed: {
    human() {
      return this.$store.state.human;
    },
    caption() {
      return HumanTitle(this.human);
    },
    user() {
      return this.$store.state.user;
    },
    tags() {
      return (this.human && 'tags' in this.human) ? this.human.tags : [];
    },
  },
  methods: {
    action() {
      if (!this.user.city) {
        this.$router.push('wizard/city');
      } else if (!this.user.age) {
        this.$router.push('settings/account');
      }
    },
    information() {
      let result = '';
      const {human} = this.$store.state;
      const who = {2: 'парни', 1: 'девушки'};
      if (human.sex && human.sex == this.user.sex) {
        result = `Мне интересны только ${who[human.sex]}`;
      } else if (human.sex) {
        const {age} = this.user;
        if (human.up && age && human.up > age) {
          result = `Мне интересны ${who[human.sex]} в возрасте от ${human.up} лет `;
        }
        if (human.to && age && human.to < age) {
          result = `Мне интересны ${who[human.sex]} в возрасте до ${human.to} лет `;
        }
      }
      if ((human.up || human.to) && !this.user.age) {
        result = 'Укажите ваш возраст в анкете, для меня это важно';
      }
      if (human.close && this.user.city && this.user.city != human.city) {
        result = 'Мне интересно общение только в моём городе';
      }
      if (human.close && !this.user.city) {
        result = 'Укажите ваш город в анкете, для меня это важно';
      }
      return result;
    },


    reload() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3 * 1000);
      this.$store.dispatch('human/load', this.humanId).then(() => {
        this.loaded();
      }).catch(() => {
        this.loading = false;
      });
    },
    loaded() {
      this.loading = false;
      this.visited();
    },
    remove() {
      this.$emit('remove');
    },
    cancel() {
      this.captcha = false;
      this.confirm = false;
      this.ignore = true;
    },
    visited() {
      this.$store.dispatch('visited/ADD', this.humanId);
    },
    close() {
      this.$emit('close');
    },
    sended() {
      this.close();
    },
    account() {
      this.$router.push(`${this.humanId}/detail`);
    },
    dialog() {
      this.$router.push(`${this.humanId}/dialog`);
    },
  },
  components: {
    HalfDialog,
    SendForm,
    // LoadingWall,
    AttentionWall,
    DesireListCompact,
    CensoredText,
    HumanSummary,
  },
};
</script>

<template>
  <HalfDialog :caption="caption" @close="close">
    <template slot="option">
      <div class="header-bar__button" @click="dialog()">
        <span class="header-bar__title">Диалог</span>
        <i class="material-icons">&#xE0BF;</i>
      </div>
    </template>

    <div class="human-dialog__body">
      <DesireListCompact :tags="tags" @select="account()"/>

      <HumanSummary :vip="human.vip" :humanId="humanId"/>
    </div>

    <div class="human-dialog__text message" v-if="human.message">
      <CensoredText :text="human.message" :passive="true"/>
    </div>
    <div class="human-dialog__text warning" v-if="information()"
     @click="action()">
      {{information()}}
    </div>


    <SendForm
      :key="humanId"
      :humanId="humanId"
      :initial="initial"
      :excess="information()"
      @sended="sended"
      @close="close"/>

    <!-- <LoadingWall :show="loading"/> -->


    <AttentionWall v-if="!ignore && human.hold"
     :show="human.hold"
     @promt="cancel"
     @close="close"/>


  </HalfDialog>
</template>

<style lang="less">
.human-dialog {
//   &__input {
//     border-width: 0px;
//   }
  &__body {
    padding: @indent-sm @indent-sm 7px;
  }
  &__text {
    padding: @indent-sm @indent-sm;
    background: @light;
    // margin-bottom: @indent-xs;
    cursor: pointer;
    &.message {
      background: @light;
    }
    &.warning {
      background: @alert-sand;
      border-top: 3px solid #faebcc;
    }
  }
}
</style>
