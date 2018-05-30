export default {
  methods: {
    autoCity() {
      if (!this.$store.state.user.city) {
        const {city} = global.defaultSettings;
        if (city) {
          this.$store.dispatch('SAVE_CITY', city);
        }
      }
    },
    autoAge() {
      if (!this.$store.state.user.age) {
        let {up, to} = global.defaultSettings;
        up = this.$store.state.search.up || up;
        to = this.$store.state.search.to || to;
        let age;
        if (up && to) {
          age = Math.round((up + to) / 2);
        } else {
          age = Math.max(up, to);
        }
        if (age) {
          this.$store.dispatch('SAVE_AGE', age);
        }
      }
    },
  },
};
