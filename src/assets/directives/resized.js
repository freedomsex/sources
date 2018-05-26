import Vue from 'vue';

Vue.directive('resized', {
  bind(el) {
    el.addEventListener('keyup', () => {
      el.style.height = '1px';
      const fix = el.scrollHeight > 40 ? 0 : 0;
      el.style.height = `${el.scrollHeight + fix}px`;
    });
  },
});
