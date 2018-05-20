import Vue from 'vue';
import $ from 'jquery';

Vue.directive('resized', {
  bind(el) {
    $(el).on('change', () => {
      el.style.height = '1px';
      const fix = el.scrollHeight > 40 ? 3 : 0;
      el.style.height = `${el.scrollHeight + fix}px`;
    });
  },
  componentUpdated(el) {
    $(el).change();
  },
});
