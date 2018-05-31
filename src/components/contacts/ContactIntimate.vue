<script>
import ActivityActions from '~activities/ActivityActions';
import MessagesActivity from '~default-activity/messages-activity/MessagesActivity';
import ContactDialog from './ContactDialog';
import SettingsInform from './SettingsInform';
import ContactItem from './ContactItem';

export default {
  extends: ContactDialog,
  data() {
    return {
      max: 100,
    };
  },
  mounted() {
    this.$store.dispatch('intimate/CHECK');
  },
  computed: {
    initial: () => true,
    simple: () => false,
    contacts() {
      return this.$store.state.contacts.intimate.list;
    },
  },
  methods: {
    load() {
      this.$store
        .dispatch('intimate/LOAD', this.next)
        .then(() => {
          this.loaded();
        })
        .catch((error) => {
          this.error = error;
        });
      this.amount = this.count;
      this.hope();
    },
    next() {
      this.$store.dispatch('intimate/NEXT', this.offset).then(() => {
        this.loaded();
      });
      this.hope();
    },
    remove(index) {
      console.log('imm=remove', index);
      this.$store.dispatch('intimate/DELETE', index);
    },
    read(index) {
      console.log('intimate=read', index);
      this.$store.dispatch('intimate/READ', index);
    },
    splice(index) {
      this.$store.commit('intimate/delete', index);
    },
  },
  components: {
    ActivityActions,
    ContactItem,
    MessagesActivity,
    SettingsInform,
  },
};
</script>

<template>
  <div>
    <ActivityActions @close="close">
      <span slot="caption">Общение</span>

      <div class="menu-user__navbar-right" slot="option">
        <div class="navbar-button" @click="$router.push('/protect')">
          <i class="material-icons">&#xE53F;</i>
          Защитить
        </div>
      </div>

      <div class="contact-list" v-if="count">
        <ContactItem v-for="(item, index) in contacts"
          :key="index"
          :item="item"
          :index="index"
          :quick="quick"
          @bun="bun"
          @read="read"
          @close="close"
          @remove="remove"/>
      </div>
      <div class="activity__content" v-else>
        <div class="hint-info">
          Здесь будет список ваших контактов, сообщений, диалогов.
          Чтобы начать общение, нужно Познакомиться.
        </div>
        Воспользуйтесь Поиском, отправьте первое сообщение,
        это и будет предложением знакомства.
      </div>

      <div class="contact-list__next">
        <div class="btn btn-default btn-sm"
         @click="next()"
         :disabled="response == false"
         v-show="more">
          Следующие
        </div>
      </div>
      <MessagesActivity
       @close="dialog = false"
       :humanId="dialog"
       :title="title"
       v-if="dialog"/>

      <router-view @sended="splice"/>
    </ActivityActions>
  </div>
</template>

<style lang="less">
</style>
