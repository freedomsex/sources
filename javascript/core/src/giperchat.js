
var active_textarea ;             ////////////////////////////////////////////////////////
var giper_chat = {

    open_mess:  0,
    idle_round: 0,

    count_unread: 0,
    cascade: 0,

    round_time: 0,
    round_open: 1,

    timer_id:   null,
    mess_block: null,

    mess_stock: [],

    prev_title: null,

    init: function ()
    {
        if (device.width() > 1200) {
            giper_chat.mess_stock = storage.array.load('mess_stock');
            giper_chat.remind();
        }
            $('<div id="block_timer" class="timer">').appendTo('body');
        giper_chat.timer_set();
        giper_chat.new_round();

        $('#giper_reply .post').on('click', giper_chat.reply_show);
        // Установка текста по умолчанию
        if (storage.load('reply_all'))
            $('#giper_reply textarea').val(storage.load('reply_all'));
        giper_chat.prev_title = document.title;
    } ,

    set_unread: function ()
    {
        if (giper_chat.count_unread > 0)
        {
            $('#menu_message_unread b').text(giper_chat.count_unread);
            $('#menu_message_unread').show();
            $('#menu_message').attr('title','Новых сообщений ' + giper_chat.count_unread);
        } else {
            $('#menu_message_unread').text('');
            $('#menu_message_unread').hide();
            $('#menu_message').attr('title','Новых сообщений нет');
        }
    } ,

    on_timer: function ()
    {
        giper_chat.title_blink ();

        if (giper_chat.round_open && giper_chat.cascade == 0)
            giper_chat.round_time--

        //if (giper_chat.cascade != 0)console.log('on_timer cascade: ' +giper_chat.cascade)

        giper_chat.trace();

        if (giper_chat.round_time < 1)
            giper_chat.new_round();
    } ,

    new_round: function ()
    {
        giper_chat.timer_stop();
        giper_chat.ajax_new();
    } ,

    trace: function ()
    {
        $('#block_timer').text(giper_chat.round_time);
    } ,

    ajax_new: function ()
    {
        simple_hash();
        giper_chat.round_open = 0;

        $.get('/ajax/new_mess.php',{ hash: hash }, giper_chat.on_load)
          .always( function() { giper_chat.round_open = 1; } );
    } ,

    on_load: function (data)
    {
        if (data) {
            var mess = json.parse(data);
            giper_chat.route_xz(mess);
            giper_chat.count_unread = mess.count_unread          ////////////////////////////////////
            giper_chat.set_unread();                             ////////////////////////////////////
        }
        setTimeout( function (){ giper_chat.timer_set(); },5000 );
    } ,

    route_xz: function (mess)
    {
        if (device.width() > 1200 && mess.type && giper_chat.open_mess < 9) {                               /* */
            if (mess.type == 'air_user' || mess.type == 'new_client') {
//                visited.action.load_cache();
//                if (visited.list.length) {
//                    if (visited.list.indexOf(mess.user+'') >= 0) {
//                        giper_chat.reply_enable();
//                        giper_chat.idle_round = 0;
//                        setTimeout( function (){ giper_chat.timer_set(); },5000 );
//                        return 0;
//                    }
//                }
            }
            giper_chat.mess_stock.push(mess);
            giper_chat.stock.store();
            giper_chat.new_message(mess);
        }
    } ,

    reply_enable: function ()
    {
        if (giper_chat.cascade == 0)
        {
            if (giper_chat.open_mess > 2)
                $('#giper_reply').show('blind');
            if (giper_chat.open_mess > 5)
                $('#giper_reply textarea').show('blind');
        }

        if (giper_chat.open_mess < 3)
            $('#giper_reply').hide('blind');
        if (giper_chat.open_mess == 0)
            giper_chat.cascade = 0;

                // console.log('re cascade: ' +giper_chat.cascade)

    } ,

    reply_show: function ()
    {
        var textarea = $('#giper_reply textarea');
        if (!$(textarea).is(":visible"))
        {
            active_textarea = textarea;
            textarea.show('blind');
            textarea.focus();
            notepad.show();                                          ////////////////////////////////////
        }
        else
            giper_chat.reply_all();

    } ,

    reply_all: function ()
    {
        var textarea = $('#giper_reply textarea');
        var text = textarea.val();

        if (text)
        {
            var block_mess = $('#giper_stock').children().filter(':first');
            giper_chat.cascade = text;
            storage.save('reply_all',text);
            $('textarea',block_mess).val(text);
            $('.post',block_mess).click();
            textarea.hide('blind');
        }
        giper_chat.reply_enable();
    } ,

    new_message: function (val)
    {                              //  elem.appendChild();
        giper_chat.open_mess++
        giper_chat.reply_enable();

        let new_block = giper_chat.create_message(val);

        new_block.prependTo($('#giper_stock'));

        new_block.show('blind');

        setTimeout( function (){ $('.sound',new_block).show(); },500 );

        giper_chat.idle_round = 0;
               // giper_chat.mess_stock.push(val);
               // giper_chat.stock.store();

    } ,

    remind: function ()
    {
        jQuery.each (giper_chat.mess_stock,function(i,val)
        {
            giper_chat.new_message(val);
        });
    } ,

    stock: {

        store: function ()
        {
             storage.array.save('mess_stock',giper_chat.mess_stock);
        } ,

        remove: function (num)
        {
            var del = null;
            jQuery.each (giper_chat.mess_stock,function(i,val)
            {
                if (val.mess_id == num)
                    del = i;
            });

            if(del || del == 0)
            {                               //alert($('.new_message').length + '  <> ' + giper_chat.mess_stock.length)
                giper_chat.mess_stock.splice(del,1);
                if ((giper_chat.mess_stock.length - $('.new_message').length) > 1)
                    giper_chat.mess_stock = [];
                giper_chat.stock.store();
            }
        }

    } ,


    create_message: function (val)
    {
        if (!val.reply) val.reply = '';

        //return 0;

        var new_block = $('#new_message_ex').clone()
         .attr( 'id', val.type+'_'+val.mess_id )  //.css("display","none")
         .data('number',val.mess_id)
         .data('user',val.user)
         .addClass( val.type );

         $('.mess_text',new_block).html(val.text);       // click( function (){ location.href =  });
         $('.close',new_block).click(
             function ()
             {
                 giper_chat.close_message($(new_block));
             }
         );

         if( val.type == 'new_message' || val.type == 'old_message' )
         {
             if( val.type == 'old_message' )
             {
                 $('.title',new_block).text('Есть сообщение без ответа');
                 $('.sound',new_block).remove();
             }

             $('.post',new_block).click( function (){ giper_chat.post_mess(val); });

             $('textarea',new_block).val( val.reply );
             $('.user_name',new_block).text(val.name+':');
             $('.history',new_block).click(
             function ()
             {
                 giper_chat.follow_message(val.user,val.mess_id);
             });

             $('.bunn',new_block).click( function ()
             {
                 giper_chat.ajax_bun(val.user,val.mess_id,val.type);
                 giper_chat.open_mess--;
             });

             if( val.type == 'new_message' )
                 $('#contact_update').show('fade');
         }

         if( val.type == 'server_mess' )
         {
             $('.sound',new_block).remove();
             $('.title',new_block).text( val.reply );
             $('.bunn',new_block).remove();
             $('.post',new_block).val('Хорошо');

             $('.post',new_block).click(
                 function ()
                 {
                     send_serv_mess($('#'+val.type+'_'+val.mess_id ),'tip_user_bun_close')
                 }
              );

              $('.history',new_block).text( 'Подробнее...' ) ;
              $('.history',new_block).attr( 'href','/блог/наказывайте-кого-следует/' ) ;
              $('.history',new_block).attr( 'target','_blank' ) ;
         }

         if( val.type == 'air_user' || val.type == 'new_client' )
         {
             if( val.type == 'air_user' )
                 $('.title',new_block).text('Сейчас на сайте');
             if( val.type == 'new_client' )
                 $('.title',new_block).text('Зарегистрировалась сегодня');

             $('.mess_text',new_block).html(val.age + ' ' + val.city + ' ' + val.text);

             $('.sound',new_block).remove();
             // var timer_air = setTimeout( function (){ close_message( $(new_block) ); open_mess--; },30000 );
             //$('.title',new_block).text( val.reply );
             $('.bunn',new_block).remove();
             $('.user_name',new_block).text(val.name+',');
             $('.user_name',new_block).text(val.name+',');
             $('.post',new_block).val('Написать');

             $('.post',new_block).click( function () { giper_chat.post_mess(val); });

             $('.history',new_block).text( 'Смотреть анкету' ) ;
             $('.history',new_block).click(
             function ()
             {
                 giper_chat.follow_message(val.user,val.mess_id);
             });

             if( val.type == 'new_client' ) {

             }
         }

         $(new_block).draggable( {
             handle:'.title',
             stop: function(event, ui)
             {
                 $('.sound',new_block).remove();

                 //alert ($(this).offset().left)

                 var topOff  = $(this).offset().top - $(window).scrollTop()
                 var leftOff = $(this).offset().left
                  $(this).css("top",topOff).css("left",leftOff).css("position","fixed")

                 $(this).appendTo( 'body' );
             }
         });  /**/

         return new_block;

    } ,

    close_message: function (elem)
    {
        $('.sound',elem).remove();
        elem.hide('blind');
        giper_chat.open_mess--;
        giper_chat.stock.remove(elem.data('number'));
        setTimeout( function (){ elem.remove(); },500 );
    } ,

    close_all: function (user)
    {                                          /*
        $('#giper_stock div').
        $('.sound',elem).remove();
        elem.hide('blind');
        giper_chat.open_mess--;
        giper_chat.stock.remove(elem.data('number'));
        setTimeout( function (){ elem.remove(); },500 ); */
    } ,

    follow_message: function (user,mess_id)
    {
        giper_chat.stock.remove(mess_id);
        location.href = '/'+user;
    } ,

    ajax_bun: function (user,mess_id,type)
    {
        giper_chat.close_message( $('#'+type+'_'+mess_id ) );
        $.post( "/mess/bun/", { id: mess_id, tid: user } );

    } ,

    timer_set: function ()
    {
        giper_chat.timer_stop();
        if (giper_chat.idle_round == 0) { giper_chat.round_time = 10;  } else
        if (giper_chat.idle_round == 1) { giper_chat.round_time = 10;  } else
        if (giper_chat.idle_round == 2) { giper_chat.round_time = 5;   } else
        if (giper_chat.idle_round == 3) { giper_chat.round_time = 25;  } else
        if (giper_chat.idle_round == 4) { giper_chat.round_time = 35;  } else
        if (giper_chat.idle_round > 11) { giper_chat.round_time = 300; } else
        if (giper_chat.idle_round > 4 ) { giper_chat.round_time = 60;  }

        giper_chat.idle_round++
        giper_chat.timer_id = window.setInterval ( 'giper_chat.on_timer()', 1000 );
        //console.log('таймер запущен: ' +giper_chat.round_time)

    } ,

    timer_stop: function ()
    {
        window.clearInterval(giper_chat.timer_id);
        //console.log('таймер остановлен: ' +giper_chat.cascade)
    } ,

    timer_cut: function ()
    {
        if (giper_chat.idle_round > 0 && giper_chat.round_time > 10)
            giper_chat.round_time = 10;
        giper_chat.idle_round = 0;
    } ,

    toggle_text: function ()
    {
        var textarea   = $('textarea',giper_chat.mess_block);
        var text_value = $(textarea).val();
        if (!$(textarea).is(":visible"))
        {
            active_textarea = textarea;            ///////////////////////////////////////
            $(textarea).show('blind');
            $(textarea).focus();
            notepad.show();                        ///////////////////////////////////////
            return 0;
        }

        return text_value

    } ,

    post_mess: function (val)
    {
        giper_chat.mess_block = $('#'+val.type+'_'+val.mess_id);     // alert( user )

        var text, repl

        if (giper_chat.cascade != 0)
        {
            text = giper_chat.cascade;
            repl = '';
        }
        else
        {
            text = giper_chat.toggle_text();
            repl = text
        }

        if (text)
        {
            simple_hash();

            $.post
            (
                "/mailer/post/",
                {
                    mess: text,
                    id:   val.user,
                    re:   repl,
                    captcha_code: $('.code',giper_chat.mess_block).val(),
                    hash: hash
                 },
                 giper_chat.on_post
             );

            disabled_with_timeout( $('.post',giper_chat.mess_block), 5);
            giper_chat.timer_cut();
        }

    } ,

    on_post: function (data)
    {                                // alert (data)
        if( !data ) return 0;
        var mess = JSON.parse( data );

        if( mess.error == 'captcha' )
        {
            $('textarea',giper_chat.mess_block).show('blind');
            $('.captcha_block',giper_chat.mess_block).show('blind');
            $('.captcha',giper_chat.mess_block).get(0).src = '/secret_pic.php?hash='+hash;
        }

        if( mess.saved == '1' )
        {
            giper_chat.idle_round = 0;

            $('#contact_update').show('fade');
            giper_chat.close_message(giper_chat.mess_block);

            notepad.hide();                 //////////////////////////////////////////////
            //visited.action.save(giper_chat.mess_block.data('user'));

            setTimeout( function ()
            {
               if (giper_chat.cascade != 0)
                   giper_chat.reply_all();
            },700 );
        }

        if( mess.error == 'reload' )
        {
            giper_chat.idle_round = 0;
            location.href = '/'+user+'?text='+text; //alert ('reload')
        }

        disabled_with_timeout( $('.post',giper_chat.mess_block), 0.05);

    } ,

    title_blink: function ()
    {
        if (giper_chat.count_unread == 0)
        {
            document.title = giper_chat.prev_title;
            return false ;
        }

        if( document.title != 'Вам сообщение!' )
        {
            document.title = 'Вам сообщение!' ;
        }
        else
            document.title = ' * * * * * * * * * * * * ' ;
    } ,

    post_serv: function (elem,value)
    {
        giper_chat.close_message( $(elem) );                   /*
        var param = {}; param[value] = 1;
         $.get( "/ajax/messages_load.php", param ); */
        set_cookie( 'user_bun', '1', 259200 );
    }

}

