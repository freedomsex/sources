<script>
import ActivityActions from '~activities/ActivityActions';
import InfoDialog from '~dialogs/InfoDialog';
import ContactDialog from './ContactDialog';
import ContactItem from './ContactItem';
import NextButton from '~widgets/NextButton';

export default {
  extends: ContactDialog,
  components: {
    ActivityActions,
    ContactItem,
    InfoDialog,
    NextButton,
  },
  mounted() {
    this.$service.run('initials/check');
  },
  computed: {
    initial: () => true,
    simple: () => true,
    contacts() {
      // console.log(this.$store);
      return this.$store.state.initials.list;
    },
  },
  methods: {
    load() {
      this.$service.run('initials/load').then(() => {
        this.loaded();
      }).catch((error) => {
        this.failed(error);
      });
      this.amount = this.count;
      this.hope();
    },
    next() {
      this.$service.run('initials/next', this.offset).then(() => {
        this.loaded();
      });
      this.reset();
    },
    remove(index) {
      this.$service.run('initials/delete', index);
    },
    read(index) {
      console.log('initial=read', index);
      this.$service.run('initials/read', index);
    },
    splice(index) {
      // console.log(this.$store); return;
      this.$store.commit('initials/delete', index);
    },
    idle(data) {
      let result = false;
      if (data.user) {
        const {sex, city: where, age} = data.user;
        const {sex: who, city} = this.$store.state.user;
        const {up, to, any} = this.$store.state.search;

        if (who == sex) {
          result = true;
        }
        if (city != where && !any) {
          result = true;
        }
        if (up && up > age) {
          result = true;
        }
        if (to && to < age) {
          result = true;
        }
      }
      return result;
    },
    accept() {
      this.$store.commit('accepts/settings');
    },
  },
};
</script>

<template>
  <div>
    <ActivityActions :caption="$t('Знакомства')" @close="close">

      <template slot="option">
        <div class="header-bar__button" @click="$router.push('/settings/search')">
          <i class="material-icons">&#xE8B9;</i>
          <span class="header-bar__title">
            {{$t('Настроить')}}
          </span>
        </div>
      </template>

      <div v-if="count">
        <div class="contact-list">
          <ContactItem v-for="(item, index) in contacts" :key="item.human_id"
          :item="item"
          :index="index"
          :idle="idle(item)"
          quick="true"
          @bun="bun"
          @read="read"
          @close="close"
          @accept="modals.acceptSettings = true"
          @remove="remove"/>
        </div>

        <div class="contact-list__next">
          <NextButton
          :show="more"
          :ready="response"
          :hold="!response"
          :loader="true"
          @next="next()"/>
        </div>
      </div>

      <div class="contact-list__alerts" v-if="sex === 1 && count && count < batch">
        <div class="alert alert-warning">
          <b>Девушки не напишут вам сами</b>, так поступают только мошенники.
          Отправляйте жалобы на них. Сохраняйте особую осторожность при общении,
          если девушка начинает диалог сама.
        </div>
        <div class="alert alert-danger">
          <b>Игнорируйте просьбы перейти в мессенджер</b>, соцсеть, скайп, телеграм.
          Если такая просьба поступает в самом начале общения, это мошенники.
        </div>
      </div>

      <BigIconPlaceholder icon="&#xE001;" text="Ошибка списка" v-else-if="error"/>
      <BigIconPlaceholder icon="&#xE87E;" text="Список пуст" v-else-if="empty"/>

      <!-- <div class="activity__content" v-else>
        <div class="hint-info">
          Здесь будет список поступивших вам предложений знакомства.
          Список отправленных посмотреть нельзя.
        </div>
        Все ответы приходят во вкладку "Общение". Кружочки могут светиться без причины.
        Пишите сообщения - это Бесплатно, а значит всё честно и реально!
      </div> -->


      <InfoDialog v-if="modals.acceptSettings"
       @close="modals.acceptSettings = false"
       @confirm="accept">
        <span slot="title">Удобные знакомства</span>
        Настройте знакомства для более комфортного общения.
        Нажмите "Настройки" или "Настроить поиск" чтобы
        уточнить ваши параметры.
        Неподходящие знакомства отмечаются особым образом.
      </InfoDialog>

    </ActivityActions>
    <router-view @close="$root.goBack()" @sended="splice"/>
  </div>
</template>

<i18n>
{
  "en": {
    "Знакомства": "Dating",
    "Настроить": "Customize"
  },
  "kz": {
    "Знакомства": "Танысу",
    "Настроить": "Теңшеу"
  },
  "ua": {
    "Знакомства": "Знайомства",
    "Настроить": "Налаштувати"
  }
}
</i18n>

<style lang="less">
</style>
