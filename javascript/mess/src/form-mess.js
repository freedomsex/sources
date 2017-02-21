
var FormMess = new Vue({
    el: '#message_post_form',
    store,
    data: {
    	message: '',
        reply:  '',
        code:  '',
        show: true,
        process: false,
        approve: true,
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
    	reset() {
    		this.show = true;
    		this.process = false;
            this.approve = true;
            this.message = '';
    	},
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
                id: this.tid,
                re: this.reply,
                captcha_code: this.code
            };
            axios.post('/mailer/post/', data, config).then((response) => {
            	this.handler(response.data);
            }).catch((error) => {
                console.log(error);
            });
            this.process = true;
        },
        handler(response) {
        	if (response.error) {
        		if (response.error == 'captcha') {
        			this.approve = false;
        		}
        	} else {
                MessList.messages.unshift(response.message);
                // TODO: старая зависимость
                giper_chat.timer_cut();
            	this.reset();
        	}
            this.process = false;
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

