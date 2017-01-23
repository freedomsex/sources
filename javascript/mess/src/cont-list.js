
// -- Список контактов ---
var cont_list = {

    acttab: 'inline',
    count: 0,
    clear: 1,
    inlist: 0,
    buffer: [],

    init: function ()
    {
        $('#contact_update').on('click',cont_list.action.update);
        $('#list_load_next').on('click',cont_list.action.next);
        $('#list_show_optn').on('click',cont_list.option.delets.show);

        $('#list_load_inline').on('click',cont_list.action.tab.inline);
        $('#list_load_online').on('click',cont_list.action.tab.online);
        $('#list_load_faline').on('click',cont_list.action.tab.faline);
        $('#list_load_deline').on('click',cont_list.action.tab.deline);

        cont_list.ajax.load();
    } ,

    ajax: {

        load: function ()
        {
            simple_hash();
            $.get( '/contact/list/'+ cont_list.acttab +'/', { inlist: cont_list.count, hash: hash }, cont_list.ajax.success)
             .fail(cont_list.ajax.error);
        } ,

        success: function (data)
        {
            var mess = [];
            if (data) {
                mess = JSON.parse(data);
            }


            cont_list.inlist = $('#list_contact_block .message_listbox_link').length;

            if (cont_list.clear)
                cont_list.action.clear();

            if (cont_list.count) {                              //  alert(cont_list.buffer.length)
                $.each(cont_list.buffer, cont_list.action.new_line);
                cont_list.buffer.length = 0;
                if(mess.length)
                    $.each(mess, cont_list.action.buff_cont);
            } else {
                $.each(mess, cont_list.action.new_line);
            }

            cont_list.count = $('#list_contact_block .message_listbox_link').length;
            if (cont_list.count > 2)
                $('#tip_list_users_block').hide('blind');

            cookie_storage.set_cookie('list_count',cont_list.count,259200);
            cont_list.action.show();
            cont_list.clear = 1;
        } ,

        error: function ()
        {
            setTimeout(cont_list.ajax.load,7000);
        } ,

        del_user: function (id)
        {
            $.post("/human/delete/",{ tid: id });
        } ,

        rec_user: function (id)
        {
            $.post( "/human/unlock/", { tid: id } );
        } ,

        favorite: function (id)
        {
            $.post( "/human/favorite/", { tid: id } );
        } ,

        general: function (id)
        {
            $.post( "/human/general/", { tid: id } );
        }

    } ,

    action: {

        show: function ()
        {
            $('#list_contact_block').show('blind');
        } ,

        favorite: function (id)
        {
            if ($('#listbox_line_'+id).data('fav')*1) {
                cont_list.option.favorite.passive(id);
                cont_list.ajax.general(id);
            } else {
                cont_list.option.favorite.active(id);
                cont_list.ajax.favorite(id);
            }
        } ,

        delete_user: function (id)
        {
            $('#listbox_line_'+id +' .message_listbox_link').hide('blind');
            $('#listbox_line_'+id +' .listbox_recover').show('blind');
            cont_list.option.updater.show();
            cont_list.ajax.del_user(id);
        } ,

        recover_user: function (id)
        {
            $('#listbox_line_'+id+' .message_listbox_link').show('blind');
            $('#listbox_line_'+id+' .listbox_recover').hide('blind');
            cont_list.ajax.rec_user(id);
        } ,

        clear: function ()
        {
            $('#list_contact_block').empty();
            cont_list.buffer.length = 0;
        } ,

        update: function ()
        {
            cont_list.count = 0;
            cont_list.ajax.load();
            cont_list.option.refresh();
        } ,

        next: function ()
        {
            cont_list.clear = 0;
            cont_list.ajax.load();
            cont_list.option.refresh();
        } ,

        buff_cont: function (i,val)
        {                                         // alert(val.name);
            cont_list.buffer.push(val);
        } ,

        new_line: function (i,val)
        {
            if (i >= 5) {
                cont_list.action.buff_cont(i,val);
                return 0;
            }

            var new_block = $('#listbox_line_ex').clone()
             .attr('id', 'listbox_line_'+val.cont_id)  //.css("display","none")
             .click( function(){  location.href = '/'+val.cont_id;  } )
             .data('num', val.cont_id)
             .data('fav', val.favorite)
             .appendTo("#list_contact_block")
                                                        // alert ( val.style );
            $('.icon_list',new_block).addClass(val.style);
            $('.user_name',new_block).text(val.name);

                $('.cont_list_fav_user',new_block).click( function(){
                  cont_list.action.favorite(val.cont_id);  return false; } );
                $('.cont_list_del_user',new_block).click( function(){
                  cont_list.action.delete_user(val.cont_id);  return false; } );
                $('.listbox_recover',new_block).click( function(){
                  cont_list.action.recover_user(val.cont_id);  return false; } );

            if (cont_list.acttab == 'deline') {
                $('.cont_list_fav_user',new_block).remove();
                $('.cont_list_del_user',new_block).remove();
            }


            if (val.favorite*1)
                cont_list.option.favorite.active(val.cont_id);

            cont_list.option.updater.hide();

            if (val.photo)
            {
                $('img',new_block).get(0).src = val.photo ;
                $('img',new_block).show('fade');
            }
            if (val.unread*1)
            {
                $('.unread_count',new_block).text('('+val.unread+')') ;
            }
        } ,

        tab: {

            show: function (tab) {
                if (tab != cont_list.acttab) {
                     cont_list.acttab = tab;
                     cont_list.count  = 0;
                     cont_list.ajax.load();
                }
                cont_list.option.refresh();
                cont_list.action.tab.active();
            } ,

            active: function () {
                $('.listbox_tab').removeClass('active');
                $('#list_load_'+ cont_list.acttab).addClass('active');
            } ,

            inline: function () {
                cont_list.action.tab.show('inline');
            } ,

            faline: function () {
                cont_list.action.tab.show('faline');
            } ,

            deline: function () {
                cont_list.action.tab.show('deline');
            } ,

            addition: function () {

            }
        }

    } ,

    option: {

        refresh: function () {
            cont_list.option.updater.hide();
            cont_list.option.delets.hide();
            cont_list.option.favorite.show();
        } ,

        updater: {

            show: function ()
            {
                $('#contact_update').show('fade');
            } ,

            hide: function ()
            {
                $('#contact_update').hide('fade');
            }
        } ,

        delets: {

            show: function ()
            {
                $('.cont_list_del_user').toggle('fade');
                $('.cont_list_fav_user').toggle('fade');
            } ,

            hide: function ()
            {
                $('.cont_list_del_user.touch_option').hide('fade');
            }
        } ,

        favorite: {

            active: function (id)
            {
                $('#listbox_line_'+id +' .cont_list_fav_user i').addClass('favorite');
                $('#listbox_line_'+id).data('fav',1);
            } ,

            passive: function (id)
            {
                $('#listbox_line_'+id +' .cont_list_fav_user i').removeClass('favorite');
                $('#listbox_line_'+id).data('fav',0);
            } ,

            show: function ()
            {
                $('.cont_list_fav_user').show('fade');
            } ,

            hide: function ()
            {
                $('.cont_list_fav_user').hide('fade');
            }
        }

    }
}

