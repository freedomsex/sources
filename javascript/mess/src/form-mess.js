
var FormMess = new Vue({
    el: '#message_post_form',
    data: {
        show: true,
    },
    methods: {
        upload: function() {
            OptionStaticViewer.upload.show = true;
        },
    },
});


// -- Форма отправки сообщения ---
var form_mess = {

    show_form: function () {
        $('#message_post_form').show('blind');
    },

    hide_form: function () {
        $('#message_post_form').hide('blind');
    }

}

