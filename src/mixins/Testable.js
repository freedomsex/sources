export default {
  data() {
    return {
      //
    };
  },
  methods: {
    partOfUsersShow() {
      const {uid} = this.$store.state.token;
      const lastDigit = String(uid).substr(-1, 1);
      return ['0', '1', '2', '3', '4', '5', '6'].includes(lastDigit);
    },
  },
};
