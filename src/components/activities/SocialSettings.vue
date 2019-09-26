<script>
import ActivityActions from '~activities/ActivityActions';

export default {
  props: [],
  data() {
    return {
      contacts: {},
      virgin: true,
    };
  },
  mounted() {
    const {em, vk, ok, fb, go, sk, ph} = this.$store.state.user;
    this.contacts = {em, vk, ok, fb, go, sk, ph};
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
        this.$service.run('user/contacts', this.contacts);
      }
    },
  },
  components: {
    ActivityActions,
  },
};
</script>

<template>
  <ActivityActions caption="Контакты" type="wrapped" @close="close">
    <div class="activity-section">
      <div class="activity-section__title">Контакты, соцсети</div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="contacts.em" @change="deflower">
            У меня есть электронная почта
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="contacts.vk" @change="deflower">
            Есть страничка Вконтакте
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="contacts.ok" @change="deflower">
            Я есть в Одноклассниках
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="contacts.fb" @change="deflower">
            У меня страница на Фэйсбуке
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="contacts.go" @change="deflower">
            Имею Google+
          </label>
        </div>
    </div>
    <div class="activity-section">
      <div class="activity-section__title">Видеочат и телефон</div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="contacts.sk" @change="deflower">
            Видеозвонок, видеочат, скайп
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="contacts.ph" @change="deflower">
            Позвоню или дам номер телефона
          </label>
        </div>
    </div>
  </ActivityActions>
</template>
