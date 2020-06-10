<script>
import AccountComponent from '@freedomsex/account-component';
import ActivityActions from '~activities/ActivityActions';
import CONFIG from '~config/index';

export default {
  props: ['humanId'],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    human() {
      return this.$store.state.human;
    },
    profile() {
      return `${CONFIG.PROTECT_LINK}/admin/closed/#/user-profile/${this.human.id}`;
    },
  },
  mounted() {
    console.log('AccountComponent');
    this.load();
  },
  methods: {
    loaded() {
      this.loading = false;
      console.log(this.human);
    },
    hope() {
      setTimeout(() => {
        this.loading = false;
      }, 4 * 1000);
    },
    load() {
      this.loading = true;
      this.hope();
      this.$service.run('human/load', this.humanId).then(() => {
        this.loaded();
      }).catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
  },
  components: {
    ActivityActions,
    AccountComponent,
  },
};
</script>

<template>
  <ActivityActions caption="Анкета" type="wrapped" @close="$emit('close')">
    <AccountComponent
     :human="human"
     :key="humanId"
     v-if="human"/>

    <div v-if="$store.state.token.roles.includes('ROLE_ADMINISTRATOR')">
      <a class="btn btn-default btn-sm" :href="profile" target="_blank">
        <span aria-hidden="true" class="glyphicon glyphicon-wrench"></span>
        Открыть профиль
      </a>
    </div>
  </ActivityActions>
</template>

<style lang="less">
</style>
