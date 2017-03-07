
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
        dirt: false,
        tid: null,
    },
    mounted: function () {
        this.tid = tid;

        $('#mess-text-area').on('keypress', (event, el) => {
            if((event.ctrlKey) && ((event.keyCode == 10) || (event.keyCode == 13))) {
                this.sendMessage();
            }
        });

    },
    watch: {
        message: function() { this.isDirt(); },
    },
    computed: Vuex.mapState({
        config: state => state.formMess,
        photo:  state => state.formMess.sendPhoto,
        intimate: state => state.formMess.intimate,
        user: state => state.user,
    }),
    methods: {
    	reset() {
            this.cancelPhoto();
    		this.show = true;
    		this.process = false;
            this.approve = true;
            this.message = '';
    	},
        isDirt: _.debounce(function() {
            let word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i;
            this.dirt = word.test(this.message) ? true : false;
            return this.dirt;
        }, 700),
        upload() {
            store.commit('optionDialog', 'upload');
        },
        cancelPhoto() {
        	store.commit('sendPhoto', {photo: null, alias: null});
        },
        send() {
            this.photo.alias ? sendPhoto() : sendMessage();
        },
        sendPhoto() {
        	// TODO: почти готово, ждем сообщений
            //Vue.htt*p.headers.common['Authorization'] = 'Bearer ' + get_cookie('jwt');
            // let data = {
            // 	alias: this.photo.alias
            // };
            // this.$http.post('http://'+api_photo+'/api/v1/users/'+tid+'/sends', data).then(function (response) {
            //     //console.log(response.body);
            // });
            // window.location.reload();
        },
        sendMessage() {
            // TODO: убрать из формы старое говно
            let data = {
                id: this.tid,
                captcha_code: this.code
            };
            if (this.photo.alias) {
                data['photo'] = this.photo.alias;
            } else {
                data['mess'] = this.message;
                data['re'] = this.reply;
            }
            apiMessages.send(data, this.handler, null);
            this.process = true;
        },
        sendSex(sex) {
            apiUser.saveSex({ sex }, this.sendMessage, this.error);
            this.process = true;
        },
        handler(response) {
        	if (!response.saved && response.error) {
        		if (response.error == 'need_captcha') {
                    this.captcha();
        		}
                this.error();
        	} else {
                this.sended(response);
        	}
            this.process = false;
        },
        sended(response) {
            //MessList.messages.unshift(response.message);
            MessList.reload();
            // TODO: старая зависимость
            $('#mess_shab_text_block').hide();
            giper_chat.timer_cut();
            this.reset();
            //console.log(response);
            this.cancelPhoto();
        },
        captcha() {
            $('.form-message__captcha-img').get(0).src = '/secret_pic.php?hash='+hash;
            this.approve = false;
        },
        error() {
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

