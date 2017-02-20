
// -- Список жалоб на пользователя ---

Vue.http.options.emulateJSON = true;

Vue.component('abuse-form', {
    template: '#abuse-form',
    props: [
        'show'
    ],
    data: function () {
        return {
            disabled: false,
            isEditorShow:  0,
            isSuggestShow: 1,
            suggest: [
                'Предложение оплаты услуг, вирт за деньги, проституция',
                'Мошенничество, развод на деньги, шантаж, вымогательство',
                'Фото из интернета, вымышленные данные, обман, фейк',
                'Оскорбления, хамство, троллинг, грубые сообщения',
                'Рассылает интим фото, спамит или провоцирует',
            ],
            text: '',
        }
    },
    created: function () {
        //console.log("abuse_form Created");
    },
    methods: {
        choiceText: function (event) {
            this.text = event.target.innerHTML;
            this.isEditorShow = true;
            this.isSuggestShow = false;
        },
        post: function (event) {
            simple_hash();
            disabled_with_timeout( $('.abuse-form__btn'), 10);
            this.$http.post('/abuse/send', {
                id: tid,
                text: this.text,
                captcha: '',
                hash: hash
            }).then(function(data) {
                this.response(data.body);
            });
        },
        cancel: function () {
            this.$emit('cancel');
            this.isSuggestShow = true;
        },
        response: function (data) {
            console.log(data);
            disabled_with_timeout( $('.abuse-form__btn'), 0.1);
            if (!data) return 0;
            var mess = json.parse(data);
            if (mess.saved) {
                this.success(mess.text);
            } else {
                confirm_block_dn.show_confirm(mess.text);
            }
        },
        success: function (text) {
            console.log('ok');
            confirm_block_dn.show_confirm(text);
            this.cancel();
        }
    }
});

var abuse_list = new Vue({
    el: '#abuse-list-component',
    data: {
        abuseStatus:   0,
        isFormShow:    0,
        isListShow:    0,
        isButtonShow:  0,
    },
    mounted: function () {
        //console.log(abuse_form.mess());
    },
    methods: {
        showForm: function (event) {
            if (!this.isFormShow) {
                this.isFormShow = true;
            } else {
                this.hideForm();
            }
            this.isButtonShow  = false;
        },
        hideForm: function (event) {
            this.isFormShow    = false;
            this.isButtonShow  = false;
            //this.isSuggestShow = true;
        },
        showList: function (event) {
            this.isListShow = !this.isListShow;
        },
        showButton: function () {
            if (!this.isFormShow) {
                this.isButtonShow = true;
            }
        },
    }
});
