<script>
import ActivityActions from '~activities/ActivityActions';
import InfoDialog from '~dialogs/InfoDialog';
import ContactDialog from './ContactDialog';
import ContactItem from './ContactItem';

export default {
  extends: ContactDialog,
  mounted() {
    this.$store.dispatch('initial/CHECK');
  },
  computed: {
    initial: () => true,
    simple: () => true,
    contacts() {
      // console.log(this.$store);
      return this.$store.state.contacts.initial.list;
    },
  },
  methods: {
    load() {
      this.$store.dispatch('initial/LOAD').then(() => {
        this.loaded();
      });
      this.amount = this.count;
      this.hope();
    },
    next() {
      this.$store.dispatch('initial/NEXT', this.offset).then(() => {
        this.loaded();
      });
      this.reset();
    },
    remove(index) {
      this.$store.dispatch('initial/DELETE', index);
    },
    read(index) {
      console.log('initial=read', index);
      this.$store.dispatch('initial/READ', index);
    },
    splice(index) {
      // console.log(this.$store); return;
      this.$store.commit('initial/delete', index);
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
  components: {
    ActivityActions,
    ContactItem,
    InfoDialog,
  },
};
</script>

<template>
  <div>
    <ActivityActions @close="close">
      <span slot="caption">Знакомства</span>

      <template slot="option">
        <div class="menu-button" @click="$router.push('/settings/search')">
          <i class="material-icons">&#xE8B9;</i>
          <span class="menu-button__title">
            Настроить
          </span>
        </div>
      </template>

      <div class="contact-list" v-if="count">
        <ContactItem v-for="(item, index) in contacts" :key="index"
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
      <div class="activity__content" v-else>
        <div class="hint-info">
          Здесь будет список поступивших вам предложений знакомства.
          Список отправленных посмотреть нельзя.
        </div>
        Все ответы приходят во вкладку "Общение". Кружочки могут светиться без причины.
        Пишите сообщения - это Бесплатно, а значит всё честно и реально!
      </div>

      <div class="contact-list__next">
        <div class="btn btn-default btn-sm"
         @click="next()"
         :disabled="response == false"
         v-show="more">
          Следующие
        </div>
      </div>

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

<style lang="less">
</style>
