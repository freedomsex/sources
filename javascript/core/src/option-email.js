
var option_email = {

    init: function () {
        $('.option_email_button').off('click');
        $('.option_email_button').on('click',option_email.action.send_email);
        if (userinfo.data.email)
            $('.option_email_value').val(userinfo.data.email);
        option_email.ajax.load();
    } ,
    ajax: {
        load: function () {
            $.post('/sync/email/', option_email.ajax.on_load);
        },
        post: function (email) {
            $.post('/option/email/', { email: email }, option_email.ajax.on_save);
            userinfo.data.email = data.email;
            userinfo.action.set_email();
            option_static.action.close();
        },
        on_save: function (data) {
            profile_alert.option.show(json.parse(data));
        },
        on_load: function (data) {
            data = json.parse(data);
            if (data) {
                if (data.email != '') {
                    userinfo.data.email = data.email;
                    userinfo.action.set_email();
                }
            }
        }
    } ,
    action: {
        send_email: function () {
            option_email.ajax.post($('.option_email_value').val());
        }
    }
}

