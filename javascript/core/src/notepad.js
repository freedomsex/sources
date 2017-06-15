
// -- Блокнот ---
var notepad = {

    note_block: null,
    last_click: null,
    disibled:   0,
    create:     0,

    init: function ()
    {
        if (device.width() < 1000)
        {
            notepad.disibled = 1;
        }

        notepad.disibled = get_cookie ('note_vis')*1 ? 1 : 0;   //////////////////////////

        active_textarea = $('#mess_text_val');
        notepad.note_block = $('.notepad');


        $('textarea').click( function ()
        {
            active_textarea = this;
            notepad.show();
        });

        $('#notepad_on').click( function (){ notepad.toggle_disable('on'); notepad.show('force'); });

        $('.close',notepad.note_block).click( function (){ notepad.hide(); });
        $('.post',notepad.note_block).click( function (){ notepad.toggle_disable('off'); notepad.hide(); });
        $('.bunn',notepad.note_block).click( function (){ notepad.toggle_disable('off'); notepad.hide(); });

    } ,

    hide: function ()
    {
        notepad.note_block.hide('fade');
    } ,

    show: function (force)
    {
        if (!notepad.disibled)
        if (force || (active_textarea && notepad.last_click != active_textarea))
        {
            if (notepad.create)
            {
                notepad.note_block.show('fade');
                notepad.last_click = active_textarea;        /////////////////////////////
            }
            else
                notepad.ajax_load();
        }
    } ,

    toggle_disable: function (vset)
    {
        if (vset == 'off') notepad.disibled = 1;
        if (vset == 'on' ) notepad.disibled = 0;

        if (vset)
        {
            set_cookie ('note_vis', notepad.disibled, 259200);   /////////////////////////
        }
    } ,

    ajax_load: function ()
    {
         simple_hash();
         $.get( '/ajax/load_notepad.php', { hash: hash }, notepad.on_load);
    } ,

    remind: function ()
    {
        var top  = storage.load('notepad_top');
        var left = storage.load('notepad_left');

        if (top  && top  < 40) top  = 50;
        if (left && left < 10) left = 10;
        if (top  > (device.height()-300)) top  = 0;
        if (left > (device.width()-300))  left = 0;

        if (top)  notepad.note_block.css("top",top+'px');
        if (left) notepad.note_block.css("left",left+'px');

    } ,

    on_load: function (data)
    {
           if( data.indexOf('div') > 0 )
           {
               notepad.create = 1;
               $('.notes',notepad.note_block).html( data );
               $('.note_line',notepad.note_block).click(
                   function ()
                   {
                        let text = $(this).text();
                        $(active_textarea).val(text).focus();
                        if ($(active_textarea).attr('id') == 'mess-text-area') {
                            FormMess.message = text;
                        } // TODO: жэсточайшы костыль для блокнота

//                        // Trigger a DOM 'input' event
//                        var evt = document.createEvent('HTMLEvents');
//                        evt.initEvent('input', false, true);
//                        elt.dispatchEvent(evt);
                   }
               );

               notepad.remind();

               notepad.note_block.draggable
               (
                   {
                       handle:'.title',
                       stop: function(event, ui)
                       {
                           var topOff = $(this).offset().top - $(window).scrollTop();
                           notepad.note_block.css("top",topOff);
                           storage.save('notepad_top',topOff);
                           storage.save('notepad_left',$(this).offset().left);
                       }
                   }
               );

               notepad.show();
           }

    }






}

