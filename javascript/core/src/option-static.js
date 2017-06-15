
// -- Статический блок опций ---
var option_static = {

    click_enable: null,
    active_elem: null,
    timer_id: null,
    form: null,

    init: function ()
    {
        if (!$('.option_static').length)
            return null;

        $('.option_static').each( function (i,elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('click',option_static.action.preload);
                elem.data('active',1);
            }
        });                    // alert(1)
        $('#option-static__close').on('click',option_static.action.close);
    } ,

    ajax: {
        load: function (option) {
            option_static.option.form.trash();
            $('#option-static__container')
                .load( '/static/htm/option_' + option + '.html',option_static.ajax.on_load);
        } ,
        on_load: function (data) {           // alert(visited.list)
            if (data) {
                option_static.action.router();
                option_static.action.show_form();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        } ,
        save: function (tid) {
            //$.get( '/contact/addvisit/'+ uid +'/', { tid: tid }, visited.ajax.parse_save);
        }
    } ,

    option: {
        loader: {
            show: function () {
                $('#option-static__loader').delay(1000).show('fade');
            } ,
            hide: function () {
                $('#option-static__loader').clearQueue();
                $('#option-static__loader').hide('fade');
            }
        } ,
        form: {
            show: function () {
                $('#option-static__container').show('fade');
            } ,
            hide: function () {
                $('#option-static__container').hide('fade');
            } ,
            trash: function () {
                $('#option-static__container').empty();
            }
        } ,
        block: {
            show: function () {
                $('#option-static').show('fade');
            } ,
            hide: function () {
                $('#option-static').hide('fade');
            }
        }
    } ,

    action: {
        show_form: function () {
           option_static.option.form.show();
           option_static.option.loader.hide();
        } ,
        preload: function () {
            var option = $(this).data('option');
            option_static.form = option;
            if (option) {
               option_static.ajax.load(option);
               option_static.option.block.show();
               option_static.option.loader.show();
            }
        } ,
        close: function () {
           option_static.option.form.hide();
           option_static.option.loader.hide();
           option_static.option.block.hide();
        } ,
        router: function () {
           if (option_static.form == 'login') {
               option_login.init();
           }
           if (option_static.form == 'contact') {
               option_contact.init();
           }
           if (option_static.form == 'age') {
               option_age.init();
           }
           if (option_static.form == 'name') {
               option_name.init();
               name_suggest.init();
               city_suggest.init();
           }
           if (option_static.form == 'city') {
               option_city.init();
               city_suggest.init();
           }
           if (option_static.form == 'hidepass') {
               option_email.init();
           }
           if (option_static.form == 'anketa') {
               option_anketa.init();
               name_suggest.init();
               city_suggest.init();
           }
           if (option_static.form == 'chlogin') {
               option_chlogin.init();
           }
           if (option_static.form == 'introduce') {
               option_intro.init();
               name_suggest.init();
               city_suggest.init();
           }
           if (option_static.form == 'desire') {
               option_tag.init();
               tag_suggest.init();
           }
        }
    }
}

