
var FormMess = new Vue({
    el: '#message_post_form',
    store,
    data: {
    	message: '',
        show: true,
        approve: false,
        uid: null,
        tid: null,
    },
    mounted: function () {
        this.uid = uid;
        this.tid = tid;
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
        },
        sendMessage() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken}
            };
            let data = {
                mess: this.message,
                id:   this.tid,
                re:   repl,
                captcha_code: $('.code',giper_chat.mess_block).val(),
                hash: hash
            };
            axios.post('/mailer/post/', data, config).then((response) => {
                this.$emit('remove', this.index);
            }).catch((error) => {
                console.log('error');
            });

	          //  disabled_with_timeout( $('.post',giper_chat.mess_block), 5);
	          //  giper_chat.timer_cut();

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

