
// -- Изменение информации о контакте ---
var edit_cont = {
      
    init: function ()
    {
        $('#edit_cont_btn').click( function (){ edit_cont.show(); });
        $('#edit_human_btn').click( function (){ edit_cont.save(); });

    } ,

    show: function ()
    {
        var print_name = human_name ? human_name : auto_gen.name(human_sex);

        if ($('#human_print_name').text().search(/(Парень|Девушка)/) < 0)
            print_name = $('#human_print_name').text();

        $('#edit_human_name').val(print_name);

        if (!$('human_data_block').is('#edit_cont_elem'))
            $('#human_data_block').append($('#edit_cont_elem'));

        $('#edit_cont_elem').toggle('blind');
        $('#human_data_print').toggle('blind');      //alert (123);
    } ,

    save: function ()
    {
        human_name = $('#edit_human_name').val();

        edit_cont.update();
        edit_cont.show();
        edit_cont.send();

    } ,

    send: function ()
    {
        $.post( '/contact/extra/', { tid: tid, age: '', name: human_name, city: '' } );
        //cont_list.option.updater.show();
    } ,

    update: function ()
    {
        $('#human_print_name').text(human_name);
    }

}

