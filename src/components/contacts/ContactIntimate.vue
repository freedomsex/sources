<script>
import ActivityActions from '~activities/ActivityActions';
import MessagesActivity from '~activities/messages/MessagesActivity';
import ContactDialog from './ContactDialog';
import ContactItem from './ContactItem';
import NextButton from '~widgets/NextButton';

export default {
  extends: ContactDialog,
  data() {
    return {
      max: 100,
    };
  },
  components: {
    ActivityActions,
    ContactItem,
    MessagesActivity,
    NextButton,
  },
  mounted() {
    this.$service.run('intimates/check');
  },
  computed: {
    initial: () => true,
    simple: () => false,
    contacts() {
      return this.$store.state.intimates.list;
    },
  },
  methods: {
    load() {
      this.$service
        .run('intimates/load', this.next)
        .then(() => {
          this.loaded();
        })
        .catch((error) => {
          this.failed(error);
        });
      this.amount = this.count;
      this.hope();
    },
    next() {
      this.$service.run('intimates/next', this.offset).then(() => {
        this.loaded();
      });
      this.hope();
    },
    remove(index) {
      this.$service.run('intimates/delete', index);
    },
    read(index) {
      this.$service.run('intimates/read', index);
    },
    splice(index) {
      this.$store.commit('intimates/delete', index);
    },
  },
};
</script>

<template>
  <div>
    <ActivityActions :caption="$t('Общение')" @close="close">
      <template slot="option">
        <div class="header-bar__button" @click="$router.push('/protect')">
          <i class="material-icons">&#xE53F;</i>
          <span class="header-bar__title">
            {{ $t('Защитить') }}
          </span>
        </div>
      </template>

      <div v-if="count">
        <div class="contact-list">
          <ContactItem
            v-for="(item, index) in contacts"
            :key="item.id"
            :item="item"
            :index="index"
            :quick="quick"
            @bun="bun"
            @read="read"
            @close="close"
            @remove="remove"
          />
        </div>

        <div class="contact-list__next">
          <NextButton
            :show="more"
            :ready="response"
            :hold="!response"
            :loader="true"
            @next="next()"
          />
        </div>
      </div>

      <div class="contact-list__alerts" v-if="sex == 1 && count && count < batch">
        <div class="alert alert-warning">
          Игнорируйте любые просьбы оплаты, предоплаты или пополнения баланса. Материальной помощи,
          оплаты билетов, аренды в кафе, ресторане и так далее. Так поступают только мошенники.
        </div>
        <div class="alert alert-danger">
          <b>Не отправляйте интимные фото</b>, если вы мало знакомы. Отправляйте только их или
          отправляйте только лицо. Вас будут шантажировать вашими же фотографиями или записью видео
          вашей мастурбации. Когда найдут вас в соцсетях по фотографии или номеру телефона.
        </div>
      </div>

      <BigIconPlaceholder icon="&#xE001;" text="Ошибка списка" v-else-if="error" />
      <BigIconPlaceholder icon="&#xE0E1;" text="Список пуст" v-else-if="empty" />

      <!-- <div class="activity__content" v-else>
        <div class="hint-info">

        </div>
        Воспользуйтесь Поиском, отправьте первое сообщение,
        это и будет предложением знакомства.
      </div> -->
      <MessagesActivity @close="dialog = false" :humanId="dialog" :title="title" v-if="dialog" />

      <router-view @close="$root.goBack()" @sended="splice" />
    </ActivityActions>
  </div>
</template>

<i18n>
{
  "en": {
    "Общение": "Messages",
    "Защитить": "Protect"
  },
  "kz": {
    "Общение": "Байланыс",
    "Защитить": "Қорғаңыз"
  },
  "ua": {
    "Общение": "Спілкування",
    "Защитить": "Захистити"
  }
}
</i18n>

<style lang="less"></style>
