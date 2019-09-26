<script>
import BottomBar from '~widgets/BottomBar';
import MailerStatus from '~modules/MailerStatus';

export default {
  props: [],
  data: () => ({

  }),
  computed: {
    newMessage() {
      const {status} = this.$store.state.intimates;
      return status == false || status < 8;
    },
    newContact() {
      const {status} = this.$store.state.initials;
      return status == false || status < 8;
    },
  },
  methods: {
    search() {
      this.$store.commit('simple', true);
      this.$root.reload();
      this.$router.push('/');
    },
    initial() {
      this.$router.push({name: 'initial'});
    },
    intimate() {
      this.$router.push({name: 'intimate'});
    },
  },
  components: {
    BottomBar,
    MailerStatus,
  },
};
</script>

<i18n>
{
  "en": {
    "Поиск": "Search",
    "Общение": "Messages",
    "Знакомства": "Dating"
  },
  "kz": {
    "Поиск": "Іздеу",
    "Общение": "Байланыс",
    "Знакомства": "Танысу"
  },
  "ua": {
    "Поиск": "Пошук",
    "Общение": "Спілкування",
    "Знакомства": "Знайомства"
  }
}
</i18n>

<template>
  <BottomBar>
    <div class="bottom-nav">
      <div class="nav-button" @click="search()">
        <div class="nav-button__icon">
          <i class="material-icons">&#xE8B6;</i>
          <!-- <span class="nav-button__status active"></span> -->
        </div>
        <div class="nav-button__caption">
          {{$t('Поиск')}}
        </div>
      </div>

      <div class="nav-button" @click="intimate()">
        <div class="nav-button__icon">
          <i class="material-icons">&#xE0BE;</i>
          <span class="nav-button__status"
            v-if="newMessage"></span>
        </div>
        <div class="nav-button__caption">
          {{$t('Общение')}}
        </div>
      </div>

      <div class="nav-button" @click="initial()">
        <div class="nav-button__icon">
          <i class="material-icons">&#xE87D;</i>
          <span class="nav-button__status"
            v-if="newContact"></span>
        </div>
        <div class="nav-button__caption">
          {{$t('Знакомства')}}
        </div>
      </div>

      <div class="nav-button" @click="$router.push('/credits')">
        <div class="nav-button__icon">
          <i class="material-icons">&#xE53F;</i>
        </div>
        <div class="nav-button__caption">
          Доверие
        </div>
      </div>

    </div>

    <MailerStatus ref="status" />

  </BottomBar>
</template>

<style lang="less">
.bottom-nav {
  @min-display: 300px;

    display: flex;
    justify-content: space-between;
    // align-items: center;
    white-space: nowrap;
    overflow: hidden;

    max-width: @activity-width;
    margin: 0 auto;

    padding: 5px @indent-sm 2px;
    @media (max-width: @min-display) {
      padding: 7px @indent-sm;
    }

    .nav-button {
      // flex: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      padding: 0px 5px;
      position: relative;

      color: @dark-light;
      cursor: pointer;

      &__icon {
        flex: 0 auto;
        font-size: 0px;
        position: relative;

        &-text {
          padding-top: 3px;
          font-size: 20px;
        }
      }

      &__status {
        width: 10px;
        height: 10px;
        position: absolute;
        bottom: 0px;
        right: -3px;
        display: inline-block;
        border-radius: 10px;
        box-shadow: 0 0 0 2px @white;
        vertical-align: middle;
        background-color: @red-dark;
      }

      &__caption {
        flex: 0 auto;
        font-size: 12px;
        @media (max-width: @min-display) {
          display: none;
        }
      }
    }
}
</style>
