import $ from 'jquery';

export default {
  width() {
    return $(window).width();
  },

  height() {
    return $(window).height(); // document
  },
};
