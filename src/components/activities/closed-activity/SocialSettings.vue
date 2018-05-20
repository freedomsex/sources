<script>
import Vuex from 'vuex';
import ClosedActivity from './ClosedActivity';

export default {
  props: [],
  data() {
    return {
      checkedContact: {
        em: 0,
        vk: 0,
        ok: 0,
        fb: 0,
        go: 0,
        sk: 0,
        ph: 0,
      },
      virgin: true,
    };
  },
  computed: Vuex.mapState({
    contacts(state) {
      return state.user.contacts;
    },
  }),
  mounted() {
    console.log('user', this.contacts);
    this.checkedContact = this.contacts;
  },
  methods: {
    close() {
      this.save();
      this.$emit('close');
    },
    deflower() {
      this.virgin = false;
    },
    save() {
      if (!this.virgin) {
        this.$store.dispatch('SAVE_CONTACTS', this.checkedContact);
      }
    },
  },
  components: {
    ClosedActivity,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
    <div class="activity-section">
      <div class="activity-section__title">Контакты, соцсети</div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="checkedContact.em" @change="deflower">
            У меня есть электронная почта
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="checkedContact.vk" @change="deflower">
            Есть страничка Вконтакте
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="checkedContact.ok" @change="deflower">
            Я есть в Одноклассниках
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="checkedContact.fb" @change="deflower">
            У меня страница на Фэйсбуке
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="checkedContact.go" @change="deflower">
            Имею Google+
          </label>
        </div>
    </div>
    <div class="activity-section">
      <div class="activity-section__title">Видеочат и телефон</div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="checkedContact.sk" @change="deflower">
            Видеозвонок, видеочат, скайп
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="checkedContact.ph" @change="deflower">
            Позвоню или дам номер телефона
          </label>
        </div>
    </div>
  </ClosedActivity>
</template>

<style lang="less">
</style>
