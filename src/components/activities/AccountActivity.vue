<script>
import AccountComponent from '@freedomsex/account-component';
import ActivityActions from '~activities/ActivityActions';

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
  </ActivityActions>
</template>

<style lang="less">
</style>
