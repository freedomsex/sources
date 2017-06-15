
// Навигация с помошью клавиатуры
var navigate = {

    enable:  0,

    init: function ()
    {
        $(document).on('keydown', function() {
            navigate.through(event);
        });

    } ,

    // Отправка сообщения по CTRL + Enter
    post_form: function (event, formElem)
    {
        if((event.ctrlKey) && ((event.keyCode == 10)||(event.keyCode == 13))) {
            formElem.submit();
        }
    } ,

    // Навигация с помошью стрелок + CTRL
    through: function (event)
    {
        if (window.event)
            event = window.event;

        if (event.ctrlKey)
        {
            var link = null;
            var href = null;
            switch (event.keyCode ? event.keyCode : event.which ? event.which : null)
            {
                case 0x25:
                    link = '#previous_page';
                    break;
                case 0x27:
                    link = '#next_page';
                    break;
                case 0x26:
                    link = '#up_page';
                    break;
                case 0x28:
                    link = '#down_page';
                    break;
                case 0x24:
                    link = '#home_page';
                    break;
            }
            if($('a').is(link))  // alert($(link).attr('href')); return false;
                document.location = $(link).attr('href');
        }
    }

}

