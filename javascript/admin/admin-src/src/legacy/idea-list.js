import $ from 'jquery';

// -- Список контактов ---
const IdeaList = {

  ajax: {

    up() {
      const id = $(this).data('num');
      $(this).off('click');
      $.post('/develop/modidea/', { id, mod: 1 });
      IdeaList.actions.mod(id, 1);
    },

    down() {
      const id = $(this).data('num');
      $(this).off('click');
      $.post('/develop/modidea/', { id, mod: -1 });
      IdeaList.actions.mod(id, -1);
    },

  },

  actions: {

    mod(id, mod) {
      const rank = ($(`#idea_rank_${id}`).text() * 1) + mod;
      const vote = ($(`#idea_vote_${id}`).text() * 1) + 1;
      $(`#idea_rank_${id}`).text(rank);
      $(`#idea_vote_${id}`).text(vote);
    },

  },

  options: {

    updater: {

      show() {
        $('#contact_update').show('fade');
      },

      hide() {
        $('#contact_update').hide('fade');
      },
    },

  },
};

$('.rating_up').on('click', IdeaList.ajax.up);
$('.rating_down').on('click', IdeaList.ajax.down);
