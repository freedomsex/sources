
// -- Быстрые фотографии ---
var quick_photo = {

    init: function ()
    {
        quick_photo.ajax.load();
    } ,

    ajax: {

        load: function ()
        {
            // TODO: запустить быстрые фото. ВЫКЛЮЧЕНО !!!
            //$.get( '/ajax/load_pic.php',quick_photo.ajax.success);
        } ,

        success: function (data)
        {
            if (data.indexOf('div') > 0)
            {
                $('#micro_images_hint').html( data ) ;
                $( '.img_list_micro' ).click( function () {
                 location.href = '/mail.php?photo='+$(this).attr('alt')+'&id='+tid;
                });
                $('#send_photo_link').mouseover( function () {
                 $('#micro_images_block').show('fade');
                });

                $(document).mouseup(function (e)
                {
                    var container = $('#micro_images_block');
                    if (!container.is(e.target) // if the target of the click isn't the container...
                        && container.has(e.target).length === 0) // ... nor a descendant of the container
                    {
                        container.hide('fade');
                    }
                });
            }
        }

    }
}

