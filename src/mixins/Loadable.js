export default {
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
    loadStart(second) {
      this.labels.load = true;
      const time = second || this.slowTime;
      this.timerLoader = setTimeout(() => {
        this.toSlow = true;
      }, time * 1000);
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
      const time = second || this.slowTime;
      this.timerProcess = setTimeout(() => {
        this.process = false;
      }, time * 1000);
    },
  },
};
