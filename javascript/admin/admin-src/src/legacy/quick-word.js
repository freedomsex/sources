import $ from 'jquery';

const QuickWord = {
  show(title) {
    $('#reply_text').load(`/static/htm/admin/quick/${title}.html`);
  },
};

$(document).ready(() => {
  $('.quick_link').click(function () {
    QuickWord.show($(this).data('title'));
  });
});
