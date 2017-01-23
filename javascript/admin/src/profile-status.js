
Vue.http.options.emulateJSON = true;

var profile_status = new Vue({
    el: '#profile-status',
    data: {
        isSuggestShow: 0,
        suggest: [
            {text: 'Предложение оплаты услуг, вирт за деньги, проституция, мошенничество, шантаж, спам', style: 'bg_ored'},
            {text: 'Фото из интернета, парень под видои девушки, вымышленные данные, обман, фейк', style: 'bg_ored'},
            {text: 'Оскорбления, хамство, троллинг, грубые сообщения, жалобы на интим фото, провокации', style: 'bg_oyel'},
            {text: 'Пишет всем подряд, игнорирует анкетные данные, гей пишет натуралам, рассылки', style: 'bg_oyel'},
            {text: 'Ложно, отклоненные жалобы, причина не ясна, ссора, выяснение отношений', style: 'bg_ogrn'},
        ],
        text:  'Статус не установлен',
        style: '',
        user:  '',
    },
    created: function () {
        this.user  = $('#profile-status__text').data('user');
        var text = $('#profile-status__text').text().trim();
        if (text) {
            this.text  = text;
        }
    },
    mounted: function () {
        this.set_style();
    },
    methods: {
        variant: function (event) {
            this.isSuggestShow  = true;
        },
        post: function () {
            if (this.user) {
                this.$http.post('/userinfo/setcomm/', {
                    id: this.user,
                    text: this.text
                });
            }
        },
        save: function (i) {
            this.text = this.suggest[i].text;
            this.style = this.suggest[i].style;
            this.isSuggestShow = false;
            this.post();
        },
        set_style: function () {
            if (this.text == this.suggest[0].text) {
                this.style = this.suggest[0].style;
            };
            if (this.text == this.suggest[1].text) {
                this.style = this.suggest[0].style;
            };
            if (this.text == this.suggest[2].text) {
                this.style = this.suggest[2].style;
            };
            if (this.text == this.suggest[3].text) {
                this.style = this.suggest[2].style;
            };
            if (this.text == this.suggest[4].text) {
                this.style = this.suggest[4].style;
            };
        }
    }
});
