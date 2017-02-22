
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
        sex: null,
    },
    mounted: function () {
        this.uid = uid;
        this.tid = tid;
        this.sex = user_sex;
    },
    computed: Vuex.mapState({
        config: state => state.formMess,
        photo:  state => state.formMess.sendPhoto,
        intimate: state => state.formMess.intimate,
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
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken}
            };
            let data = {
                photo: this.photo.alias,
                id: this.tid,
                captcha_code: this.code
            };
            axios.post('/mailer/post/', data, config).then((response) => {
                this.handler(response.data);
            }).catch((error) => {
                console.log(error);
            });
            this.process = true;


        	// TODO: почти готово, ждем сообщений
            //Vue.http.headers.common['Authorization'] = 'Bearer ' + get_cookie('jwt');
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
        sendSex(sex) {
        	// TODO: перекинуть на общее хранилище и внешний компонент
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken}
            };
            axios.post('/option/sex/', { sex }, config).then((response) => {
            	if (response.data.sex) {
            		this.sex = response.data.sex;
            		user_sex = this.sex;
            		this.sendMessage();
            	}
            	this.process = false;
            }).catch((error) => {
                console.log(error);
            });
            this.process = true;
        },
        handler(response) {
        	if (!response.saved && response.error) {
        		if (response.error == 'need_captcha') {
                    $('.form-message__captcha-img').get(0).src = '/secret_pic.php?hash='+hash;
        			this.approve = false;
        		}
        	} else {
                MessList.messages.unshift(response.message);
                // TODO: старая зависимость
                $('#mess_shab_text_block').hide();
                giper_chat.timer_cut();
            	this.reset();
                console.log(response);
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

