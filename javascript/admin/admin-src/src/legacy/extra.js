import $ from 'jquery';

const ExtraButton = {
  ajax: {
    post(id) {
      $.post('/userinfo/setbun/', { id });
      ExtraButton.option.saved(id);
      ExtraButton.option.added(id);
    },
  },
  action: {
    click() {
      ExtraButton.ajax.post($(this).data('num'));
      $(this).off('click');
      return false;
    },

  },
  option: {
    saved(id) {
      $(`#extra_saved${id}`).show('fade');
      $(`#extra_saved${id}`).delay(2000).hide('fade');
    },
    added(id) {
      const bun = $(`#extra_bun${id}`).text() * 1;
      $(`#extra_bun${id}`).text(bun + 20);
      $(`#extra_add${id}`).text('+');
    },
  },
};
// alert('load');

$(document).ready(() => {
  $('.extra_button.blue').on('click', ExtraButton.action.click);
});
