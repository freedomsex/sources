
// -- Список сообщений ---
var mess_list = {

    mess_is_load: 0,


    mail_pages: 0,
    view_confirm: 0,

    init: function ()
    {
        mess_list.ajax_load(tid);
        $('#mail_pages_next').click( function (){ mess_list.ajax_load(tid); } );
    } ,

    list_init: function ()
    {
        $('.message_list_block').hover(
            function () {
              mess_list.option.show($('.bunned_mess',this).data('number')) ;
              mess_list.option.enable = false;
            },
            function () {
              if (mess_list.option.frize)
                  return false;

              mess_list.option.hide($('.bunned_mess',this).data('number')) ;
              mess_list.option.enable = true;
            }
        );

        $('.message_list_block').click(function() {
            if (mess_list.option.enable && !mess_list.option.frize)
                mess_list.option.togg($('.bunned_mess',this).data('number')) ;

        });

        mess_list.option.pages_show();
        $('.message_list_save.red_link').show(); // Показать опции первого сообщения                            //////////////////////////////////


    } ,

    ajax_load: function (user)
    {
        $.get
        (
            '/ajax/messages_load.php',
            {
                id: user,
                next: mess_list.mail_pages,
                confirm_view: mess_list.view_confirm
            } ,
            mess_list.on_load
        )
        .fail(mess_list.on_error);

    } ,


    on_load: function (data)
    {
        mess_list.view_confirm = 0;
        mess_list.mess_is_load = 1;
        mess_list.mail_pages  += 15;

        //if( reload )
        //   mess_list.mail_pages = 0;

        mess_list.hide_loader();

        if (data.indexOf('div') > 0)
        {
            //if( reload )
            //    $('#mail_messages_block').empty();

            lock_user.show_link();
            $('#mail_messages_block').append( data );

            mess_list.list_init();

            mess_list.option.pages_show();

            $('#mail_messages_block').show('blind');

            var first_mess =  $('.message_list_save:first').data('number');
            var mess_id = $(this).data('number');

            $('.bunned_mess').on('click',function() { mess_list.action.bun_mess($(this).data('number')); });
            $('.remove_mess').on('click',function (){ mess_list.action.remove_mess($(this).data('number')); });
            $('.img_reload').on('click',function () { mess_list.action.image_reload($(this).data('number')); });

            return 0;
        }

        if( !data )
        {                          // alert ( $('.message_list_block').length );
            if (!$('.message_list_block').length)
            {
                quick_mess.ajax_load();
                notice_post.show();
            }
            $('#mail_pages_next').hide('blind');
            return 0;
        }

        if( data.indexOf('error') > 0 )
        {
            var mess = JSON.parse( data );
            if( mess.error == 'hold' )
            {
                mess_list.action.show_bad_alert( mess.text );
                return 0;
            }
        }

    } ,

    on_error: function ()
    {
        setTimeout( function (){ mess_list.ajax_load(tid); },7000 );
        mess_list.show_loader(1);                              //////////////////////////////////
    } ,


    show_loader: function (img)
    {
       $('#mess_loader').show('blind');
       if (img)
           $('#mess_loader img').show('fade');
    } ,

    hide_loader: function ()
    {
       $('#mess_loader').hide();
    } ,

    action: {

        badshow: function ()
        {                             // alert(1);
            mess_list.view_confirm = 1;
            mess_list.mail_pages = 0;

            mess_list.ajax_load(tid);

            mess_list.show_loader(1);
            mess_list.action.badalert_hide();
        } ,


        show_bad_alert: function (text)
        {
            mess_list.hide_loader();
            $('#mail_bad_text_alert input').on('click',mess_list.action.badshow);
            $('#mail_bad_text_alert .link_underline').hide(); //on('click',function(){cont_list.action.delete_user(tid);});
            $('#mail_bad_text_alert span.text').text( text );
            $('#mail_bad_text_alert').show('fade');
        } ,


        image_reload: function (id)
        {
            var url = $( '#img_'+ id ).get(0).src.replace("/protect/","/origin/") ;
            $( '#img_'+ id ).get(0).src = url ;
        } ,

        ajax_recove: function (mess_id)
        {
            $.post("/mess/recover/", { tid: tid, id: mess_id });
        } ,

        ajax_remove: function (mess_id)
        {
            $.post("/mess/delete/", { tid: tid, id: mess_id });
        } ,

        ajax_bun: function (mess_id)
        {
            $.post("/mess/bun/", { tid: tid, id: mess_id } );
        } ,

        badalert_hide: function ()
        {
            $('#mail_bad_text_alert').hide('blind');
        } ,

        mess_hide: function (mess_id)
        {
            $('#message_block_'+mess_id).hide('blind');
        } ,

        mess_show: function (mess_id)
        {
            $('#message_block_'+mess_id).show('blind');
        } ,

        remove_mess: function (mess_id)
        {
            mess_list.action.ajax_remove(mess_id);
            mess_list.action.removed_show(mess_id);
            mess_list.action.mess_hide(mess_id);
        } ,

        bun_mess: function (mess_id)
        {
            mess_list.action.ajax_bun(mess_id);
            mess_list.action.removed_show(mess_id);
            mess_list.action.mess_hide(mess_id);
            abuse_list.showButton();
        } ,

        recove_mess: function (mess_id)
        {
            mess_list.action.ajax_recove(mess_id);
            mess_list.action.removed_hide(mess_id);
            mess_list.action.mess_show(mess_id);
        } ,

        removed_hide: function (mess_id)
        {
            $('#remove_message_'+mess_id).hide('blind');
        } ,

        removed_show: function (mess_id)
        {
            if (!$('div').is('#remove_message_'+mess_id))
            {
                var new_remove = $('#recover_mess_block_ex').clone()
                 .attr( 'id', 'remove_message_'+mess_id ).css("display","none")
                 .insertBefore($('#message_block_'+mess_id));
                $('span',new_remove).on('click',function () { mess_list.action.recove_mess(mess_id); });
            }

            $('#remove_message_'+mess_id).show('blind');
        }

    } ,

    option:  {

        enable: true,
        frize: false,

        pages_show: function ()
        {
             if ($('.message_list_block').length > 14)
             {
                 $('#mail_pages').show('blind');
                 mess_list.option.hint(0);
             }
             else
                 mess_list.option.hint(1);
        } ,

        hint: function (show)
        {
            if (show)
            {
                $('#mess_option_hint').show();
            }
            else
                $('#mess_option_hint').hide();
        } ,

        bunn_all: function (lock)
        {
            if (lock)
            {
                mess_list.option.red_link(lock,0);
                mess_list.option.frize = true;
                mess_list.option.show();
            }
            else
            {
                mess_list.option.red_link(lock,0);
                mess_list.option.frize = false;
                mess_list.option.hide();
            }
        } ,

        red_link: function (lock,num)
        {
            var elem = num ? $('.bunned_mess','#message_block_'+num) : $('.bunned_mess');

            if (lock)
            {
                elem.addClass('red_link');
            }
            else
                elem.removeClass('red_link');
        } ,

        togg: function (num)
        {
            $('.message_list_save','#message_block_'+num).toggle('fade') ;
        } ,

        hide: function (num)
        {
            var elem = num ? $('.message_list_save','#message_block_'+num) : $('.message_list_save');
            elem.hide();
        } ,

        show: function (num)
        {
            var elem = num ? $('.message_list_save','#message_block_'+num) : $('.message_list_save');
            elem.show('fade',100);
        }
    }

}

