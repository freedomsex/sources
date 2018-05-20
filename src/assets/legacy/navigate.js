import $ from 'jquery';

// Навигация с помошью клавиатуры
const navigate = {
  enable: 0,

  init() {
    $(document).on('keydown', (event) => {
      navigate.through(event);
    });
  },

  // Отправка сообщения по CTRL + Enter
  post_form(event, formElem) {
    if ((event.ctrlKey) && ((event.keyCode == 10) || (event.keyCode == 13))) {
      formElem.submit();
    }
  },

  // Навигация с помошью стрелок + CTRL
  through(event) {
    // if (window.event) {
    //   { event } = window;
    // }

    if (event.ctrlKey) {
      let link = null;
      const code = event.keyCode || event.which || null;
      switch (code) {
        case 0x25:
          link = '#previous_page';
          break;
        case 0x27:
          link = '#next_page';
          break;
        case 0x26:
          link = '#up_page';
          break;
        case 0x28:
          link = '#down_page';
          break;
        case 0x24:
          link = '#home_page';
          break;
        default:
          link = '#home_page';
          break;
      }
      if ($('a').is(link)) { // alert($(link).attr('href')); return false;
        document.location = $(link).attr('href');
      }
    }
  },
};

$(document).ready(() => {
  navigate.init();
});
