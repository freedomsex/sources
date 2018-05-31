<script>
import AccountComponent from '~components/AccountComponent';
import ActivityActions from '../ActivityActions';

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
      this.$store
        .dispatch('human/load', this.humanId)
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
    ActivityActions,
    AccountComponent,
  },
};
</script>

<template>
  <ActivityActions type="closed" @close="$emit('close')">
    <span slot="caption">Анкета</span>
    <AccountComponent
     :human="human"
     key="humanId"
     v-if="human"/>
  </ActivityActions>
</template>

<style lang="less">
</style>
