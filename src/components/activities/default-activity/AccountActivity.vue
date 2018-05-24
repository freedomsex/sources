<script>
import ClosedActivity from '~closed-activity/ClosedActivity';
import AccountComponent from '~components/AccountComponent';

export default {
  props: ['humanId'],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    human() {
      return this.$store.state.search.human;
    },
  },
  mounted() {
    console.log('AccountComponent');
    this.load();
  },
  methods: {
    close() {
      this.$emit('close');
    },
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
      this.$store
        .dispatch('search/HUMAN', this.humanId)
        .then(() => {
          this.loaded();
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
  components: {
    ClosedActivity,
    AccountComponent,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
    <span slot="caption">Анкета</span>
    <AccountComponent
     :human="human"
     key="humanId"
     v-if="human"/>
  </ClosedActivity>
</template>

<style lang="less">
</style>
