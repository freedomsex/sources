
var FormMess = new Vue({
    el: '#message_post_form',
    store,
    data: {
        show: true,
    },
    computed: Vuex.mapState({
        config: state => state.formMess,
        photo:  state => state.formMess.sendPhoto
    }),
    methods: {
        upload: function() {
            store.commit('viewUpload', true);
        },
        cancelPhoto() {
        	store.commit('sendPhoto', {photo: null});
        },
        sendPhoto() {
        	// TODO: почти готово, ждем сообщений
            Vue.http.headers.common['Authorization'] = 'Bearer ' + get_cookie('jwt');
            // let data = {
            // 	alias: this.photo.alias
            // };
            // this.$http.post('http://'+api_photo+'/api/v1/users/'+tid+'/sends', data).then(function (response) {
            //     //console.log(response.body);
            // });
            this.cancelPhoto();
            // window.location.reload();
        }
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

