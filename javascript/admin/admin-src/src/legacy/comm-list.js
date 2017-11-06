import $ from 'jquery';

// -- Список комментариев ---
const CommList = {
  ajax: {
    up() {
      const id = $(this).data('num');
      $(this).off('click');
      $.post('/develop/modcomm/', { id, mod: 1 });
      CommList.actions.mod(id, 1);
    },

    down() {
      const id = $(this).data('num');
      $(this).off('click');
      $.post('/develop/modcomm/', { id, mod: -1 });
      CommList.actions.mod(id, -1);
    },
  },

  actions: {
    mod(id, mod) {
      const rank = ($(`#comm_rank_${id}`).text() * 1) + mod;
      const vote = ($(`#comm_vote_${id}`).text() * 1) + 1;
      $(`#comm_rank_${id}`).text(rank);
      $(`#comm_vote_${id}`).text(vote);
    },
  },
};

$(document).ready(() => {
  $('.comm_up').on('click', CommList.ajax.up);
  $('.comm_down').on('click', CommList.ajax.down);
});
