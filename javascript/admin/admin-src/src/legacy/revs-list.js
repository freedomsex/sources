import $ from 'jquery';

// -- Список отзывов ---
const RevsList = {

  ajax: {

    up() {
      const id = $(this).data('num');
      $(this).off('click');
      $.post('/security/modrevs/', { id, mod: 1 });
      RevsList.actions.mod(id, 1);
      RevsList.actions.toggleUp(id);
    },

    down() {
      const id = $(this).data('num');
      $(this).off('click');
      $.post('/security/modrevs/', { id, mod: -1 });
      RevsList.actions.mod(id, -1);
      RevsList.actions.toggleDown(id);
    },

  },

  actions: {
    mod(id, mod) {
      const rank = ($(`#revs_rank_${id}`).text() * 1) + mod;
      const vote = ($(`#revs_vote_${id}`).text() * 1) + 1;
      $(`#revs_rank_${id}`).text(rank);
      $(`#revs_vote_${id}`).text(vote);
      $(`#review-item-${id}`).data('voted', 1);
    },
    allBad() {
      $('.revs_down').filter(function () {
        const id = $(this).data('num');
        const voted = $(`#review-item-${id}`).data('voted');
        return voted ? 0 : 1;
      }).click();
    },
    toggleUp(id) {
      $('.revs_up').filter(function () { return $(this).data('num') == id; }).toggleClass('btn-primary btn-success disabled');
    },
    toggleDown(id) {
      $('.revs_up').filter(function () { return $(this).data('num') == id; }).toggleClass('btn-primary btn-default');
      $('.revs_down').filter(function () { return $(this).data('num') == id; }).toggleClass('btn-default btn-danger disabled');
    },

  },
};

$(document).ready(() => {
  $('#review-list .revs_up').on('click', RevsList.ajax.up);
  $('#review-list .revs_down').on('click', RevsList.ajax.down);
  $('#review-all-bad').on('click', RevsList.actions.allBad);
});
