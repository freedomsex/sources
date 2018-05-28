export default {
  beforeRouteLeave(to, from, next) {
    console.log('Leave:', [to, from]);
    next();
  },
  data() {
    return {
      toSlow: false,
      slowTime: 3,
      process: false,
      labels: {
        load: false,
        error: false,
      },
      timerLoader: null,
      timerProcess: null,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    back(back) {
      /* eslint no-param-reassign: "off" */
      back = (back === undefined) ? this.$route.meta.back : back;
      back = (back === undefined) ? this.$route.query.back : back;
      console.log('back:', back);
      if (back === undefined) {
        this.$router.push('/');
      } else {
        this.$router.push(back);
      }
    },
    loadStart(second) {
      this.labels.load = true;
      second = second || this.slowTime;
      this.timerLoader = setTimeout(() => {
        this.toSlow = true;
      }, second * 1000);
    },
    loadStop() {
      this.labels.load = false;
      clearTimeout(this.timerLoader);
      this.toSlow = false;
    },
    errorStart() {
      this.labels.error = true;
    },
    errorStop() {
      this.labels.error = false;
    },
    processTimeout(second) {
      this.process = true;
      clearTimeout(this.timerProcess);
      second = second || this.slowTime;
      this.timerProcess = setTimeout(() => { this.process = false; }, second * 1000);
    },
  },
};