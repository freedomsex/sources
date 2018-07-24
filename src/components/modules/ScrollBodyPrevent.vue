<script>
export default {
  data: () => ({
    name: 'scroll-body-prevent',
    initialized: false,
    top: null,
  }),
  beforeMount() {
    this.initialized = this.exists();
    this.top = this.getTop();
  },
  mounted() {
    // Костыли для отключения прокрутки страницы на фоне
    if (!this.initialized) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${this.top}px`;
    }
  },
  destroyed() {
    if (!this.exists()) {
      document.body.removeAttribute('style');
      window.scrollTo(0, this.top);
    }
  },
  methods: {
    exists() {
      return document.getElementsByClassName(this.name).length;
    },
    getTop() {
      if (typeof window.pageYOffset !== 'undefined') {
        return window.pageYOffset;
      }
      const B = document.body;
      let D = document.documentElement;
      D = (D.clientHeight) ? D : B;
      return D.scrollTop;
    },
  },
};
</script>

<template>
  <div :class="name"></div>
</template>
