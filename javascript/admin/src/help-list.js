
// -- Список отзывов ---
var help_list = {

    init: function ()
    {
        $('#help-list .revs_up').on('click', help_list.ajax.up);
        $('#help-list .revs_down').on('click', help_list.ajax.down);
        $('#help-all-bad').on('click', help_list.actions.allBad);
    } ,
    ajax: {
        send: function (id, mod) {
            $.post( '/security/sethelp/', { id: id, mod: mod } );
            help_list.actions.mod(id, mod);
        },
        up: function () {
            var id  = $(this).data('num');
            $(this).off('click');
            help_list.ajax.send(id, 1);
            help_list.actions.toggleUp(id);
        },
        down: function (){
            var id  = $(this).data('num');
            $(this).off('click');
            help_list.ajax.send(id, -1);
            help_list.actions.toggleDown(id);
        }
    },
    actions: {
        mod: function (id,mod) {
            var rank = $('#revs_rank_'+id).text() * 1 + mod;
            var vote = $('#revs_vote_'+id).text() * 1 + 1;
            $('#revs_rank_'+id).text(rank);
            $('#revs_vote_'+id).text(vote);
            $('#review-item-'+id).data('voted', 1);
        },
        allBad: function () {
            $('.revs_down').filter(function () {
                var id = $(this).data('num');
                var voted = $('#review-item-'+id).data('voted');
                return voted ? 0 : 1;
            }).click();
        },
        toggleUp: function (id) {
            $('.revs_up').filter(function () {return $(this).data('num') == id;}).toggleClass('btn-primary btn-success disabled');
        },
        toggleDown: function (id) {
            $('.revs_up').filter(function () {return $(this).data('num') == id;}).toggleClass('btn-primary btn-default');
            $('.revs_down').filter(function () {return $(this).data('num') == id;}).toggleClass('btn-default btn-danger disabled');
        },
    }
}

