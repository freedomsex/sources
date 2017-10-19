'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var json = {

    parse: function parse(str) {
        var result = null;
        try {
            result = JSON.parse(str);
        } catch (e) {}

        return result;
    },

    encode: function encode(str) {
        return JSON.stringify(str);
    }
};

var cookie_storage = {

    enabled: 0,

    init: function init() {},

    get_cookie: function get_cookie(name) {
        var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        if (results) return unescape(results[2]);else return null;
    },

    del_cookie: function del_cookie(name) {
        var expires = new Date(); // получаем текущую дату 
        expires.setTime(expires.getTime() - 1000);
        document.cookie = name + "=; expires=" + expires.toGMTString() + "; path=/";
    },

    set_cookie: function set_cookie(name, val, time) {
        var expires = new Date();
        expires.setTime(expires.getTime() + 1000 * 60 * time); // минут
        document.cookie = name + "=" + val + "; expires=" + expires.toGMTString() + "; path=/";
    },

    get_data: function get_data(name) {
        return json.parse(get_cookie(name));
    },

    set_data: function set_data() {}

};

function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results) return unescape(results[2]);else return null;
}

function del_cookie(name) {
    var expires = new Date(); // получаем текущую дату
    expires.setTime(expires.getTime() - 1000);
    document.cookie = name + "=; expires=" + expires.toGMTString() + "; path=/";
}
function set_cookie(name, val, time) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 1000 * 60 * time); // минут
    document.cookie = name + "=" + val + "; expires=" + expires.toGMTString() + "; path=/";
}

var device = {

    init: function init() {},

    width: function width() {
        return $(window).width();
    },

    height: function height() {
        return $(window).height(); //document                               
    }

};

function disabled_with_timeout(elem, time) {
    elem.prop("disabled", true);
    setTimeout(function () {
        elem.prop("disabled", false);
    }, time * 1000);
}

// -- Получить новый хэш ---
function getTimestamp() {
    var now = new Date();
    return now.getTime();
}

var hash;
function simple_hash() {
    hash = getTimestamp();
}

function disabled_with_timeout(elem, time) {
    elem.prop("disabled", true);
    setTimeout(function () {
        elem.prop("disabled", false);
    }, time * 1000);
}

// -- Хранилище ---
var storage = {

    enable: 0,

    init: function init() {
        if (storage.is_enable()) {
            storage.enable = 1;
        }
    },

    is_enable: function is_enable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    save: function save(key, val) {
        if (storage.enable) {
            localStorage.setItem(key, val);
        }
    },

    load: function load(key, def) {
        var result = def ? def : null;

        if (storage.enable && localStorage.getItem(key)) {
            result = localStorage.getItem(key);
        }

        return result;
    },

    array: {

        load: function load(key) {
            var result = [];
            var value = null;

            value = storage.load(key);
            value = json.parse(value);
            if (value) result = value;

            return result;
        },

        save: function save(key, val) {
            storage.save(key, json.encode(val));
        },

        add: function add(key, val) {}
    }
};

storage.init();

var AccountActivity = Vue.component('account-activity', {
    props: ['humanId'],
    data: function data() {
        return {
            loading: false
        };
    },

    computed: {
        human: function human() {
            return this.$store.state.search.human;
        }
    },
    mounted: function mounted() {
        this.load();
    },

    methods: {
        close: function close() {
            this.$emit('close');
        },
        loaded: function loaded() {
            this.loading = false;
            console.log(this.human);
        },
        hope: function hope() {
            var _this = this;

            setTimeout(function () {
                return _this.loading = false;
            }, 4 * 1000);
        },
        load: function load() {
            var _this2 = this;

            this.loading = true;
            this.hope();
            store.dispatch('search/HUMAN', this.humanId).then(function (response) {
                _this2.loaded();
            }).catch(function (error) {
                console.log(error);
                _this2.loading = false;
            });
        }
    },
    template: '#account-activity'
});

Vue.component('account-component', {
    props: ['human'],
    data: function data() {
        return {
            loading: false
        };
    },

    computed: {
        age: function age() {
            return this.human.age ? moment.duration(this.human.age, "years").humanize() : null;
        },
        tags: function tags() {
            return 'tags' in this.human ? this.human.tags : [];
        },
        social: function social() {
            var _human = this.human,
                em = _human.em,
                vk = _human.vk,
                ok = _human.ok,
                fb = _human.fb,
                go = _human.go;

            if (em || vk || ok || fb || go) {
                return { em: em, vk: vk, ok: ok, fb: fb, go: go };
            }
            return null;
        },
        interact: function interact() {
            var _human2 = this.human,
                ph = _human2.ph,
                sk = _human2.sk;

            if (ph || sk) {
                return { ph: ph, sk: sk };
            }
            return null;
        },
        figure: function figure() {
            var figure = this.human.anketa ? this.human.anketa.figure : null;
            var result = figure;
            switch (figure) {
                case 2:
                    result = 'спортивного';break;
                case 3:
                    result = 'обычного';break;
                case 5:
                    result = 'полного';break;
                case 6:
                    result = 'худого';break;
            }
            return result;
        },
        hold: function hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        who: function who() {
            var result = 'Парня или девушку ';
            if (this.human.who) {
                result = this.human.who == 1 ? 'Парня ' : 'Девушку ';
            }
            if (this.human.up || this.human.to) {
                result += ' в возрасте ';
                result += this.human.up ? ' от ' + this.human.up : '';
                result += this.human.to ? ' до ' + this.human.to : '';
                result += ' лет ';
            }
            return result;
        },
        ago: function ago() {
            var last = this.human.last;

            var result = 'Онлайн';
            if (last > 2592000) {
                result = null;
            } //else
            if (last > 777) {
                result = moment.duration(0 - last, "seconds").humanize(true);
            }
            return result;
        },
        search: function search() {
            city = this.human.city ? this.human.city + '/' : '';
            if (this.human.who == 1) {
                who = 'Парни/';
            } else if (this.human.who == 2) {
                who = 'Девушки/';
            } else who = '';
            if (this.human.up && this.human.up == this.human.to) {
                years = 'возраст/' + this.human.up + '/';
            } else if (this.human.up && this.human.to) {
                years = 'возраст/' + this.human.up + '/' + this.human.to + '/';
            } else if (this.human.up && !this.human.to) {
                years = 'возраст/от/' + this.human.up + '/';
            } else if (!this.human.up && this.human.to) {
                years = 'возраст/до/' + this.human.to + '/';
            } else years = '';
            return '/' + city + who + years;;
        }
    },
    template: '#account-component'
});

var ActivityActions = {
    beforeRouteLeave: function beforeRouteLeave(to, from, next) {
        console.log('Leave:', [to, from]);
        next();
    },
    data: function data() {
        return {
            toSlow: false,
            slowTime: 3,
            labels: {
                load: false,
                error: false
            },
            timerLoader: null
        };
    },

    methods: {
        close: function close() {
            this.$emit('close');
        },
        back: function back(_back) {
            _back = _back === undefined ? this.$route.meta.back : _back;
            _back = _back === undefined ? this.$route.query.back : _back;
            console.log('back:', _back);
            _back === undefined ? this.$router.push('/') : this.$router.push(_back);
        },
        loadStart: function loadStart(second) {
            var _this3 = this;

            this.labels.load = true;
            second = second ? second : this.slowTime;
            this.timerLoader = setTimeout(function () {
                _this3.toSlow = true;
            }, second * 1000);
        },
        loadStop: function loadStop() {
            this.labels.load = false;
            clearTimeout(this.timerLoader);
            this.toSlow = false;
        },
        errorStart: function errorStart() {
            this.labels.error = true;
        },
        errorStop: function errorStop() {
            this.labels.error = false;
        }
    }
};

var ClosedActivity = Vue.component('closed-activity', {
    extends: ActivityActions,
    template: '#closed-activity'
});

var DefaultActivity = Vue.component('default-activity', {
    extends: ActivityActions,
    template: '#default-activity'
});

var MessagesActivity = Vue.component('messages-activity', {
    extends: DefaultActivity,
    props: ['humanId', 'title'],
    data: function data() {
        return {
            message: '',
            caption: '',
            reply: '',
            code: '',
            show: true,
            process: false,
            approve: true,
            dirt: false,
            alert: false,
            captcha: false,
            preview: false,
            photo: false,
            photoIsRemoved: false
        };
    },

    // beforeRouteUpdate(to, from, next) {
    //     this.photo = this.preview;
    //     console.log('MessagesActivity', this.photo);
    //     next();
    // },
    mounted: function mounted() {
        if (this.title) {
            this.caption = this.title;
        }
    },
    methods: {
        reset: function reset() {
            //this.cancelPhoto();
            this.show = true;
            this.process = false;
            this.approve = true;
            this.message = '';
            this.photo = null;
        },

        isDirt: _.debounce(function () {
            var word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i;
            this.dirt = word.test(this.message) ? true : false;
            return this.dirt;
        }, 700),

        attention: function attention(count) {
            if (count < 3) {
                this.alert = true;
            } else {
                this.alert = false;
            }
        },
        close: function close() {
            //this.$emit('close');
            this.back();
        },
        cancel: function cancel() {
            this.captcha = false;
            this.confirm = false;
            this.ignore = true;
            console.log('cancel');
        },
        select: function select(data) {
            this.photo = data;
            this.preview = data;
        },
        sendMessage: function sendMessage() {
            var _this4 = this;

            console.log(data);
            var data = {
                id: this.humanId,
                captcha_code: this.code
            };
            if (this.photo && this.photo.alias) {
                data['photo'] = this.photo.alias;
            } else if (true) {
                data['mess'] = this.message;
                data['re'] = this.reply;
            }
            this.$store.commit('intimate/notifi', false);
            api.messages.send(data).then(function (_ref) {
                var data = _ref.data;

                _this4.onMessageSend(data);
            }).catch(function () {
                _this4.onError();
            });
            this.preview = null;
            this.process = true;
        },
        setCode: function setCode(code) {
            this.code = code;
            this.sendMessage();
        },
        onMessageSend: function onMessageSend(data) {
            if (!data.saved && data.error) {
                if (data.error == 'need_captcha') {
                    this.captcha = true;
                }
                this.onError();
            } else {
                this.sended();
            }
            this.process = false;
        },
        sended: function sended() {
            //MessList.messages.unshift(data.message);
            this.$refs.messages.reload();
            this.reset();
        },
        onError: function onError() {
            this.process = false;
        },
        account: function account() {
            this.$router.push(this.humanId + '/detail');
        },
        uploads: function uploads() {
            this.$router.push(this.humanId + '/uploads');
        },
        incoming: function incoming() {
            this.$router.push(this.humanId + '/incoming');
        },

        // preview() {
        //     this.$router.push(this.humanId + '/preview')
        // },
        videochat: function videochat() {
            window.open('/videochat.php?to=' + this.humanId, 'videochat', 'width=432, height=280, resizable=yes, scrollbars=yes');
        }
    },
    template: '#messages-activity'
});

var ModeratorActivity = Vue.component('moderator-activity', {
    data: function data() {
        return {
            process: false,
            promt: true,
            error: null,
            count: null,
            message: {
                id: null,
                text: ''
            },
            secure: null,
            expire: null
        };
    },
    mounted: function mounted() {
        this.load();
    },

    computed: {
        human: function human() {
            return this.$store.state.search.human;
        },
        accept: function accept() {
            return this.$store.state.accepts.moderator;
        }
    },
    methods: {
        approve: function approve() {
            var _this5 = this;

            this.process = true;
            api.moderator.promt().then(function () {
                _this5.load();
            }).catch(function () {
                _this5.needPromt();
                _this5.process = false;
            });
            this.$store.commit('accepts/moderator', 1);
        },
        load: function load() {
            var _this6 = this;

            this.process = true;
            api.moderator.load().then(function (_ref2) {
                var data = _ref2.data;

                _this6.error = data.error;
                if (_this6.error == 'promt') {
                    _this6.needPromt();
                } else if (_this6.error == 'count') {} else if (_this6.error == 'other') {} else if (!_this6.error && data.message) {
                    _this6.loaded(data);
                }
                _this6.process = false;
            });
        },
        loaded: function loaded(data) {
            var count = data.count,
                message = data.message,
                expire = data.expire,
                secure = data.secure;

            this.count = count;
            this.message = message;
            this.expire = expire;
            this.secure = secure;
        },
        needPromt: function needPromt() {
            this.$store.commit('accepts/moderator', 0);
            this.promt = false;
        },
        action: function action(mark) {
            var _this7 = this;

            var data = {
                id: this.message.id,
                secure: this.secure,
                expire: this.expire,
                mark: mark
            };
            this.process = true;
            api.moderator.press(data).then(function () {
                _this7.load();
            });
        },
        close: function close() {
            this.$emit('close');
        }
    },
    template: '#moderator-activity'
});

var SearchActivity = Vue.component('search-activity', {
    extends: DefaultActivity,
    data: function data() {
        return {};
    },
    beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
        if (to.fullPath == '/search' && from.fullPath == '/search/settings/search') {
            this.$refs.results.reload();
        }
        next();
    },

    computed: {},
    methods: {
        close: function close() {
            this.back();
        }
    },
    template: '#search-activity'
});

var AdTop = Vue.component('ad-top', {
    data: function data() {
        return {
            width: 0
        };
    },
    mounted: function mounted() {
        this.width = this.$el.offsetWidth;
        console.log('cc', [this.desktop, this.width]);
    },

    methods: {
        random: function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    computed: {
        desktop: function desktop() {
            return this.width >= 700;
        },
        source: function source() {
            return '/static/img/ad/ad-hm-' + this.random(0, 2) + '.gif';
        }
    },
    template: '#ad-top'
});
Vue.component('api-key-update', {
    props: ['item'],
    data: function data() {
        return {
            attempt: 0
        };
    },
    mounted: function mounted() {
        this.load();
    },

    methods: {
        tick: function tick(delay) {
            var _this8 = this;

            setTimeout(function () {
                _this8.load();
            }, 1000 * delay);
        },
        reload: function reload() {
            var delay = 1;
            if (this.attempt >= 10) {
                delay = 300;
            } else if (this.attempt >= 5) {
                delay = 5;
            } else if (this.attempt >= 2) {
                delay = 3;
            }
            this.attempt++;
            this.tick(delay);
        },
        load: function load() {
            var _this9 = this;

            this.$store.dispatch('auth/UPDATE_KEY').then(function (_ref3) {
                var data = _ref3.data;

                if (data.uid) {
                    _this9.upKey(data);
                } else if (data.reg) {
                    _this9.noReg(data);
                } else {
                    _this9.reload();
                }
            });
        },
        noReg: function noReg(data) {
            // зарегистрирован / не авторизован
            this.upKey(data);
        },
        upKey: function upKey(data) {
            this.$store.dispatch('LOAD_API_TOKEN');
            this.upUser(data);
            this.upSettings(data);
            this.attempt = 0;
            this.tick(600);
        },
        upUser: function upUser(data) {
            var uid = data.uid,
                city = data.city,
                sex = data.sex,
                age = data.age,
                name = data.name,
                contacts = data.contacts,
                promt = data.apromt;
            //console.log('upUser', data);

            this.$store.commit('resetUser', { uid: uid, city: city, sex: sex, age: age, name: name, contacts: contacts, promt: promt });
            //store.commit('loadUser', data.contacts);
        },
        upSettings: function upSettings(data) {
            var who = data.who,
                up = data.years_up,
                to = data.years_to,
                town = data.close,
                virt = data.virt;

            this.$store.commit('search/settings', { who: who, up: up, to: to, virt: virt, town: town });
        }
    },
    template: '#api-key-update'
});

Vue.component('attention-wall', {
    props: ['show'],
    data: function data() {
        return {
            content: {
                1: {
                    caption: 'Предупреждение',
                    text: '\u041D\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043E\u0442 \u044D\u0442\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043F\u043E\u0441\u0442\u0443\u043F\u0430\u044E\u0442 \u0436\u0430\u043B\u043E\u0431\u044B. \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0435\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0438\u043C\u0435\u044E\u0442 \u0433\u0440\u0443\u0431\u044B\u0439 \u0442\u043E\u043D,\n                    \u043C\u043E\u0433\u0443\u0442 \u043E\u0441\u043A\u043E\u0440\u0431\u0438\u0442\u044C, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442 \u0438\u043D\u0442\u0438\u043C \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438, \u0431\u0435\u0441\u0441\u043C\u044B\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u0440\u0435\u0437\u043A\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F.'
                },
                8: {
                    caption: 'Внимание',
                    text: '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0430\u0440\u0443\u0448\u0430\u044E\u0442 \u043F\u0440\u0430\u0432\u0438\u043B\u0430. \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u043D\u043E \u043E\u0441\u043A\u043E\u0440\u0431\u0438\u0442\u0435\u043B\u044C\u043D\u044B,\n                    \u0438\u043C\u0435\u044E\u0442 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u043E\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435, \u043E\u0431\u043C\u0430\u043D \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E\u043F\u043B\u0430\u0442\u044B \u0443\u0441\u043B\u0443\u0433.'
                }
            }
        };
    },

    computed: {
        caption: function caption() {
            return this.content[this.show].caption;
        },
        text: function text() {
            return this.content[this.show].text;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        promt: function promt() {
            this.$emit('promt');
        }
    },
    template: '#attention-wall'
});

Vue.component('auth-board', {
    data: function data() {
        return {
            confirmSend: false,
            hint: 'Введите ваш емаил.',
            process: false,
            email: ''
        };
    },
    mounted: function mounted() {
        var _this10 = this;

        _.delay(function () {
            _this10.$store.dispatch('auth/SYNC').then(function () {
                _this10.email = _this10.$store.state.auth.email;
            });
        }, 2500);
    },

    computed: {
        login: function login() {
            return this.$store.state.auth.login;
        },
        password: function password() {
            return this.$store.state.auth.pass;
        },
        loaded: function loaded() {
            return this.login && this.password;
        }
    },
    methods: {
        send: function send() {
            var _this11 = this;

            if (!this.email) {
                return;
            }
            this.process = true;
            this.hint = 'Отправляю...';
            this.$store.dispatch('auth/SAVE_EMAIL', this.email).then(function (response) {
                _this11.hint = response.data.say;
                _this11.error = response.data.err;
                _this11.sended();
            });
        },
        sended: function sended() {
            this.process = false;
            if (!this.error) {
                this.emit('close');
            }
        }
    },
    template: '#auth-board'
});
Vue.component('captcha-dialog', {
    data: function data() {
        return {
            code: '',
            inc: 0
        };
    },

    computed: {
        src: function src() {
            simple_hash();
            return '/secret_pic.php?inc=' + this.inc + '&hash=' + hash;
        }
    },
    methods: {
        close: function close() {
            this.$emit('cancel');
        },
        send: function send() {
            this.$emit('send', this.code);
            this.update();
            this.close();
        },
        update: function update() {
            this.inc++;
        }
    },
    template: '#captcha-dialog'
});

Vue.component('city-suggest', {
    props: ['city'],
    data: function data() {
        return {
            query: '',
            cities: [],
            enable: true
        };
    },
    mounted: function mounted() {
        if (!this.query && this.city && this.city.length > 2) {
            this.query = this.city;
        }
    },

    computed: {
        suggested: function suggested() {
            return this.cities.length;
        }
    },
    methods: {
        load: function load() {
            var _this12 = this;

            if (!this.query.length) {
                return this.reset();
            }
            api.user.get({ q: this.query, hash: hash }, 'town/suggest').then(function (response) {
                _this12.loaded(response.data.cities);
            });
        },
        reset: function reset() {
            this.cities = [];
        },
        select: function select(item) {
            this.query = item;
            this.$emit('select', item);
            this.reset();
        },
        loaded: function loaded(data) {
            if (data && data.length) {
                this.cities = data;
            } else {
                this.reset();
            }
        }
    },
    template: '#city-suggest'
});

var ContactDialog = {
    extends: DefaultActivity,
    props: ['quick'],
    data: function data() {
        return {
            response: false,
            slow: false,
            error: false,
            amount: 0,
            offset: 0,
            batch: 10,
            max: 100,
            dialog: false
        };
    },

    computed: {
        showLoader: function showLoader() {
            return this.slow && !this.response;
        },
        showAlert: function showAlert() {
            return this.error && this.response;
        },
        showHint: function showHint() {
            return this.count < 1;
        },
        count: function count() {
            var result = this.contacts ? this.contacts.length : 0;
            return result;
        },
        more: function more() {
            var max = this.offset <= this.max - this.batch;
            var min = this.amount >= this.batch;
            return min && max;
        }
    },
    methods: {
        close: function close() {
            //this.$emit('close');
            this.back();
        },
        reset: function reset() {
            this.response = false;
            this.error = false;
            this.slow = false;
        },
        hope: function hope() {
            var _this13 = this;

            var sec = 2;
            setTimeout(function () {
                return _this13.slow = true;
            }, sec * 1000);
            this.reset();
        },
        loaded: function loaded(result) {
            //this.received = result ? result.length : 0;
            // if (this.received) {
            //     this.contacts = _.union(this.contacts, result);
            // }
            this.offset += this.batch;
            this.amount = this.count;
            this.response = true;
            this.slow = false;
        },
        bun: function bun(index) {
            var item = this.contacts[index];
            console.log('bun', item);
            this.remove(index);
            api.bun.send({
                id: item.message.mess_id,
                tid: item.human_id
                //text: this.item.message,
                //token: 'super secret token'
            });
        },
        splice: function splice(index) {
            this.$store.commit('delete', index);
        },
        error: function error(_error) {
            this.response = true;
            this.error = true;
            console.log(_error);
        },
        dialogOpen: function dialogOpen(data) {
            this.dialog = data.id;
            this.title = data.title;
        }
    },
    mounted: function mounted() {
        this.load();
    }
};

var InitialDialog = Vue.component('initial-dialog', {
    extends: ContactDialog,
    mounted: function mounted() {
        this.$store.dispatch('initial/CHECK');
    },

    computed: {
        initial: function initial() {
            return true;
        },
        simple: function simple() {
            return true;
        },
        contacts: function contacts() {
            //console.log(this.$store);
            return this.$store.state.contacts.initial.list;
        }
    },
    methods: {
        load: function load() {
            var _this14 = this;

            this.$store.dispatch('initial/LOAD').then(function (response) {
                _this14.loaded();
            });
            this.amount = this.count;
            this.hope();
        },
        next: function next() {
            var _this15 = this;

            this.$store.dispatch('initial/NEXT', this.offset).then(function (response) {
                _this15.loaded();
            });
            this.reset();
        },
        remove: function remove(index) {
            this.$store.dispatch('initial/DELETE', index);
        },
        read: function read(index) {
            console.log('initial=read', index);
            this.$store.dispatch('initial/READ', index);
        },
        splice: function splice(index) {
            //console.log(this.$store); return;
            this.$store.commit('initial/delete', index);
        }
    },
    template: '#initial-dialog'
});

var IntimateDialog = Vue.component('intimate-dialog', {
    extends: ContactDialog,
    data: function data() {
        return {
            max: 100
        };
    },
    mounted: function mounted() {
        this.$store.dispatch('intimate/CHECK');
    },

    computed: {
        initial: function initial() {
            return true;
        },
        simple: function simple() {
            return false;
        },
        contacts: function contacts() {
            return this.$store.state.contacts.intimate.list;
        }
    },
    methods: {
        load: function load() {
            var _this16 = this;

            this.$store.dispatch('intimate/LOAD', this.next).then(function (response) {
                _this16.loaded();
            }).catch(function (error) {
                return _this16.error = error;
            });
            this.amount = this.count;
            this.hope();
        },
        next: function next() {
            var _this17 = this;

            this.$store.dispatch('intimate/NEXT', this.offset).then(function (response) {
                _this17.loaded();
            });
            this.hope();
        },
        remove: function remove(index) {
            console.log('imm=remove', index);
            this.$store.dispatch('intimate/DELETE', index);
        },
        read: function read(index) {
            console.log('intimate=read', index);
            this.$store.dispatch('intimate/READ', index);
        },
        splice: function splice(index) {
            this.$store.commit('intimate/delete', index);
        }
    },
    template: '#intimate-dialog'
});

var SendsDialog = Vue.component('sends-dialog', {
    extends: ContactDialog,
    computed: {
        initial: function initial() {
            return false;
        },
        simple: function simple() {
            return false;
        },
        contacts: function contacts() {
            return this.$store.state.contacts.sends.list;
        }
    },
    methods: {
        load: function load() {
            var _this18 = this;

            this.$store.dispatch('sends/LOAD', this.next).then(function (response) {
                _this18.loaded();
            });
            this.amount = this.count;
            this.hope();
        },
        next: function next() {
            var _this19 = this;

            this.$store.dispatch('sends/NEXT', this.offset).then(function (response) {
                _this19.loaded();
            });
            this.reset();
        },
        remove: function remove(index) {
            this.$store.dispatch('sends/DELETE', index);
        },
        splice: function splice(index) {
            this.$store.commit('sends/delete', index);
        }
    },
    template: '#initial-dialog'
});

Vue.component('contact-item', {
    props: ['item', 'index', 'quick'],
    data: function data() {
        return {
            account: false,
            detail: false,
            confirm: false
        };
    },

    computed: {
        name: function name() {
            var result = 'Парень или девушка';
            if (this.item.user) {
                result = this.item.user.sex == 2 ? 'Девушка' : 'Парень';
                if (this.item.user.name) {
                    result = this.item.user.name;
                }
            }
            return result;
        },
        age: function age() {
            return this.item.user && this.item.user.age ? this.item.user.age : '';
        },
        city: function city() {
            return this.item.user && this.item.user.city ? this.item.user.city : '';
        },
        title: function title() {
            return this.name + ' ' + this.age + ' ' + this.city;
        },
        message: function message() {
            return this.item.message ? this.item.message.text : '';
        },
        unread: function unread() {
            return this.item.message ? this.item.message.unread : 0;
        },
        sent: function sent() {
            return this.item.message ? this.item.message.sender == this.$store.state.user.uid : 0;
        },
        humanId: function humanId() {
            return this.item.human_id;
        }
    },
    methods: {
        show: function show() {
            //this.$emit('show');
            if (this.quick) {
                this.reply();
            } else {
                //this.anketa();
                this.dialog();
            }
        },
        reply: function reply() {
            this.$emit('read', this.index);
            this.$router.push({ name: 'quickReply', params: {
                    humanId: this.humanId,
                    message: this.message,
                    index: this.index
                } });
        },
        dialog: function dialog() {
            this.$emit('read', this.index);
            //this.$emit('dialog', {id: this.humanId, title: this.title});
            this.$router.push({ name: 'dialog', params: { humanId: this.humanId, title: this.title } });
        },
        confirmBun: function confirmBun() {
            this.confirm = 'doit';
            console.log('confirmBun');
        },
        confirmRemove: function confirmRemove() {
            //this.$emit('remove');
            //console.log('initial-item REMOVE');
            this.confirm = !this.quick ? 'some' : 'must';
        },
        close: function close() {
            this.detail = false;
            console.log('close');
        },
        bun: function bun() {
            console.log('bun1', this.index);
            this.$emit('bun', this.index);
        },
        remove: function remove() {
            console.log('remove=remove', this.index);
            this.$emit('remove', this.index);
        },
        cancel: function cancel() {
            this.confirm = false;
            console.log('cancel');
        },
        sended: function sended() {
            this.$emit('sended', this.index);
            this.close();
        }
    },
    template: '#contact-item'
});

var ContentActivity = Vue.component('content-activity', {
    extends: ActivityActions,
    props: ['link', 'locale'],
    data: function data() {
        return {
            title: '',
            text: '',
            loader: true,
            error: false
        };
    },

    methods: {
        load: function load(url) {
            var _this20 = this;

            axios.get(url).then(function (_ref4) {
                var data = _ref4.data;

                _this20.loaded(data);
            }).catch(function (e) {
                _this20.failed(e);
            });
        },
        loaded: function loaded(data) {
            this.text = data;
            this.loader = false;
            if (!data || data.length() < 50) {
                this.failed();
            }
        },
        failed: function failed() {
            this.error = true;
        }
    },
    template: '#content-activity'
});

var ContentModal = Vue.component('content-modal', {
    extends: ActivityActions,
    props: ['link'],
    data: function data() {
        return {
            text: 'Загружаю...'
        };
    },
    mounted: function mounted() {
        var _this21 = this;

        axios.get('/static/htm/promo/' + this.link + '.htm').then(function (_ref5) {
            var data = _ref5.data;

            _this21.text = data;
        });
    },

    template: '#content-modal'
});

var DealContentPage = Vue.component('deal-page', {
    extends: ContentActivity,
    mounted: function mounted() {
        this.title = 'Информация';
        this.load('/content/deal/' + this.link);
    }
});

var RulesContentPage = Vue.component('rules-page', {
    extends: ContentActivity,
    mounted: function mounted() {
        this.title = 'Правила сообщества';
        this.load('/content/rules/ru');
    }
});
Vue.component('desire-tag-item', {
    props: ['id', 'tag', 'added'],
    data: function data() {
        return {
            active: false,
            error: false
        };
    },

    methods: {
        activate: function activate() {
            var _this22 = this;

            this.active = true;
            _.delay(function () {
                return _this22.active = false;
            }, 3000);
        },
        select: function select() {
            this.activate();
            this.$emit('select', this.tag);
        }
    },
    template: '#desire-tag-item'
});
Vue.component('desire-list', {
    props: ['tags'],
    computed: {
        desires: function desires() {
            return this.$store.getters['desires/tags'];
        }
    },
    methods: {
        add: function add(tag) {
            if (!this.added(tag)) {
                this.$store.dispatch('desires/ADD', tag).then(function (response) {});
            }
        },
        added: function added(tag) {
            return _.contains(this.desires, tag);
        }
    },
    template: '#desire-list'
});
Vue.component('desires-widget', {
    props: ['tags'],
    data: function data() {
        return {
            batch: 50,
            position: 0,
            list: []
        };
    },
    mounted: function mounted() {
        this.reload();
    },
    updated: function updated() {
        this.reload();
    },

    computed: {
        avaible: function avaible() {
            var result = this.tags.length - this.position;
            return result > 0 ? result : 0;
        },
        more: function more() {
            return this.tags ? this.avaible : false;
        },
        offset: function offset() {
            var result = this.batch;
            if (this.list.length && this.list.length < this.batch) {
                result = this.batch - this.list.length;
            }
            return result;
        },
        next: function next() {
            var result = this.tags.slice(this.position, this.position + this.offset);
            return _.shuffle(result);
        }
    },
    methods: {
        load: function load() {
            if (this.more) {
                this.list = _.union(this.list, this.next);
                this.position = this.list.length;
            }
        },
        reload: function reload() {
            if (!this.position || this.offset != this.batch) {
                this.load();
            }
        }
    },
    template: '#desires-widget'
});
Vue.component('email-sended', {
    template: '#email-sended'
});

Vue.component('inform-dialog', {
    props: ['loader', 'alert', 'hint'],
    computed: {
        hasContext: function hasContext() {
            return !!this.$slots.context;
        },
        hasHint: function hasHint() {
            return !!this.$slots.hint;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    template: '#inform-dialog'
});

Vue.component('intro-info', {
    data: function data() {
        return {
            slide: 1
        };
    }
});

Vue.component('loading-cover', {
    props: ['show', 'text'],
    computed: {
        loader: function loader() {
            return this.text ? this.text : 'Отправляю';
        }
    },
    template: '#loading-cover'
});

Vue.component('loading-wall', {
    props: ['show', 'text'],
    data: function data() {
        return {
            hope: false
        };
    },

    computed: {
        loader: function loader() {
            return this.text ? this.text : 'Загружаем';
        }
    },
    mounted: function mounted() {
        var _this23 = this;

        this.hope = false;
        setTimeout(function () {
            return _this23.hope = true;
        }, 3000);
    },

    template: '#loading-wall'
});

var MenuUser = Vue.component('menu-user', {
    data: function data() {
        return {
            attempt: 0
        };
    },
    mounted: function mounted() {
        this.loadStatus();
    },

    computed: {
        authorized: function authorized() {
            var uid = this.$store.state.user.uid;
            var reg = this.$store.getters.registered;
            return uid > 0 ? 1 : 0;
        },
        newMessage: function newMessage() {
            var status = this.$store.state.contacts.intimate.status;

            return status == false || status < 8;
        },
        newContact: function newContact() {
            var status = this.$store.state.contacts.initial.status;

            return status == false || status < 8;
        },
        signature: function signature() {
            var results = 'Кто вы?';
            var _$store$state$user = this.$store.state.user,
                name = _$store$state$user.name,
                city = _$store$state$user.city,
                age = _$store$state$user.age,
                sex = _$store$state$user.sex;

            if (sex) {
                results = sex == 1 ? 'Парень' : 'Девушка';
                results = name ? name : results;
                return results + ' ' + (age ? age : '') + ' ' + (city ? city : '');
            }
            return results;
        }
    },
    methods: {
        search: function search() {
            this.$store.commit('simple', true);
            this.$root.reload();
            this.$router.push('/');
        },
        initial: function initial() {
            this.$router.push({ name: 'initial' });
        },
        intimate: function intimate() {
            this.$router.push({ name: 'intimate' });
        },
        check: function check() {
            var _this24 = this;

            axios.get('/mailer/status').then(function (_ref6) {
                var data = _ref6.data;

                _this24.onIntimate(data.message);
                _this24.onInitial(data.contact);
                _this24.attempt = 0;
            }).catch(function () {
                _this24.attempt++;
            });
        },
        loadStatus: function loadStatus() {
            var _this25 = this;

            var uid = this.$store.state.user.uid;

            var delay = !uid ? 2 : 15;
            if (uid) {
                this.check();
            }
            if (this.attempt > 10) {
                delay = 20;
            } else if (this.attempt > 4) {
                delay = 5;
            } else if (this.attempt > 2) {
                delay = 3;
            }
            setTimeout(function () {
                _this25.loadStatus();
            }, delay * 1000);
        },
        onLoad: function onLoad() {},
        onIntimate: function onIntimate(status) {
            var _this26 = this;

            var _$store$state$contact = this.$store.state.contacts.intimate,
                notified = _$store$state$contact.notified,
                current = _$store$state$contact.status;

            this.$store.commit('intimate/status', status);

            notified = !notified || status != current ? false : true;
            if (status == 1 && !notified && this.newMessage) {
                var callback = function callback() {
                    return _this26.$router.push({ name: 'intimate' });
                };
                this.$store.commit('intimate/notifi', true);
                this.$emit('snackbar', 'Новое сообщение', callback, 'Смотреть', true);
            }
        },
        onInitial: function onInitial(status) {
            var _this27 = this;

            var _$store$state$contact2 = this.$store.state.contacts.initial,
                notified = _$store$state$contact2.notified,
                current = _$store$state$contact2.status;

            this.$store.commit('initial/status', status);

            notified = !notified || status != current ? false : true;
            if (status == 1 && !notified && this.newContact && !this.newMessage) {
                var callback = function callback() {
                    return _this27.$router.push({ name: 'initial' });
                };
                this.$store.commit('initial/notifi', true);
                this.$emit('snackbar', 'Новое знакомство', callback, 'Смотреть', true);
            }
        },
        regmy: function regmy() {
            window.location = '/user/regnow';
        }
    }
});

Vue.component('list-date', {
    props: ['list', 'index'],
    computed: {
        count: function count() {
            return this.list.length;
        },
        item: function item() {
            return this.list[this.index];
        },
        currDate: function currDate() {
            return moment(this.item.date).date();
        },
        prevDate: function prevDate() {
            if (this.index && this.index < this.count) {
                return moment(this.list[this.index - 1].date).date();
            }
        },
        month: function month() {
            return moment(this.item.date).format('MMMM').substring(0, 3);
        },
        formatted: function formatted() {
            var result = this.currDate + ' ' + this.month;
            var today = moment().date();
            var yestd = moment().subtract(1, 'day').date();
            result = this.currDate === today ? 'Сегодня' : result;
            result = this.currDate === yestd ? 'Вчера' : result;
            return result;
        },
        date: function date() {
            if (this.prevDate != this.currDate) {
                return this.formatted;
            } else {
                return null;
            }
        }
    },
    template: '#list-date'
});

var prev = null;

Vue.component('message-item', {
    props: ['item', 'index', 'count', 'alert'],
    template: '#messages-item',
    data: function data() {
        return {
            showOption: false,
            fixOption: false,
            alertOption: false,
            showDialog: false,
            photo: false,
            photoNotFound: false
        };
    },

    methods: {
        fix: function fix() {
            this.showOption = true;
            this.alertOption = false;
            if (!this.alert) {
                this.fixOption = this.alert ? false : !this.fixOption;
            } else {
                this.$emit('admit');
            }
        },
        bun: function bun() {
            var _this28 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
            };
            var data = {
                id: this.item.id,
                tid: this.item.from
            };
            axios.post('/mess/bun/', data, config).then(function (response) {
                _this28.$emit('remove', _this28.index);
            }).catch(function (error) {
                console.log('error');
            });
        },
        cancel: function cancel() {
            this.showDialog = false;
            console.log('cancel');
        },
        remove: function remove() {
            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
            };
            var data = {
                id: this.item.id
            };
            axios.post('/mess/delete/', data, config).then(function (response) {
                //this.$emit('remove', this.index);
            }).catch(function (error) {
                console.log(error);
            });
            this.$emit('remove', this.index);
        },
        play: function play() {
            var _this29 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { tid: this.item.from }
            };
            var server = this.$store.state.photoServer;
            var url = 'http://' + server + '/api/v1/users/' + this.uid + '/sends/' + this.alias + '.jpg';
            axios.get(url, config).then(function (response) {
                _this29.preview(response.data.photo);
            }).catch(function (error) {
                console.log(error);
                if (error.response && error.response.status == "404") {
                    _this29.photoNotFound = true;
                }
            });
        },
        preview: function preview(photo) {
            var links = photo._links;
            if (links.origin.href) {
                this.photo = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
            }
        },
        pathName: function pathName(name) {
            if (!name || name.length < 10) {
                return null;
            }
            var path = [name.substr(0, 2), name.substr(2, 2), name.substr(4, 3)];
            return path.join('/') + '/' + name;
        }
    },
    mounted: function mounted() {
        if (!this.sent && !this.index && this.count < 5) {
            this.fix();
            this.alertOption = true;
        }
        if (!this.sent && !this.read) {
            this.$emit('set-new');
        }
        //console.log('item', this.index +'+'+ this.date);
    },
    updated: function updated() {
        //console.log('item', this.index +'+'+ this.date);
    },

    computed: {
        uid: function uid() {
            return this.$store.state.user.uid;
        },
        attention: function attention() {
            return this.alert || this.alertOption ? 1 : 0;
        },
        option: function option() {
            if (!this.index && this.alert) {
                return true;
            }
            return this.showOption || this.fixOption ? 1 : 0;
        },
        sent: function sent() {
            return !this.uid || this.uid == this.item.from ? 1 : 0;
        },
        read: function read() {
            return this.item.read == 0 ? false : true;
        },
        time: function time() {
            return moment(this.item.date).format('HH:mm');
        },
        alias: function alias() {
            var result = false;
            var text = this.item.mess;
            var old = /.+images.intim?.(.{32})\.(jpg)/i;
            var now = /\[\[IMG:(.{32})\]\]/i;
            result = old.test(text) ? old.exec(text) : false;
            result = !result && now.test(text) ? now.exec(text) : result;
            if (result) {
                result = result[1];
            }
            return result;
        },
        image: function image() {
            var server = this.$store.state.photoServer;
            var image = this.pathName(this.alias);
            return image ? 'http://' + server + '/res/photo/preview/' + image + '.png' : false;
        },
        previous: function previous() {
            var p = prev;
            prev = this.item.from;
            return !p || p == prev ? true : false;
        }
    }
});

Vue.component('message-list', {
    props: ['humanId'],
    data: function data() {
        return {
            messages: [],
            response: null,
            error: 0,
            next: 0,
            newCount: 0,
            batch: 15,
            received: 0,
            attention: false,
            date: null,
            toSlow: false,
            skipScroll: false
        };
    },

    mounted: function mounted() {
        this.load();
    },
    methods: {
        reload: function reload() {
            this.next = 0;
            this.newCount = 0;
            this.messages = [];
            this.load();
            fdate = null;
            prev = null;
            //TODO: переписать глобальную зависимость
        },
        load: function load() {
            var _this30 = this;

            //console.log('load MessList data');
            this.response = 0;
            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { id: this.humanId, next: this.next, hash: hash }
            };
            axios.get('/ajax/messages_load.php', config).then(function (response) {
                _this30.onLoad(response);
            }).catch(function (error) {
                _this30.error = 10;
                console.log(error);
            });
            setTimeout(function () {
                return _this30.toSlow = true;
            }, 7000);
        },
        loadNext: function loadNext() {
            this.skipScroll = true;
            this.load();
        },
        onLoad: function onLoad(response) {
            var messages = response.data.messages;
            this.received = messages ? messages.length : 0;
            if (!messages && !this.messages.length) {
                this.noMessages();
            } else {
                if (this.received) {
                    this.messages = _.union(messages.reverse(), this.messages);
                }
                this.next += this.batch;
                this.scammer();
            }
            this.response = 200;
            this.toSlow = false;
            this.$nextTick(function () {
                //this.scroll();
            });
        },
        scroll: function scroll() {
            if (this.skipScroll) {
                return this.skipScroll = false;
            }
            var objDiv = document.getElementById("dialog-history");
            console.log('scroll', objDiv.scrollTop);
            objDiv.scrollTop = objDiv.scrollHeight + 30;
            console.log('scroll', objDiv.scrollTop);
        },
        noMessages: function noMessages() {
            // TODO: Заменить на компоненты, страрые зависимости
            //quick_mess.ajax_load();
            //notice_post.show();
            //store.commit('intimate/CHECK', false);
        },
        scammer: function scammer() {
            this.$emit('attention', this.replyCount);
        },
        setDate: function setDate(date) {
            //this.date = new Date(this.item.date).getDayMonth();
        },
        remove: function remove(index) {
            this.messages.splice(index, 1);
        },
        admit: function admit() {
            this.attention = false;
        },
        setNew: function setNew() {
            this.newCount += 1;
        }
    },
    computed: {
        // items() {
        //     //let arr = this.messages.slice();
        //     return this.messages.slice().reverse();
        // },
        count: function count() {
            return this.messages.length;
        },
        replyCount: function replyCount() {
            return _.where(this.messages, { from: this.userId + '' }).length;
        },
        more: function more() {
            if (this.received && this.received == this.batch) {
                return true;
            }
            return false;
        },
        userId: function userId() {
            return this.$store.state.user.uid;
        }
    },
    template: '#message-list'
});

var ModalDialog = Vue.component('modal-dialog', {
    extends: ActivityActions,
    mounted: function mounted() {
        // Close the modal when the escape key is pressed.
        var self = this;
        document.addEventListener('keydown', function () {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },

    template: '#modal-dialog'
});

///
// Модальное окно настроек OptionDialog - контейнер
///
Vue.component('option-dialog', {
    template: '#option-static__dialog-window',
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    created: function created() {
        // Close the modal when the `escape` key is pressed.
        var self = this;
        document.addEventListener('keydown', function () {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },
    updated: function updated() {
        if (this.show) {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }
});

var PhotoViewer = Vue.component('photo-send', {
    props: ['photo', 'options'],
    data: function data() {
        return {
            remove: false
        };
    },

    created: function created() {
        this.server = this.$store.state.photoServer;
    },
    computed: {
        uid: function uid() {
            return this.$store.state.user.uid;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        removePhoto: function removePhoto() {
            var _this31 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
                //params: { uid: this.uid, hash }
            };
            axios.delete('http://' + this.server + '/api/v1/users/' + this.uid + '/photos/' + this.photo.alias + '.jpg', config).then(function (response) {
                _this31.$emit('removed');
                _this31.close();
                //console.log(this.photos);
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
    template: '#photo-send'
});

Vue.component('photo-view', {
    extends: ModalDialog,
    props: ['photo', 'thumb', 'maxWidth', 'bypass'],
    methods: {
        approve: function approve() {
            this.$store.commit('accepts/photo');
        },
        close: function close() {
            this.back();
        }
    },
    computed: {
        accept: function accept() {
            return this.$store.state.accepts.photo || this.bypass ? true : false;
        }
    },
    template: '#photo-view'
});

Vue.directive('resized', {
    bind: function bind(el) {
        $(el).on('change', function () {
            el.style.height = '1px';
            var fix = el.scrollHeight > 40 ? 3 : 0;
            el.style.height = el.scrollHeight + fix + 'px';
        });
    },
    componentUpdated: function componentUpdated(el) {
        $(el).change();
    }
});

var QuickDialog = {
    extends: ModalDialog,
    props: ['humanId', 'message', 'index'],
    data: function data() {
        return {
            text: '',
            captcha: false,
            process: false,
            loading: false,
            confirm: false,
            ignore: false,
            addition: false,
            code: null,
            modals: {
                cliche: false,
                notepad: false
            }
        };
    },

    // beforeRouteLeave(to, from, next) {

    // },
    mounted: function mounted() {
        this.reload();
        console.log('reply', this.reply);
    },

    computed: {
        caption: function caption() {
            return this.reply ? 'Быстрый ответ' : 'Написать сообщение';
        },
        human: function human() {
            return this.$store.state.search.human;
        },
        user: function user() {
            return this.$store.state.user;
        },
        tags: function tags() {
            return 'tags' in this.human ? this.human.tags : [];
        },
        hold: function hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        added: function added() {
            return this.user.city && this.user.age && this.user.name ? false : true;
        }
    },
    methods: {
        reload: function reload() {
            var _this32 = this;

            this.loading = true;
            setTimeout(function () {
                return _this32.loading = false;
            }, 4 * 1000);
            store.dispatch('search/HUMAN', this.humanId).then(function (response) {
                _this32.loaded();
            }).catch(function (error) {
                _this32.loading = false;
            });
        },
        loaded: function loaded() {
            this.loading = false;
            this.visited();
            //console.log('hold:', this.human.hold);
            //console.log('tags:', this.human);
            //this.process = false;
        },
        remove: function remove() {
            console.log('::remove:: (!)');
            this.$emit('remove');
        },
        cancel: function cancel() {
            this.captcha = false;
            this.confirm = false;
            this.ignore = true;
            console.log('cancel');
        },
        inProcess: function inProcess(sec) {
            var _this33 = this;

            this.process = true;
            setTimeout(function () {
                return _this33.process = false;
            }, sec * 1000);
        },
        send: function send() {
            var _this34 = this;

            var data = {
                id: this.humanId,
                mess: this.text,
                captcha_code: this.code
            };
            api.messages.send(data).then(function (response) {
                _this34.onMessageSend(response.data);
            }).catch(function (error) {
                _this34.onError(error);
            });
            //  this.sended();
            this.inProcess(5);
        },
        setCode: function setCode(code) {
            this.code = code;
            this.send();
        },
        onMessageSend: function onMessageSend(response) {
            if (!response.saved && response.error) {
                if (response.error == 'need_captcha') {
                    this.captcha = true;
                }
                this.onError();
            } else {
                this.sended();
            }
            this.process = false;
        },
        sended: function sended() {
            this.$emit('sended');
            this.$store.dispatch('notes/UPDATE', this.text);
            this.close();
        },
        account: function account() {
            this.$router.push(this.humanId + '/detail');
        },
        onError: function onError() {
            this.process = false;
        },
        visited: function visited() {
            this.$store.dispatch('visited/ADD', this.humanId);
        },
        close: function close() {
            this.back();
            //this.$emit('close');
        },
        setText: function setText(text) {
            this.text = text;
        }
    },
    template: '#quick-message'
};

var QuickMessage = Vue.component('quick-message', {
    extends: QuickDialog,
    computed: {
        reply: function reply() {
            return false;
        },
        information: function information() {
            var result = '';
            var who = { 1: 'парни', 2: 'девушки' };
            if (this.human.close && this.user.city && this.user.city != this.human.city) {
                result = 'Мне интересно общение только в моём городе';
            }
            if (this.human.who && this.human.who != this.user.sex) {
                result = 'Мне интересны только ' + who[this.human.who];
            } else if (this.human.who) {
                var age = this.user.age;
                if (this.human.up && age && this.human.up > age) {
                    result = 'Мне интересны ' + who[this.human.who] + ' в возрасте от ' + this.human.up + ' лет ';
                }
                if (this.human.to && age && this.human.to < age) {
                    result = 'Мне интересны ' + who[this.human.who] + ' в возрасте до ' + this.human.to + ' лет ';
                }
            }
            if (!this.user.age) {
                result = 'Укажите ваш возраст в анкете, для меня это важно';
            }
            if (!this.user.city) {
                result = 'Укажите ваш город в анкете, для меня это важно';
            }
            return result;
        }
    },
    methods: {
        action: function action() {
            if (!this.user.city) {
                this.$router.push('wizard/city');
            } else if (!this.user.age) {
                this.$router.push('settings/account');
            }
        }
    }
});

var QuickReply = Vue.component('quick-reply', {
    extends: QuickDialog,
    computed: {
        reply: function reply() {
            return true;
        },
        information: function information() {
            return this.message;
        }
    },
    methods: {
        sended: function sended() {
            this.$emit('sended', this.index);
            this.close();
        },
        action: function action() {}
    }
});

Vue.component('quick-write', {
    // extends: QuickMessage,
    props: ['humanId'],
    data: function data() {
        return {
            account: false,
            open: false,
            sended: false
        };
    },

    methods: {
        write: function write() {
            this.$router.push('write/' + this.humanId);
        }
    },
    template: '#quick-write'
});

Vue.component('remind-login', {
    data: function data() {
        return {
            email: '',
            hint: 'Введите ваш емайл',
            confirm: false
        };
    },

    computed: {},
    methods: {
        close: function close() {
            this.$emit('close');
        },
        send: function send() {
            var _this35 = this;

            if (!this.email) {
                return;
            }
            this.hint = 'Отправляю...';
            api.user.post({ email: this.email }, null, 'sync/remind').then(function (response) {
                _this35.hint = response.data.say;
                _this35.error = response.data.err;
                _this35.sended();
            });
        },
        sended: function sended() {
            if (!this.error) {
                this.hint = 'Успешно. Подождите.';
                this.confirm = true;
            }
        }
    },
    template: '#remind-login'
});

var RemoveConfirm = Vue.component('remove-confirm', {
    props: ['show', 'item'],
    data: function data() {
        return {
            content: {
                doit: {
                    caption: 'Наказывайте как следует',
                    text: '\u0417\u0430 \u0440\u0435\u0437\u043A\u0438\u0435 \u0441\u043B\u043E\u0432\u0430, \u0437\u0430 \u043E\u0441\u043A\u043E\u0440\u0431\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0445\u0430\u043C\u0441\u0442\u0432\u043E,\n                    \u0437\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u043D\u0435 \u0432 \u0442\u0435\u043C\u0443 \u0438\u043B\u0438 \u0431\u0435\u0441\u0441\u043C\u044B\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F, \u043D\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u0432\u0441\u0435\u0445, \u043A\u043E\u0433\u043E\n                    \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u043C. \u041D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0440\u0430\u0437\u0443.',
                    action: 'Удалить и наказать'
                },
                must: {
                    caption: 'Может стоит наказать?',
                    text: '\u041D\u0430\u0436\u043C\u0438\u0442\u0435 "\u0414\u0438\u0437\u043B\u0430\u0439\u043A" \u0443 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0432\u044B\u0437\u0432\u0430\u043B\u043E \u043D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u044D\u043C\u043E\u0446\u0438\u0438.\n                    \u041D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0440\u0430\u0437\u0443 \u0436\u0435. \u041C\u044B \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0443\u0437\u043D\u0430\u0435\u043C \u043E \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u044F\u0445, \u0435\u0441\u043B\u0438 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0435\u0437 \u043D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u044F.',
                    action: 'Удалить и забыть'
                },
                some: {
                    caption: 'Удалить навсегда',
                    text: '\u0412\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u043E\u0442\u043E\u0432\u0441\u044E\u0434\u0443, \u0431\u0435\u0437 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C. \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\n                    \u043F\u0440\u043E\u043F\u0430\u0434\u0435\u0442 \u043A\u0430\u043A \u0438\u0437 \u0432\u0430\u0448\u0435\u0439 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438, \u0442\u0430\u043A \u0438 \u0438\u0437 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u0430.',
                    action: 'Удалить навсегда'
                }
            }
        };
    },

    computed: {
        variant: function variant() {
            return this.show ? this.show : 'some';
        },
        caption: function caption() {
            return this.content[this.variant].caption;
        },
        text: function text() {
            return this.content[this.variant].text;
        },
        action: function action() {
            return this.content[this.variant].action;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        bun: function bun() {
            console.log('bun0');
            this.$emit('bun');
            this.close();
        },
        remove: function remove() {
            this.$emit('remove');
            this.close();
        }
    },
    template: '#remove-confirm'
});

Vue.component('remove-contact', {
    extends: RemoveConfirm,
    data: function data() {
        return {
            content: {
                some: {
                    caption: 'Удалить навсегда',
                    text: '\u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D \u0431\u0435\u0437 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C. \u0414\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0435 \u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u043E\u043C \u0441\u0442\u0430\u043D\u0435\u0442 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E.\n                    \u041E\u0431\u043C\u0435\u043D\u0438\u0432\u0430\u0439\u0442\u0435\u0441\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u043C\u0438 \u0441 \u0442\u0435\u043C\u0438 \u043A\u0442\u043E \u0432\u0430\u043C \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0435\u043D \u0432\u0441\u0435\u0433\u0434\u0430.',
                    action: 'Удалить навсегда'
                }
            }
        };
    },

    methods: {
        remove: function remove() {
            this.$emit('remove');
            this.close();
        }
    },
    template: '#remove-confirm'
});

Vue.component('search-item', {
    props: ['human', 'visited', 'gold', 'compact'],
    data: function data() {
        return {
            first: null,
            second: null,
            third: null,
            social: {
                first: ['em', 'ok', 'vk', 'fb', 'go', 'sk', 'ph'],
                second: ['vk', 'ok', 'fb', 'go', 'sk', 'ph'],
                third: ['sk', 'ph', 'em', 'ok', 'vk', 'fb', 'go']
            }
        };
    },
    mounted: function mounted() {
        var _this36 = this;

        _.find(_.pick(this.human, this.social.first), function (value, key) {
            return value ? _this36.first = key : false;
        });
        _.find(_.pick(this.human, this.social.second), function (value, key) {
            value = _this36.first == key ? false : value;
            return value ? _this36.second = key : false;
        });
        _.find(_.pick(this.human, this.social.second), function (value, key) {
            value = _this36.first == key ? false : value;
            value = _this36.second == key ? false : value;
            return value ? _this36.third = key : false;
        });
        // console.log('item',this.human);
    },

    computed: {
        search: function search() {
            var result = 'парня или девушку ';
            if (this.human.who) {
                result = this.human.who == 1 ? 'парня ' : 'девушку ';
            }
            result = 'Ищет ' + result;
            if (this.human.up || this.human.to) {
                //result += ' в возрасте ';
                result += this.human.up ? ' от ' + this.human.up : '';
                result += this.human.to ? ' до ' + this.human.to : '';
                result += ' лет ';
            }
            return result;
        },
        name: function name() {
            var sex = this.human.sex == 1 ? 'Парень' : 'Девушка';
            return this.human.name ? this.human.name : sex;
        },
        tags: function tags() {
            return this.human.tags.length;
        },
        online: function online() {
            return this.human.last < 777 ? true : false;
        },
        differ: function differ() {
            result = false;
            var sex = this.$store.state.user.sex;
            if (sex && this.human.who && this.human.who != sex) {
                result = true;
            }
            return result;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        quick: function quick() {
            this.$router.push({
                name: 'quickWrite',
                params: { humanId: this.human.id }
            });
        },
        load: function load() {
            var _this37 = this;

            api.search.load(null).then(function (response) {
                _this37.users = response.data.users;
            });
        }
    },
    template: '#search-item'
});

Vue.component('search-list', {
    data: function data() {
        return {
            loading: false,
            users: [],
            response: true,
            error: 0,
            newCount: 0,
            attention: false,
            toSlow: false,
            humanId: null,
            account: null,
            sended: false,
            ignore: false
        };
    },
    mounted: function mounted() {
        if (this.virgin && this.defaults) {
            this.preload();
        } else {
            this.load();
        }
        this.visitedSync();
        this.$store.dispatch('desires/PICK');
    },

    computed: {
        items: function items() {
            return this.$store.state.search.list;
        },
        more: function more() {
            return this.$store.getters['search/more'];
        },
        compact: function compact() {
            var _$store$state$search$ = this.$store.state.search.settings,
                city = _$store$state$search$.city,
                any = _$store$state$search$.any;

            return city && !any;
        },
        visited: function visited() {
            return this.$store.state.visited.list;
        },
        accept: function accept() {
            var _$store$state$search = this.$store.state.search,
                next = _$store$state$search.next,
                batch = _$store$state$search.batch;

            var accept = this.$store.state.accepts.search;
            return !this.ignore && !accept && next > batch;
        },
        defaults: function defaults() {
            var result = defaultResults ? json.parse(defaultResults) : null;
            return result && _.isObject(result) && _.has(result, 'users') && result.users.length ? result : [];
        },
        virgin: function virgin() {
            return this.$store.getters['search/virgin'];
        },
        desires: function desires() {
            return _.pluck(this.$store.state.desires.list, 'tag');
        },
        loader: function loader() {
            return this.$store.state.ready && (!this.response || !this.items.length);
        },
        city: function city() {
            return this.$store.state.user.city;
        },
        age: function age() {
            return this.$store.state.user.age;
        }
    },
    methods: {
        preload: function preload() {
            this.compact = false;
            this.$store.commit('search/results', this.defaults);
            console.log('defaults', this.defaults);
            this.onLoad();
        },
        reload: function reload() {
            this.$store.commit('ready', false);
            this.$store.commit('search/reset', false);
            this.load();
        },
        visitedSync: function visitedSync() {
            this.$store.dispatch('visited/SYNC');
        },
        load: function load() {
            var _this38 = this;

            this.response = 0;
            this.$store.dispatch('search/LOAD').then(function (response) {
                _this38.onLoad();
            }).catch(function (error) {
                _this38.response = 200;
                _this38.toSlow = false;
            });
        },
        loadNext: function loadNext() {
            //this.skipScroll = true;
            this.load();
        },
        onLoad: function onLoad() {
            this.$store.commit('ready', true);
            this.response = 200;
            this.toSlow = false;
        },
        openMessage: function openMessage(id) {
            this.humanId = id;
        },
        noResult: function noResult() {},
        old: function old(id) {
            return _.contains(this.visited, id);
        },
        gold: function gold(tags) {
            var result = _.intersection(this.desires, tags);
            return result.length ? true : false;
        },
        approve: function approve() {
            this.$store.commit('accepts/search');
        }
    },
    template: '#search-list'
});

Vue.component('search-wizard', {
    data: function data() {
        return {};
    },

    store: store,
    computed: Vuex.mapState({
        range: function range(state) {
            var settings = state.search.settings;
            var range = '';
            if (settings.up && settings.to) {
                range = settings.up + ' - ' + settings.to;
            } else if (settings.up && !settings.to) {
                range = ' от ' + settings.up;
            } else if (!settings.up && settings.to) {
                range = ' до ' + settings.to;
            }
            return range ? ' в возрасте ' + range + ' лет ' : '';
        },
        who: function who(state) {
            var settings = state.search.settings;
            var who = ' знакомства с кем угодно ';
            if (settings.who) {
                who = settings.who == 1 ? ' знакомства с парнем ' : ' знакомства с девушкой ';
            }
            return who;
        },
        say: function say(state) {
            var where = state.user.city ? '' : ', из любого города ';
            return this.who + this.range + where;
        },
        desires: function desires() {
            var count = this.$store.state.desires.list.length;
            return count ? count : 0;
        }
    }),
    mounted: function mounted() {}
});

var AboutSettings = Vue.component('about-settings', {
    props: [],
    data: function data() {
        return {
            inputGrowth: '',
            inputWeight: '',
            selectFigure: null,
            process: false,
            virgin: true
        };
    },

    computed: Vuex.mapState({
        growth: function growth(state) {
            return state.about.growth;
        },
        weight: function weight(state) {
            return state.about.weight;
        },
        figure: function figure(state) {
            return state.about.figure;
        }
    }),
    mounted: function mounted() {
        var _this39 = this;

        this.$store.dispatch('about/SYNC').then(function () {
            _this39.init();
            _this39.process = false;
        }).catch(function () {
            _this39.process = false;
        });
        this.process = true;
        this.init();
    },

    methods: {
        init: function init() {
            this.inputGrowth = this.growth ? this.growth : '';
            this.inputWeight = this.weight ? this.weight : '';
            this.selectFigure = this.figure;
        },
        deflower: function deflower() {
            this.virgin = false;
        },
        close: function close() {
            this.save();
            this.$emit('close');
        },
        save: function save() {
            if (!this.virgin) {
                this.$store.dispatch('about/SAVE', {
                    growth: this.inputGrowth,
                    weight: this.inputWeight,
                    figure: this.selectFigure
                });
            }
        }
    },
    template: '#about-settings'
});

var AccountSettings = Vue.component('account-settings', {
    extends: ClosedActivity,
    props: ['root'],
    data: function data() {
        return {
            selectCity: '',
            selectSex: 0,
            selectAge: 0,
            selectName: ''
        };
    },

    computed: Vuex.mapState({
        sex: function sex(state) {
            var sex = Number(state.user.sex);
            if (sex) {
                return sex == 1 ? 1 : 2;
            }
            return 0;
        },
        city: function city(state) {
            return state.user.city;
        },
        age: function age(state) {
            return state.user.age;
        },
        name: function name(state) {
            var variant = [];
            variant[1] = ['Саша', 'Дима', 'Сергей', 'Иван', 'Максим', 'Валера', 'Николай'];
            variant[2] = ['Оля', 'Юля', 'Настя', 'Алена', 'Катя', 'Маргарита', 'Татьяна'];
            var x = Math.floor(Math.random() * 7);
            var name = state.user.name;
            var auto = this.sex ? variant[this.sex][x] : '';
            return name ? name : auto;
        }
    }),
    created: function created() {
        var _defaultSettings = defaultSettings,
            city = _defaultSettings.city,
            age = _defaultSettings.age; // GLOBAL

        this.selectCity = this.city ? this.city : city;
        this.selectAge = this.age ? this.age : age;
        this.selectSex = this.sex;
        this.selectName = this.name;
    },

    methods: {
        saveSex: function saveSex() {
            this.$store.dispatch('SAVE_SEX', this.selectSex);
            this.resetName();
        },
        saveCity: function saveCity(city) {
            if (city) {
                this.selectCity = city;
            }
            if (this.selectCity != this.city) {
                this.$store.dispatch('SAVE_CITY', this.selectCity);
            }
        },
        saveAge: function saveAge() {
            if (this.selectAge != this.age) {
                this.$store.dispatch('SAVE_AGE', this.selectAge);
            }
        },
        saveName: function saveName() {
            this.$store.dispatch('SAVE_NAME', this.selectName);
        },
        resetName: function resetName() {
            this.selectName = this.name;
        },
        randomAge: function randomAge() {
            this.selectAge = _.random(19, 30);
            this.saveAge();
        },
        save: function save() {
            this.saveCity();
            this.saveAge();
            this.saveName();
        },
        close: function close() {
            this.save();
            this.back();
        }
    },
    template: '#account-settings'
});

var CityWizard = Vue.component('city-wizard', {
    extends: AccountSettings,
    data: function data() {
        return {
            cities: ['Москва', 'Санкт-Петербург', 'Минск', 'Алматы', 'Краснодар', 'Екатеринбург', 'Новосибирск', 'Киев', 'Омск', 'Воронеж', 'Нижний Новгород', 'Бишкек', 'Челябинск', 'Самара', 'Красноярск', 'Уфа', 'Казань', 'Иркутск', 'Волгоград', 'Харьков', 'Саратов', 'Ростов-на-Дону', 'Одесса', 'Барнаул', 'Пермь', 'Тюмень', 'Ташкент', 'Гомель', 'Томск', 'Хабаровск', 'Тольятти', 'Астана', 'Ставрополь', 'Тула', 'Астрахань', 'Гродно', 'Пенза', 'Оренбург', 'Владивосток', 'Чита', 'Рязань', 'Караганда', 'Тверь', 'Ульяновск', 'Кемерово', 'Сургут', 'Ярославль', 'Улан-Удэ', 'Брянск', 'Шымкент', 'Витебск', 'Симферополь', 'Калининград', 'Сочи', 'Липецк', 'Ижевск', 'Курск', 'Белгород', 'Павлодар', 'Брест', 'Могилев', 'Запорожье', 'Киров', 'Новокузнецк', 'Кривой Рог', 'Калуга', 'Усть-Каменогорск', 'Севастополь', 'Тамбов', 'Днепропетровск', 'Чебоксары', 'Иваново', 'Смоленск', 'Донецк', 'Душанбе', 'Владимир', 'Орел', 'Магнитогорск', 'Кострома', 'Нижневартовск']
        };
    },

    methods: {
        select: function select(city) {
            this.saveCity(city);
            this.back();
        },
        close: function close() {
            this.saveCity();
            this.back();
        }
    },
    template: '#city-wizard'
});

var ContactWizard = Vue.component('contact-wizard', {
    extends: AccountSettings,
    props: ['humanCity', 'humanAge'],
    created: function created() {
        if (!this.selectCity && this.humanCity) {
            this.selectCity = this.humanCity;
        }
        if (!this.selectAge && this.humanAge) {
            this.selectAge = this.humanAge;
        }
    },

    methods: {
        approve: function approve() {
            this.save();
            this.$emit('approve');
            this.$emit('close');
        },
        close: function close() {
            this.$emit('close');
        }
    },
    template: '#contact-wizard'
});

var DesiresSettings = Vue.component('desires-settings', {
    props: [],
    data: function data() {
        return {
            process: false,
            desire: '',
            confirmRemove: null
        };
    },

    computed: Vuex.mapState({
        tags: function tags(state) {
            return state.desires.list;
        }
    }),
    mounted: function mounted() {
        var _this40 = this;

        this.process = true;
        this.$store.dispatch('desires/SYNC').then(function (response) {
            _this40.process = false;
        });
    },

    methods: {
        close: function close() {
            this.$emit('close');
        },
        add: function add(tag) {
            var _this41 = this;

            this.process = true;
            this.$store.dispatch('desires/ADD', tag).then(function (response) {
                _this41.process = false;
            });
        },
        remove: function remove() {
            this.$store.dispatch('desires/DELETE', this.confirmRemove);
            this.confirmRemove = null;
        }
    },
    template: '#desires-settings'
});

var IncomingPhoto = Vue.component('incoming-photo', {
    extends: ClosedActivity,
    props: ['humanId'],
    data: function data() {
        return {
            photos: [],
            user: 0,
            server: null,
            preview: null
        };
    },

    created: function created() {
        this.server = this.$store.state.photoServer;
    },
    mounted: function mounted() {
        this.loadPhoto();
    },

    computed: {
        uid: function uid() {
            return this.$store.state.user.uid;
        }
    },
    methods: {
        loadPhoto: function loadPhoto() {
            var _this42 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { tid: this.humanId, hash: hash }
            };
            axios.get('http://' + this.server + '/api/v1/users/' + this.uid + '/sends', config).then(function (response) {
                _this42.photos = response.data.photos;
                //console.log(this.photos);
            }).catch(function (error) {
                console.log(error);
            });
        },
        show: function show(index) {
            var photo = this.photos[index];
            var links = photo._links;
            if (links.origin.href) {
                var data = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
                this.preview = data;
            }
        },
        close: function close() {
            this.back();
            //this.$emit('close');
        }
    },
    template: '#incoming-photo'
});

var LoginAccount = Vue.component('login-account', {
    props: [],
    data: function data() {
        return {
            login: '',
            password: '',
            captcha: false,
            code: '',
            error: false,
            remind: false,
            hint: 'Введите данные'
        };
    },

    computed: Vuex.mapState({
        city: function city(state) {
            return state.user.city;
        }
    }),
    mounted: function mounted() {},

    methods: {
        close: function close() {
            this.$emit('close');
        },
        send: function send() {
            var _this43 = this;

            var data = {
                login: this.login,
                pass: this.password,
                captcha: this.code
            };
            api.user.post(data, null, 'sync/login').then(function (response) {
                _this43.hint = response.data.say;
                _this43.error = response.data.err;
                _this43.captcha = response.data.captcha;
                _this43.onLogin();
            });
        },
        onLogin: function onLogin() {
            this.$refs.captcha.update();
            if (!this.error) {
                this.hint = 'Успешно. Подождите.';
                location.href = '/';
            }
        },
        setCode: function setCode(code) {
            this.code = code;
        }
    },
    template: '#login-account'
});

var MessagesCliche = Vue.component('messages-cliche', {
    props: [],
    extends: ActivityActions,
    data: function data() {
        return {
            texts: [],
            version: 3,
            active: null,
            process: true,
            default: {
                size: 12,
                color: '4E8714',
                tab: 'public'
            }
        };
    },
    mounted: function mounted() {
        var active = ls.get('cliche-active');
        this.load(active);
    },

    computed: {
        // ...
    },
    methods: {
        load: function load(value) {
            var _this44 = this;

            var result = value ? value : this.default.tab;
            api.raw.load(null, 'static/json/cliche/' + result + '.json?v=' + this.version).then(function (_ref7) {
                var data = _ref7.data;

                _this44.texts = data;
                _this44.active = result;
                ls.set('cliche-active', _this44.active, 3 * 24 * 60 * 60);
            });
        },
        size: function size(value) {
            var result = value ? this.default.size + value : this.default.size;
            return result + 'px';
        },
        color: function color(value) {
            var result = value ? value : this.default.color;
            return '#' + result;
        },
        style: function style(item) {
            return {
                fontSize: this.size(item.size),
                color: this.color(item.color)
            };
        },
        buttonStyle: function buttonStyle(value) {
            return this.active == value ? 'btn-primary' : 'btn-default';
        },
        select: function select(text) {
            this.$emit('select', text);
            this.close();
        }
    },
    template: '#messages-cliche'
});

var Notepad = Vue.component('notepad', {
    props: [],
    extends: ActivityActions,
    data: function data() {
        return {
            writes: []
        };
    },
    mounted: function mounted() {
        var _this45 = this;

        this.$store.dispatch('notes/WRITES').then(function (data) {
            _this45.writes = data;
        });
    },

    computed: {
        // ...
    },
    methods: {
        cliche: function cliche() {
            this.$emit('cliche');
            this.close();
        },
        select: function select(text) {
            // this.$store.dispatch('notes/ITEM', id).then((item) => {
            // })
            // this.$store.dispatch('notes/UPDATE', {id, count: item.count});
            this.$emit('select', text);
            this.close();
        }
    },
    template: '#notepad'
});

var OtherSettings = Vue.component('other-settings', {
    props: [],
    data: function data() {
        return {};
    },

    computed: Vuex.mapState({
        uid: function uid() {
            return this.$store.state.user.uid;
        }
    }),
    methods: {
        close: function close() {
            this.$emit('close');
        },
        logout: function logout() {
            window.location = '/logout.php';
        }
    },
    template: '#other-settings'
});

var PhotoSettings = Vue.component('photo-settings', {
    extends: ClosedActivity,
    props: ['humanId'],
    data: function data() {
        return {
            photos: []
        };
    },

    computed: Vuex.mapState({}),
    mounted: function mounted() {
        console.log('fileupload');
        var self = this;
        $('#fileupload').fileupload({
            dataType: 'json',
            add: function add(e, data) {
                var server = self.$store.state.photoServer;
                var uid = self.$store.state.user.uid;
                data.url = 'http://' + server + '/api/v1/users/' + uid + '/photos?jwt=' + self.$store.state.apiToken;
                data.submit();
            },
            done: function done(e, data) {
                self.preview(data.result.photo);
            }
        });
        this.loadPhoto();
    },

    methods: {
        close: function close() {
            this.back();
        },
        loadPhoto: function loadPhoto() {
            var _this46 = this;

            var server = this.$store.state.photoServer;
            var uid = this.$store.state.user.uid;
            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { hash: hash }
            };
            axios.get('http://' + server + '/api/v1/users/' + uid + '/photos', config).then(function (response) {
                var result = response.data.photos;
                if (result && result.length) {
                    _this46.photos = response.data.photos;
                }
                console.log(_this46.photos);
            }).catch(function (error) {
                console.log(error);
            });
        },
        upload: function upload(e) {
            $('#fileupload').click();
        },

        show: function show(index) {
            this.preview(this.photos[index]);
        },
        preview: function preview(photo) {
            var links = photo._links;
            if (links.origin.href) {
                var data = {
                    photo: links.origin.href,
                    thumb: links.thumb.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                    //this.$router.push({ name: 'preview', params: {humanId: this.humanId, photo: data, options: true} });
                };this.$emit('select', data);
                this.close();
                //this.$store.commit('sendPhoto', data);
                //console.log('sendPhoto');
                //console.log(data);
            } else {
                this.close();
            }
        }
    },
    template: '#photo-settings'
});

var SearchSettings = Vue.component('search-settings', {
    extends: ClosedActivity,
    props: ['root'],
    data: function data() {
        return {
            ageRange: [0, 16, 17, 18, 20, 23, 25, 27, 30, 35, 40, 45, 50, 60, 80],
            selectWho: 0,
            selectUp: 0,
            selectTo: 0,
            selectCity: '',
            checkedTown: 0,
            checkedVirt: 0,
            checkedAnyCity: 0
        };
    },

    // beforeRouteEnter(to, from, next) {,
    //     beforeEnter: (to, from, next) => {
    //         console.log(store.state.user.sex);
    //         if (!store.state.user.sex) {
    //             console.log('settings-search', store.state.user.sex );
    //             next('/confirm-sex/search');
    //         } else {
    //             console.log('next', to );
    //             next();
    //         }
    //     }

    // },
    computed: Vuex.mapState({
        who: function who(state) {
            var who = Number(state.search.settings.who);
            if (who) {
                return who == 1 ? 1 : 2;
            }
            return 0;
        },
        city: function city(state) {
            var _defaultSettings2 = defaultSettings,
                city = _defaultSettings2.city; // GLOBAL

            return state.user.city ? state.user.city : city; // [~!!!~] READ_ONLY
        },
        up: function up(state) {
            return this.age(state.search.settings.up);
        },
        to: function to(state) {
            return this.age(state.search.settings.to);
        },
        town: function town(state) {
            return state.search.settings.town == true;
        },
        virt: function virt(state) {
            return state.search.settings.virt == true;
        },
        any: function any(state) {
            return state.search.settings.any == true;
        },
        virgin: function virgin(state) {
            // Хак для пустых настроек
            if (state.search.settings.city != this.city) {
                return false;
            }
            // Хак для старых настроек NOT Range
            if (state.search.settings.up != this.up) {
                return false;
            }
            if (state.search.settings.to != this.to) {
                return false;
            }
            return this.selectCity == this.city && this.selectWho == this.who && this.selectUp == this.up && this.selectTo == this.to && this.checkedTown == this.town && this.checkedVirt == this.virt && this.checkedAnyCity == this.any;
        }
    }),
    created: function created() {
        var _defaultSettings3 = defaultSettings,
            city = _defaultSettings3.city,
            who = _defaultSettings3.who,
            up = _defaultSettings3.up,
            to = _defaultSettings3.to; // GLOBAL

        this.selectCity = this.city ? this.city : city;
        this.selectWho = this.who ? this.who : who;
        this.selectUp = this.up ? this.up : this.age(up);
        this.selectTo = this.to ? this.to : this.age(to);
        this.checkedTown = this.town;
        this.checkedVirt = this.virt;
        this.checkedAnyCity = this.any;
    },

    methods: {
        age: function age(value) {
            value = Number(value);
            if (!value) {
                return 0;
            }
            var min = _.min(this.ageRange);
            var max = _.max(this.ageRange);
            if (value <= min) {
                return min;
            }
            if (value >= max) {
                return max;
            }
            return _.find(this.ageRange, function (item, index, list) {
                if (index && index < list.length) {
                    if (value > list[index - 1] && value < list[index + 1]) {
                        return true;
                    }
                }
            });
        },

        // setWho(value) {
        //     this.$store.commit('settings', {who: value});
        // },
        // setUp() {
        //     this.$store.commit('settings', {up: this.selectUp});
        // },
        // setTo() {
        //     this.$store.commit('settings', {to: this.selectTo});
        // },
        save: function save() {
            var data = {
                who: this.selectWho,
                city: this.city,
                up: this.selectUp,
                to: this.selectTo,
                town: this.checkedTown,
                virt: this.checkedVirt,
                any: this.checkedAnyCity
            };
            console.log(data);
            if (!this.virgin) {
                this.$store.dispatch('search/SAVE_SEARCH', data);
            }
        },

        // account() {
        //     if (this.root) {
        //         this.$router.push({ name: 'account-settings', params: {root: true} })
        //     } else {
        //         this.$router.push({ name: 'account-settings'})
        //     }
        // },
        close: function close() {
            this.save();
            this.back();
            this.$root.reload();
        }
    },
    template: '#search-settings'
});

var SecuritySettings = Vue.component('security-settings', {
    props: [],
    data: function data() {
        return {
            inputLogin: '',
            inputPasswd: '',
            inputEmail: '',
            checkSubscribe: 0,
            process: false,
            processLogin: false,
            processPasswd: false,
            processEmail: false,
            confirmRemove: false,
            virgin: true
        };
    },

    computed: Vuex.mapState({
        login: function login(state) {
            return state.auth.login;
        },
        passwd: function passwd(state) {
            return state.auth.pass;
        },
        email: function email(state) {
            return state.auth.email;
        },
        promt: function promt(state) {
            return state.auth.promt;
        },
        subscr: function subscr(state) {
            return state.auth.subscr;
        }
    }),
    mounted: function mounted() {
        var _this47 = this;

        console.log('auth/SYNC');
        this.$store.dispatch('auth/SYNC').then(function () {
            _this47.init();
            _this47.process = false;
        }).catch(function () {
            _this47.process = false;
        });
        this.process = true;
        this.init();
    },

    methods: {
        init: function init() {
            this.inputLogin = this.login;
            this.inputPasswd = this.passwd;
            this.inputEmail = this.email;
            this.checkSubscribe = this.subscr;
        },
        deflower: function deflower() {
            this.virgin = false;
        },
        saveLogin: function saveLogin() {
            var _this48 = this;

            this.processLogin = true;
            this.$store.dispatch('auth/SAVE_LOGIN', this.inputLogin).then(function (response) {
                var data = response.data;
                if (data.say) {
                    _this48.$emit('warning', data.say);
                }
                _this48.processLogin = false;
            }).catch(function () {
                _this48.processLogin = false;
            });
        },
        savePasswd: function savePasswd() {
            var _this49 = this;

            this.processPasswd = true;
            this.$store.dispatch('auth/SAVE_PASSWD', this.inputPasswd).then(function (response) {
                var data = response.data;
                if (data.say) {
                    _this49.$emit('warning', data.say);
                }
                _this49.processPasswd = false;
            }).catch(function () {
                _this49.processPasswd = false;
            });
        },
        saveEmail: function saveEmail() {
            var _this50 = this;

            this.processEmail = true;
            this.$store.dispatch('auth/SAVE_EMAIL', this.inputEmail).then(function (response) {
                var data = response.data;
                if (data.err) {
                    _this50.$emit('warning', data.say);
                }
                _this50.processEmail = false;
            }).catch(function () {
                _this50.processEmail = false;
            });
        },
        removeEmail: function removeEmail() {
            var _this51 = this;

            this.confirmRemove = false;
            this.processEmail = true;
            this.$store.dispatch('auth/REMOVE_EMAIL').then(function (response) {
                var data = response.data;
                if (data.err) {
                    _this51.$emit('warning', data.say);
                }
                _this51.processEmail = false;
            }).catch(function () {
                _this51.processEmail = false;
            });
        },
        saveSubscribe: function saveSubscribe() {
            this.$store.dispatch('auth/SAVE_SUSCRIBE');
        },
        close: function close() {
            if (!this.processLogin && !this.processPasswd && !this.processEmail) {
                this.$emit('close');
            } else {
                this.$emit('alert', 'Подождите, сохраняю.');
            }
        }
    },
    template: '#security-settings'
});

var SocialSettings = Vue.component('social-settings', {
    props: [],
    data: function data() {
        return {
            checkedContact: {
                em: 0,
                vk: 0,
                ok: 0,
                fb: 0,
                go: 0,
                sk: 0,
                ph: 0
            },
            virgin: true
        };
    },

    computed: Vuex.mapState({
        contacts: function contacts(state) {
            return state.user.contacts;
        }
    }),
    mounted: function mounted() {
        console.log('user', this.contacts);
        this.checkedContact = this.contacts;
    },

    methods: {
        close: function close() {
            this.save();
            this.$emit('close');
        },
        deflower: function deflower() {
            this.virgin = false;
        },
        save: function save() {
            if (!this.virgin) {
                this.$store.dispatch('SAVE_CONTACTS', this.checkedContact);
            }
        }
    },
    template: '#social-settings'
});

var SexConfirm = Vue.component('sex-confirm', {
    extends: ModalDialog,
    props: ['show'],
    computed: {
        variant: function variant() {
            return this.show ? this.show : 'message';
        },
        caption: function caption() {
            return this.content[this.variant].caption;
        },
        text: function text() {
            return this.content[this.variant].text;
        }
    },
    // beforeRouteLeave(to, from, next) {
    //     if (this.$store.state.user.sex) {
    //         if (this.index('search')) {
    //             console.log('leave-search', [this.$store.state.user.sex, store.state.user.sex, to]);
    //             next({name: 'search-settings'});
    //         }
    //         if (this.index('contacts')) {
    //             console.log('leave', 'contacts');
    //             next({name: 'search-settings'});
    //         }
    //         if (this.index('account')) {
    //             console.log('leave', 'account');
    //             next({name: 'search-settings'});
    //         }
    //         if (this.index('message')) {
    //             console.log('leave', 'message');
    //             next({name: 'search-settings'});
    //         }
    //     }
    //     console.log('leave', 'close');
    //     next();
    // },
    // mounted() {
    //     console.log('confirm', this.variant);
    // },
    methods: {
        close: function close() {
            this.back();
        },
        index: function index(val) {
            return val == this.variant;
        },
        save: function save(sex) {
            this.$store.dispatch('SAVE_SEX', sex);
            this.$emit('select', this.show);
            this.redirect();
        },
        login: function login() {
            this.$emit('login');
            this.$emit('close');
        },
        redirect: function redirect() {
            if (this.index('search')) {
                this.$router.replace('/search');
            } else
                // if (this.index('contacts')) {
                //     console.log('leave', 'contacts');
                //     next({name: 'search-settings'});
                // }
                if (this.index('account')) {
                    this.$router.replace('/settings/account');
                } else if (this.index('message')) {
                    this.$router.replace('/');
                } else if (this.index('city')) {
                    this.$router.replace('/wizard/city');
                } else {
                    this.$router.replace('/');
                }
        }
    },
    data: function data() {
        var content = {
            search: {
                caption: 'Легко начать',
                text: 'Для правильного отображения результатов поиска необходимо указать пол. Вы парень или девушка?'
            },
            contacts: {
                caption: 'Вы девушка?',
                text: 'Начало быстрого общения в один клик. Хотите получать сообщения и новые знакомства? Достаточно подтвердить, парень вы или девушка.'
            },
            message: {
                caption: 'Общение в один клик',
                text: 'Начать общение просто. Хотите получать сообщения и новые знакомства? Достаточно подтвердить, парень вы или девушка.'
                //text: 'Все пользователи желают знать с кем будут общаться. Чтобы продолжить укажите, парень вы или девушка.'
            },
            account: {
                caption: 'Кто вы?',
                text: 'Приватная анкета в один клик. Самое быстрое общение. Достаточно указать кто вы, парень или девушка. И начинайте общаться.'
            }
        };
        content.city = content.contacts;
        return { content: content };
    },

    template: '#sex-confirm'
});

Vue.component('simple-captcha', {
    props: [],
    data: function data() {
        return {
            code: '',
            inc: 0
        };
    },

    computed: {
        src: function src() {
            simple_hash();
            return '/capcha_pic.php?inc=' + this.inc + '&hash=' + hash;
        }
    },
    mounted: function mounted() {},

    methods: {
        close: function close() {
            this.$emit('close');
        },
        update: function update() {
            this.inc++;
        },
        input: function input() {
            this.$emit('input', this.code);
        }
    },
    template: '#simple-captcha'
});

Vue.component('slider-vertical', {
    data: function data() {
        return {
            slide: 1
        };
    }
});
Vue.component('snackbar', {
    props: ['callback', 'action', 'play'],
    computed: {
        time: function time() {
            return this.callback ? 5000 : 3000;
        },
        title: function title() {
            return this.action ? this.action : 'Ok';
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        approve: function approve() {
            this.callback();
        },
        autoplay: function autoplay(event) {
            if (this.play) {
                this.$refs.autoplay.play();
            }
        }
    },
    mounted: function mounted() {
        _.delay(this.close, this.time);
        this.autoplay();
    },

    template: '#snackbar'
});

Vue.component('suggest-input', {
    props: ['url', 'disabled'],
    data: function data() {
        return {
            query: '',
            items: [],
            enable: true
        };
    },

    computed: {
        suggested: function suggested() {
            return this.items.length;
        }
    },
    methods: {
        load: function load() {
            var _this52 = this;

            api.user.get({ q: this.query }, 'tag/suggest').then(function (response) {
                _this52.loaded(response.data);
            });
        },
        reset: function reset() {
            this.query = '';
            this.items = [];
        },
        select: function select(item) {
            this.query = item;
            this.$emit('select', item);
            this.reset();
        },
        loaded: function loaded(data) {
            if (data && data.length) {
                this.items = data;
                console.log('loaded', data);
            } else {
                this.reset();
            }
        }
    },
    template: '#suggest-input'
});

Vue.component('toast', {
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    mounted: function mounted() {
        _.delay(this.close, 2000);
    },

    template: '#toast'
});

Vue.component('upload-dialog', {
    template: '#upload-dialog',
    data: function data() {
        return {
            photos: [],
            server: null
        };
    },

    created: function created() {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        show: function show(index) {
            this.preview(this.photos[index]);
        },
        preview: function preview(photo) {
            var links = photo._links;
            if (links.origin.href) {
                var data = {
                    photo: links.origin.href,
                    thumb: links.thumb.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
                this.$store.commit('sendPhoto', data);
                //console.log('sendPhoto');
                //console.log(data);
            }
            this.close();
        }
    }
});

Vue.component('alert-widget', {
    data: function data() {
        return {
            compact: false
        };
    },
    mounted: function mounted() {
        this.compact = true;
    }
});

Vue.component('photo-dialog', {
    methods: {
        close: function close() {
            this.$emit('close');
            store.commit('viewPhoto', { photo: null });
        }
    },
    computed: Vuex.mapState({
        config: function config(state) {
            return state.photoView;
        }
    }),
    template: '#photo-dialog'
});

// -- Хранилище ---
var storage = {
    enable: 0,
    init: function init() {
        if (storage.is_enable()) {
            storage.enable = 1;
        }
    },
    is_enable: function is_enable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },
    save: function save(key, val) {
        if (storage.enable) {
            localStorage.setItem(key, val);
        }
    },
    load: function load(key, def) {
        var result = def ? def : null;
        if (storage.enable && localStorage.getItem(key)) {
            result = localStorage.getItem(key);
        }
        return result;
    },
    set: function set(key, val) {
        storage.save(key, val);
    },
    get: function get(key, def) {
        storage.load(key, def);
    },

    array: {
        load: function load(key) {
            var result = [];
            var value = null;
            value = storage.load(key);
            value = json.parse(value);
            if (value) result = value;
            return result;
        },
        save: function save(key, val) {
            storage.save(key, json.encode(val));
        },
        add: function add(key, val) {}
    }
};
storage.init();

var about = {
    namespaced: true,
    state: {
        growth: 0,
        weight: 0,
        figure: 0
    },
    actions: {
        SYNC: function SYNC(_ref8) {
            var rootState = _ref8.rootState,
                commit = _ref8.commit,
                getters = _ref8.getters;

            return api.user.syncAbout().then(function (response) {
                commit('update', response.data);
            });
        },
        SAVE: function SAVE(_ref9, data) {
            var state = _ref9.state,
                commit = _ref9.commit;

            api.user.saveAbout({ anketa: data }).then(function (response) {
                commit('update', data);
            });
        }
    },
    mutations: {
        update: function update(state, data) {
            if (data) {
                _.assign(state, data);
            }
        }
    }
};

var accepts = {
    namespaced: true,
    state: {
        photo: false,
        search: false,
        moderator: false
    },
    actions: {
        LOAD: function LOAD(_ref10) {
            var state = _ref10.state;

            var data = ls.get('accepts');
            if (data) {
                _.assign(state, data);
            }
        }
    },
    mutations: {
        photo: function photo(state) {
            state.photo = true;
            ls.set('accepts', state);
        },
        search: function search(state) {
            state.search = true;
            ls.set('accepts', state);
        },
        moderator: function moderator(state, value) {
            state.moderator = value == true;
            ls.set('accepts', state);
        }
    }
};

var auth = {
    namespaced: true,
    state: {
        iss: '',
        exp: '',
        iat: '',
        sid: '',
        uid: '',
        auth: '',
        ip: '',
        login: '',
        pass: '',
        email: '',
        promt: '',
        subscr: false,
        last: '',
        error: ''
    },
    actions: {
        SYNC: function SYNC(_ref11) {
            var commit = _ref11.commit;

            return api.user.syncAuth().then(function (response) {
                commit('update', response.data);
            });
        },
        SAVE_LOGIN: function SAVE_LOGIN(_ref12, data) {
            var commit = _ref12.commit;

            return api.user.saveLogin(data);
        },
        SAVE_PASSWD: function SAVE_PASSWD(_ref13, data) {
            var commit = _ref13.commit;

            return api.user.savePasswd(data);
        },
        SAVE_EMAIL: function SAVE_EMAIL(_ref14, data) {
            var commit = _ref14.commit;

            return api.user.saveEmail(data);
        },
        REMOVE_EMAIL: function REMOVE_EMAIL(_ref15) {
            var commit = _ref15.commit;

            return api.user.removeEmail();
        },
        SAVE_SUSCRIBE: function SAVE_SUSCRIBE(_ref16, data) {
            var store = _ref16.store,
                commit = _ref16.commit;

            commit('subscr');
            return api.user.saveSubscribe();
        },
        UPDATE_KEY: function UPDATE_KEY(_ref17) {
            var store = _ref17.store,
                commit = _ref17.commit;

            return axios.get('/sync/sess/');
        }
    },
    mutations: {
        update: function update(state, data) {
            if (data) {
                _.assign(state, data);
            }
        },
        subscr: function subscr(state) {
            state.subscr = state.subscr ? false : true;
        }
    }
};

var mutations = {
    load: function load(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = data;
        }
    },
    add: function add(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = _.union(state.list, data);
        }
    },
    status: function status(state, _status) {
        state.status = _status;
    },
    notifi: function notifi(state, status) {
        state.notified = status == true;
    }
};
// // //

var initial = _.extend({
    namespaced: true,
    state: {
        status: 8,
        notified: false,
        list: []
    },
    actions: {
        LOAD: function LOAD(_ref18) {
            var state = _ref18.state,
                commit = _ref18.commit,
                rootState = _ref18.rootState;

            commit('load', ls.get('initial-contacts'));
            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then(function (response) {
                commit('load', response.data);
                ls.set('initial-contacts', state.list);
            });
        },
        NEXT: function NEXT(_ref19, offset) {
            var state = _ref19.state,
                commit = _ref19.commit,
                rootState = _ref19.rootState;

            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset: offset
            }).then(function (response) {
                commit('add', response.data);
            });
        },
        DELETE: function DELETE(_ref20, index) {
            var state = _ref20.state,
                commit = _ref20.commit,
                rootState = _ref20.rootState;

            var result = api.contacts.initial.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ: function READ(_ref21, index) {
            var state = _ref21.state,
                commit = _ref21.commit,
                rootState = _ref21.rootState;

            var result = api.contacts.initial.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        },
        CHECK: function CHECK(_ref22) {
            var commit = _ref22.commit;

            axios.get('/mailer/check_contact').then(function () {
                commit('status', 8);
                commit('notifi', false);
            });
        }
    },
    mutations: _.extend({
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('initial-contacts', state.list);
        },
        read: function read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('initial-contacts', state.list);
        }
    }, mutations)
});

var intimate = _.extend({
    namespaced: true,
    state: {
        status: 8,
        notified: false,
        list: []
    },
    actions: {
        LOAD: function LOAD(_ref23) {
            var state = _ref23.state,
                commit = _ref23.commit,
                rootState = _ref23.rootState;

            commit('load', ls.get('intimate-contacts'));
            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then(function (response) {
                commit('load', response.data);
                ls.set('intimate-contacts', state.list);
            });
        },
        NEXT: function NEXT(_ref24, offset) {
            var state = _ref24.state,
                commit = _ref24.commit,
                rootState = _ref24.rootState;

            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset: offset
            }).then(function (response) {
                commit('add', response.data);
            });
        },
        DELETE: function DELETE(_ref25, index) {
            var state = _ref25.state,
                commit = _ref25.commit,
                rootState = _ref25.rootState;

            var result = api.contacts.intimate.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ: function READ(_ref26, index) {
            var state = _ref26.state,
                commit = _ref26.commit,
                rootState = _ref26.rootState;

            var result = api.contacts.intimate.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        },
        CHECK: function CHECK(_ref27) {
            var commit = _ref27.commit;

            axios.get('/mailer/check_message').then(function () {
                commit('status', 8);
                commit('notifi', false);
            });
        }
    },
    mutations: _.extend({
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('intimate-contacts', state.list);
        },
        read: function read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('intimate-contacts', state.list);
        }
    }, mutations)
});

var sends = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD: function LOAD(_ref28) {
            var state = _ref28.state,
                commit = _ref28.commit,
                rootState = _ref28.rootState;

            commit('load', ls.get('sends-contacts'));
            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then(function (response) {
                commit('load', response.data);
                ls.set('sends-contacts', state.list);
            });
        },
        NEXT: function NEXT(_ref29, offset) {
            var state = _ref29.state,
                commit = _ref29.commit,
                rootState = _ref29.rootState;

            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset: offset
            }).then(function (response) {
                commit('add', response.data);
            });
        },
        DELETE: function DELETE(_ref30, index) {
            var state = _ref30.state,
                commit = _ref30.commit,
                rootState = _ref30.rootState;

            var result = api.contacts.sends.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        }
    },
    mutations: _.extend({
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('sends-contacts', state.list);
        }
    }, mutations)
});

var contacts = {
    modules: {
        initial: initial,
        intimate: intimate,
        sends: sends
    }
};

var credits = {
    state: {
        count: 0,
        info: ''
    },
    actions: {},
    mutations: {}
};

var desires = {
    namespaced: true,
    state: {
        list: [],
        limit: 20
    },
    actions: {
        PICK: function PICK(_ref31) {
            var commit = _ref31.commit;

            commit('update', ls.get('desires'));
        },
        SYNC: function SYNC(_ref32) {
            var state = _ref32.state,
                commit = _ref32.commit;

            commit('update', ls.get('desires'));
            return api.user.desireList().then(function (response) {
                commit('update', response.data);
                ls.set('desires', state.list);
            });
        },
        ADD: function ADD(_ref33, tag) {
            var state = _ref33.state,
                commit = _ref33.commit;

            //commit('add', tag);
            return api.user.desireAdd(tag).then(function (response) {
                var id = response.data.id;
                commit('add', { id: id, tag: tag });
            });
        },
        DELETE: function DELETE(_ref34, index) {
            var state = _ref34.state,
                commit = _ref34.commit;

            var result = api.user.desireDelete(state.list[index].id);
            commit('delete', index);
            return result;
        }
    },
    mutations: {
        update: function update(state, data) {
            if (data && data.length) {
                state.list = data.slice();
            }
        },
        add: function add(state, data) {
            state.list.unshift(data);
            state.list = state.list.slice(0, state.limit);
            ls.set('desires', state.list);
        },
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('desires', state.list);
        }
    },
    getters: {
        tags: function tags(state) {
            return _.pluck(state.list, 'tag');
        }
    }
};

var modals = {
    state: {
        initial: false,
        intimate: false,
        sends: false
    },
    mutations: {
        showInitial: function showInitial(state, data) {
            store.commit('closeAll');
            state.initial = data == true;
        },
        showIntimate: function showIntimate(state, data) {
            store.commit('closeAll');
            state.intimate = data == true;
        },
        showSends: function showSends(state, data) {
            store.commit('closeAll');
            state.sends = data == true;
        },
        closeAll: function closeAll(state) {
            state.initial = false;
            state.intimate = false;
            state.sends = false;
        }
    }
};

var moderator = {
    state: {
        promt: 0,
        rank: 0,
        resident: 0,
        action: 0,
        effect: 0,
        bunn: 0,
        rang: ''
    },
    actions: {},
    mutations: {}
};

var notes = {
    namespaced: true,
    state: {
        db: null
    },
    actions: {
        INIT: function INIT(_ref35) {
            var state = _ref35.state,
                commit = _ref35.commit,
                rootState = _ref35.rootState;

            api.raw.load(null, 'static/json/notes/' + rootState.locale + '.json').then(function (_ref36) {
                var data = _ref36.data;

                state.db.transaction('rw', state.db.writes, function () {
                    _.each(data.reverse(), function (element, index, list) {
                        commit('add', element);
                    });
                });
            });
        },
        LOAD: function LOAD(_ref37) {
            var state = _ref37.state,
                dispatch = _ref37.dispatch,
                rootState = _ref37.rootState;

            var uid = rootState.user.uid;
            state.db = new Dexie("DataBaseFS__" + uid);
            state.db.version(1).stores({
                writes: "++id, &text, count, updated"
            });
            state.db.on('ready', function () {
                state.db.writes.count(function (count) {
                    if (!count) {
                        dispatch('INIT');
                    }
                });
            });
            state.db.open();
        },
        WRITES: function WRITES(_ref38) {
            var state = _ref38.state;

            return state.db.writes.orderBy('count').reverse().limit(100).sortBy('updated');
        },
        ITEM: function ITEM(_ref39, id) {
            var state = _ref39.state,
                commit = _ref39.commit;

            return state.db.writes.get(id);
        },
        UPDATE: function UPDATE(_ref40, text) {
            var state = _ref40.state,
                commit = _ref40.commit;

            var updated = getTimestamp();
            state.db.writes.get({ text: text }).then(function (item) {
                if (item) {
                    count = item.count ? item.count : 0;
                    count += 1; // console.log('UPDATE', [count, updated]);
                    state.db.writes.update(item.id, { count: count, updated: updated });
                } else {
                    commit('add', text);
                }
            });
        }
    },
    mutations: {
        add: function add(state, text) {
            var updated = getTimestamp();
            state.db.writes.add({ text: text, count: 0, updated: updated });
        }
    }
};

var search = {
    namespaced: true,
    state: {
        list: [],
        last: [],
        received: 0,
        next: null,
        batch: 15,
        url: '',
        human: {
            name: '',
            age: 0,
            city: ''
        },
        settings: {
            who: 0,
            city: '',
            up: null,
            to: null,
            town: false,
            virt: false,
            any: false
        }
    },
    actions: {
        HUMAN: function HUMAN(_ref41, tid) {
            var commit = _ref41.commit;

            var index = 'human.data.' + tid;
            commit('resetHuman', tid);
            commit('setHuman', ls.get(index));
            console.log('HUMAN', tid);
            return api.search.get({ tid: tid }).then(function (response) {
                commit('setHuman', response.data);
                ls.set(index, response.data, 1500);
            });
        },
        LOAD: function LOAD(_ref42) {
            var state = _ref42.state,
                rootState = _ref42.rootState,
                commit = _ref42.commit;
            var _state$settings = state.settings,
                who = _state$settings.who,
                city = _state$settings.city,
                up = _state$settings.up,
                to = _state$settings.to,
                any = _state$settings.any;

            var sex = rootState.user.sex;
            up = up ? up : 0;
            to = to ? to : 0;
            if (!city || any) {
                city = null;
            }
            return api.search.load({ sex: sex, who: who, city: city, up: up, to: to, next: state.next }).then(function (_ref43) {
                var data = _ref43.data;

                commit('results', data);
                commit('last', data);
                commit('next');
            });
        },
        RESET_SEARCH: function RESET_SEARCH() {},
        SETTINGS: function SETTINGS(_ref44) {
            var commit = _ref44.commit;

            commit('settingsCookies');
            commit('settings', ls.get('search.settings'));
            //let index = 'search.settings';
        },
        SAVE_SEARCH: function SAVE_SEARCH(_ref45, data) {
            var state = _ref45.state,
                commit = _ref45.commit;

            commit('settings', data);
            ls.set('search.settings', data);
            return api.user.saveSearch(data).then(function (response) {});
        }
    },
    mutations: {
        reset: function reset(state) {
            state.next = 0;
            state.list = [];
            state.received = 0;
        },

        // Сбросить предыдущие данные, если там что-то не то
        resetHuman: function resetHuman(state, tid) {
            if (state.human && state.human.id != tid) {
                state.human = {};
            }
        },
        setHuman: function setHuman(state, data) {
            if (data) {
                state.human = data;
            }
        },
        results: function results(state, _ref46) {
            var users = _ref46.users;

            state.received = users ? users.length : 0;
            if (users && state.received) {
                state.list = _.union(state.list, users);
            }
            state.next += state.batch;
        },
        last: function last(state, _ref47) {
            var users = _ref47.users;

            if (users && !state.last) {
                state.last = users;
                ls.set('last-search', users, 31 * 24 * 60 * 60);
            }
        },
        settings: function settings(state, data) {
            if (data) {
                //console.log('settings:', data);
                _.assign(state.settings, data);
            }
        },
        next: function next(state, reset) {
            if (reset) {
                state.next = 0;
            } else {
                state.next += state.batch;
            }
        },
        settingsCookies: function settingsCookies(state) {
            var data = get_cookie('mail_sett');
            if (data) {
                try {
                    data = JSON.parse(data);
                } catch (e) {}
                state.settings.city = data.city;
                state.settings.who = Number(data.who);
                state.settings.up = Number(data.up);
                state.settings.to = Number(data.to);
                state.settings.town = Boolean(data.town);
                state.settings.virt = Boolean(data.virt);
                //console.log('dataCookies:', data);
            }
        }
    },
    getters: {
        virgin: function virgin(state, getters, rootState) {
            var _state$settings2 = state.settings,
                who = _state$settings2.who,
                up = _state$settings2.up,
                to = _state$settings2.to;

            return !who && !rootState.user.city && !up && !to;
        },
        more: function more(state) {
            return state.received && state.received == state.batch ? true : false;
        },
        tags: function tags(state) {
            return _.compact(_.union(_.flatten(_.pluck(state.list, 'tags'))));
        }
    }
};

var user = {
    state: {
        uid: 0,
        sex: 0,
        age: 0,
        name: '',
        city: '',
        contacts: {
            em: 0,
            vk: 0,
            ok: 0,
            fb: 0,
            go: 0,
            sk: 0,
            ph: 0
        },
        tags: {
            str: ''
        },
        status: 0,
        promt: null,
        last: ''
    },
    actions: {
        LOAD_USER: function LOAD_USER(_ref48) {
            var commit = _ref48.commit;

            // if (uid) {
            //     commit('loadUser', {uid});
            // }
            commit('loadUser', ls.get('user.data'));
        },
        SAVE_SEX: function SAVE_SEX(_ref49, sex) {
            var state = _ref49.state,
                commit = _ref49.commit;

            commit('loadUser', { sex: sex, name: '' });
            if (sex) {
                api.user.saveSex(sex).then(function (response) {});
                commit('loadUser', { sex: sex });
            }
        },
        SAVE_AGE: function SAVE_AGE(_ref50, age) {
            var state = _ref50.state,
                commit = _ref50.commit;

            if (age && state.age != age) {
                api.user.saveAge(age).then(function (response) {});
                commit('loadUser', { age: age });
            }
        },
        SAVE_NAME: function SAVE_NAME(_ref51, name) {
            var state = _ref51.state,
                commit = _ref51.commit;

            if (name && state.name != name) {
                api.user.saveName(name).then(function (response) {});
                commit('loadUser', { name: name });
            }
        },
        SAVE_CITY: function SAVE_CITY(_ref52, city) {
            var state = _ref52.state,
                commit = _ref52.commit;

            if (city && state.city != city) {
                api.user.saveCity(city).then(function (response) {});
                commit('loadUser', { city: city });
            }
        },
        SAVE_CONTACTS: function SAVE_CONTACTS(_ref53, contacts) {
            var state = _ref53.state,
                commit = _ref53.commit;

            api.user.saveContacts(contacts).then(function (response) {});
            commit('loadUser', { contacts: contacts });
        }
    },
    mutations: {
        loadUser: function loadUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', state, 23456);
        },
        resetUser: function resetUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', data, 23456);
        }
    }
};

var visited = {
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        SYNC: function SYNC(_ref54) {
            var rootState = _ref54.rootState,
                state = _ref54.state,
                commit = _ref54.commit;

            var index = 'visited-' + rootState.user.uid;
            commit('update', ls.get(index));
            return api.user.visitedList().then(function (response) {
                var data = response.data;

                commit('update', data);
                ls.set(index, state.list, 31 * 24 * 60 * 60);
            });
        },
        ADD: function ADD(_ref55, tid) {
            var rootState = _ref55.rootState,
                state = _ref55.state,
                commit = _ref55.commit;

            var uid = rootState.user.uid;
            var index = 'visited-' + uid;
            commit('add', tid);
            ls.set(index, state.list, 31 * 24 * 60 * 60);
            return api.user.visitedAdd(uid, tid).then(function (response) {});
        }
    },
    mutations: {
        update: function update(state, data) {
            if (data && data.length) {
                state.list = _.union(state.list, data);
            }
        },
        add: function add(state, data) {
            state.list.unshift(data);
        }
    }
};

moment.locale('ru');

var ls = lscache;

var store = new Vuex.Store({
    modules: {
        user: user,
        auth: auth,
        about: about,
        search: search,
        contacts: contacts,
        desires: desires,
        visited: visited,
        accepts: accepts,
        modals: modals,
        notes: notes
    },
    state: {
        ready: false,
        locale: 'ru',
        apiToken: '',
        photoServer: '195.154.54.70',
        simple: false
    },
    actions: {
        LOAD_API_TOKEN: function LOAD_API_TOKEN(_ref56) {
            var commit = _ref56.commit;

            commit('setApiToken', { apiToken: get_cookie('jwt') });
        }
    },
    mutations: {
        setApiToken: function setApiToken(state, data) {
            if (data) {
                _.assign(state, data);
            }
            //console.log(state)
        },
        simple: function simple(state, data) {
            state.simple = data == true;
        },
        ready: function ready(state, data) {
            state.ready = data == true;
        }
    },
    getters: {
        registered: function registered(state) {
            return state.apiToken ? true : false;
        }
    }
});

store.dispatch('LOAD_API_TOKEN');
store.dispatch('accepts/LOAD');
store.dispatch('LOAD_USER');
store.dispatch('search/SETTINGS');

var Api = function () {
    function Api(host, key, version, routing) {
        _classCallCheck(this, Api);

        host = host ? host : '/';
        // Delay requests sec
        this.setDelay('0');
        // [!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
        this.setRoot(host, version);
        this.setConfig(this.root, key);
        this.setRouting(routing);
    }

    _createClass(Api, [{
        key: 'setDelay',
        value: function setDelay(sec) {
            this.wait = sec * 1000; //
        }
    }, {
        key: 'setRouting',
        value: function setRouting(routing) {
            this.routing = {
                route: '',
                load: '',
                get: '{resource_id}',
                cget: '',
                send: '',
                post: '',
                save: '',
                remove: '',
                delete: '{resource_id}',
                put: '{resource_id}',
                patch: '{resource_id}',
                option: '{resource_id}'
            };
            _.extend(this.routing, routing);
        }
    }, {
        key: 'setRoot',
        value: function setRoot(host, version) {
            var ver = version ? 'v' + version + '/' : '';
            this.root = host + ver;
        }
    }, {
        key: 'setConfig',
        value: function setConfig(url, key) {
            this.config = {
                baseURL: url,
                headers: {
                    'Authorization': 'Bearer ' + key
                }
            };
        }
    }, {
        key: 'setBaseURL',
        value: function setBaseURL(url) {
            _.extend(this.config, {
                baseURL: url
            });
        }
    }, {
        key: 'setAuthKey',
        value: function setAuthKey(key) {
            _.extend(this.config.headers, {
                'Authorization': 'Bearer ' + key
            });
            this.key = key;
        }
    }, {
        key: 'setParams',
        value: function setParams(params, url) {
            var result = url.replace(/\{(.*?)\}/ig, function (match, token) {
                var slug = params[token];
                delete params[token];
                return slug;
            });
            //console.log('url: ', [this.root, result, params]);
            this.config.params = params ? params : {};
            return result;
        }
    }, {
        key: 'setUrl',
        value: function setUrl(method, params, url) {
            this.refresh();
            var route = this.routing.route;
            if (url) {
                result = url;
            } else {
                var action = this.routing[method];
                result = route ? route : '';
                if (result && action) {
                    result = result + '/' + action;
                } else if (action) {
                    result = action;
                }
            }
            result = this.setParams(params, result);
            return this.root + result;
        }
    }, {
        key: 'get',
        value: function get(params, url) {
            return this.delay(axios.get(this.setUrl('get', params, url), this.config), 0);
        }
    }, {
        key: 'load',
        value: function load(params, url) {
            return this.delay(axios.get(this.setUrl('load', params, url), this.config), 0);
        }
    }, {
        key: 'cget',
        value: function cget(params, url) {
            return this.delay(axios.get(this.setUrl('cget', params, url), this.config), 0);
        }
    }, {
        key: 'send',
        value: function send(params, url) {
            return this.delay(axios.get(this.setUrl('send', params, url), this.config), 0);
        }
    }, {
        key: 'post',
        value: function post(data, params, url) {
            return this.delay(axios.post(this.setUrl('post', params, url), data, this.config), 0);
        }
    }, {
        key: 'save',
        value: function save(data, params, url) {
            return this.delay(axios.post(this.setUrl('save', params, url), data, this.config), 0);
        }
    }, {
        key: 'remove',
        value: function remove(data, params, url) {
            return this.delay(axios.post(this.setUrl('remove', params, url), data, this.config), 0);
        }
    }, {
        key: 'delete',
        value: function _delete(params, url) {
            return this.delay(axios.delete(this.setUrl('delete', params, url), this.config), 0);
        }
    }, {
        key: 'put',
        value: function put(data, params, url) {
            return this.delay(axios.put(this.setUrl('put', params, url), data, this.config), 0);
        }
    }, {
        key: 'patch',
        value: function patch(data, params, url) {
            return this.delay(axios.patch(this.setUrl('patch', params, url), data, this.config), 0);
        }
    }, {
        key: 'request',
        value: function request(method, action, data, params, url) {
            // this.config.method = method;
            // this.config.url = this.setUrl(action, url);
            // this.config.data = data;
            // this.config.params = params;
            // return this.delay(axios.request(this.config), 0);
            if (data) {
                return this.delay(axios[method](this.setUrl(action, params, url), data, this.config), 0);
            } else {
                return this.delay(axios[method](this.setUrl(action, params, url), this.config), 0);
            }
        }
    }, {
        key: 'option',
        value: function option() {}
    }, {
        key: 'delay',
        value: function delay(result, wait) {
            var msec = wait ? wait : this.wait;
            if (msec < this.wait) {
                msec = this.wait;
            }
            if (msec == 0 || typeof Promise == "undefined") {
                return result;
            }
            return new Promise(function (resolve, reject) {
                _.delay(resolve, msec, result);
            });
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            store.dispatch('LOAD_API_TOKEN');
        }
    }]);

    return Api;
}();

var ApiBun = function (_Api) {
    _inherits(ApiBun, _Api);

    function ApiBun() {
        _classCallCheck(this, ApiBun);

        var key = '1234';
        var host = '/';
        return _possibleConstructorReturn(this, (ApiBun.__proto__ || Object.getPrototypeOf(ApiBun)).call(this, host, key));
    }

    _createClass(ApiBun, [{
        key: 'send',
        value: function send(data) {

            return axios.post('mess/bun/', data, this.config);
            console.log('ApiBun Bun-Bun');
        }
    }]);

    return ApiBun;
}(Api);

var ApiMessages = function (_Api2) {
    _inherits(ApiMessages, _Api2);

    function ApiMessages() {
        _classCallCheck(this, ApiMessages);

        var key = '1234';
        var host = '/';
        return _possibleConstructorReturn(this, (ApiMessages.__proto__ || Object.getPrototypeOf(ApiMessages)).call(this, host, key));
    }

    _createClass(ApiMessages, [{
        key: 'send',
        value: function send(data) {
            return this.post(data, null, 'mailer/post/');
        }
    }]);

    return ApiMessages;
}(Api);

var ApiModerator = function (_Api3) {
    _inherits(ApiModerator, _Api3);

    function ApiModerator() {
        _classCallCheck(this, ApiModerator);

        var key = '1234';
        var host = '/';
        return _possibleConstructorReturn(this, (ApiModerator.__proto__ || Object.getPrototypeOf(ApiModerator)).call(this, host, key));
    }

    _createClass(ApiModerator, [{
        key: 'promt',
        value: function promt() {
            return this.post(null, null, 'moder/promt');
        }
    }, {
        key: 'load',
        value: function load() {
            return this.post(null, null, 'moder/auth');
        }
    }, {
        key: 'press',
        value: function press(data) {
            return this.post(data, null, 'moder/press');
        }
    }]);

    return ApiModerator;
}(Api);

var ApiUser = function (_Api4) {
    _inherits(ApiUser, _Api4);

    function ApiUser() {
        _classCallCheck(this, ApiUser);

        var key = '1234';
        var host = '/';
        return _possibleConstructorReturn(this, (ApiUser.__proto__ || Object.getPrototypeOf(ApiUser)).call(this, host, key, null, null));
    }

    _createClass(ApiUser, [{
        key: 'saveSex',
        value: function saveSex(sex) {
            return this.save({ sex: sex }, null, 'option/sex');
        }
    }, {
        key: 'saveAge',
        value: function saveAge(age) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { age: age }, null, 'option/age');
        }
    }, {
        key: 'saveName',
        value: function saveName(name) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { name: name }, null, 'option/name');
        }
    }, {
        key: 'saveCity',
        value: function saveCity(city) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { city: city }, null, 'option/city');
        }
    }, {
        key: 'saveContacts',
        value: function saveContacts(data) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { contact: data }, null, 'option/contact');
        }
    }, {
        key: 'saveSearch',
        value: function saveSearch(data) {
            data = {
                search_sex: data.who,
                years_up: data.up,
                years_to: data.to,
                option_mess_town: data.town,
                option_virt_accept: data.virt
            };
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, data, null, 'msett/save');
        }
    }, {
        key: 'syncAbout',
        value: function syncAbout() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'load', this).call(this, null, 'sync/anketa');
        }
    }, {
        key: 'saveAbout',
        value: function saveAbout(data) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, data, null, 'option/anketa');
        }
    }, {
        key: 'syncAuth',
        value: function syncAuth() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'load', this).call(this, null, 'sync/authdata');
        }
    }, {
        key: 'saveLogin',
        value: function saveLogin(login) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { login: login }, null, 'option/login');
        }
    }, {
        key: 'savePasswd',
        value: function savePasswd(pass) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { pass: pass }, null, 'option/passwd');
        }
    }, {
        key: 'saveEmail',
        value: function saveEmail(email) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { email: email }, null, 'option/email');
        }
    }, {
        key: 'removeEmail',
        value: function removeEmail() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'remove', this).call(this, null, null, 'option/demail');
        }
    }, {
        key: 'saveSubscribe',
        value: function saveSubscribe() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, null, null, 'option/subscr');
        }
    }, {
        key: 'desireList',
        value: function desireList() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'load', this).call(this, null, 'tag/user');
        }
    }, {
        key: 'desireAdd',
        value: function desireAdd(tag) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { tag: tag }, null, 'tag/add');
        }
    }, {
        key: 'desireDelete',
        value: function desireDelete(id) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'remove', this).call(this, { id: id }, null, 'tag/del');
        }
    }, {
        key: 'visitedList',
        value: function visitedList() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'load', this).call(this, null, 'contact/visited');
        }
    }, {
        key: 'visitedAdd',
        value: function visitedAdd(uid, tid) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'send', this).call(this, { tid: tid, uid: uid }, 'contact/addvisit/{uid}');
        }
    }]);

    return ApiUser;
}(Api);

var ApiSearch = function (_Api5) {
    _inherits(ApiSearch, _Api5);

    function ApiSearch() {
        _classCallCheck(this, ApiSearch);

        var key = '1234';
        var host = 'http://212.83.162.58/';
        var routing = {
            route: 'users',
            get: '{tid}'
        };
        return _possibleConstructorReturn(this, (ApiSearch.__proto__ || Object.getPrototypeOf(ApiSearch)).call(this, host, key, null, routing));
    }

    return ApiSearch;
}(Api);

var ApiContact = function (_Api6) {
    _inherits(ApiContact, _Api6);

    function ApiContact(routing) {
        _classCallCheck(this, ApiContact);

        var key = store.state.apiToken;
        var host = 'http://212.83.134.89:9000/';
        return _possibleConstructorReturn(this, (ApiContact.__proto__ || Object.getPrototypeOf(ApiContact)).call(this, host, key, null, routing));
    }

    _createClass(ApiContact, [{
        key: 'refresh',
        value: function refresh() {
            store.dispatch('LOAD_API_TOKEN');
            this.setAuthKey(store.state.apiToken);
        }
    }]);

    return ApiContact;
}(Api);

var ApiInitial = function (_ApiContact) {
    _inherits(ApiInitial, _ApiContact);

    function ApiInitial() {
        _classCallCheck(this, ApiInitial);

        var routing = {
            route: 'users/{uid}/initials'
        };
        return _possibleConstructorReturn(this, (ApiInitial.__proto__ || Object.getPrototypeOf(ApiInitial)).call(this, routing));
    }

    return ApiInitial;
}(ApiContact);

var ApiIntimate = function (_ApiContact2) {
    _inherits(ApiIntimate, _ApiContact2);

    function ApiIntimate() {
        _classCallCheck(this, ApiIntimate);

        var routing = {
            route: 'users/{uid}/intimates'
        };
        return _possibleConstructorReturn(this, (ApiIntimate.__proto__ || Object.getPrototypeOf(ApiIntimate)).call(this, routing));
    }

    return ApiIntimate;
}(ApiContact);

var ApiSends = function (_ApiContact3) {
    _inherits(ApiSends, _ApiContact3);

    function ApiSends() {
        _classCallCheck(this, ApiSends);

        var routing = {
            route: 'users/{uid}/sends'
        };
        return _possibleConstructorReturn(this, (ApiSends.__proto__ || Object.getPrototypeOf(ApiSends)).call(this, routing));
    }

    return ApiSends;
}(ApiContact);

var api = {
    user: new ApiUser(),
    search: new ApiSearch(),
    bun: new ApiBun(),
    contacts: {
        initial: new ApiInitial(),
        intimate: new ApiIntimate(),
        sends: new ApiSends()
    },
    messages: new ApiMessages(),
    moderator: new ApiModerator(),
    raw: new Api()
};

//ApiMessages.send();


// window.onbeforeunload = function(e) {
//   var dialogText = 'Вы действительно хотите покинуть приложение?';
//   e.returnValue = dialogText;
//   return dialogText;
// };

////
// РОУТЕР ==========================================================
////

// const routes = [
//     { path: '/sends-contacts', name: 'sends', component: SendsDialog, props: { quick: false } },
//     { path: '/initial-contacts', name: 'initial', component: InitialDialog, props: { quick: true } },
//     { path: '/intimate-contacts',  name: 'intimate', component: IntimateDialog, props: { quick: false },
//         // children: [
//         //     {
//         //         path: 'quick-reply',
//         //         component: HumanDialog,
//         //         props: {
//         //             show : true
//         //         }
//         //     },
//         // ]
//     }
// ];

var routes = [{ path: '/write/:humanId(\\d+)/(.*)?', name: 'quickWrite', component: QuickMessage, props: true,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/message');
    }
},
// { path: '/', name: 'search', component: SearchActivity,
//     beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search'),
//     children: [
//         { path: ':humanId(\\d+)/(.*)?', name: 'quickMessage', meta: {back: '/search'}, component: QuickMessage, props: true },
//     ]
// },
{ path: '/initial/(.*)?', name: 'initial', component: InitialDialog, props: { reply: true },
    //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
    children: [{ path: ':humanId(\\d+)/(.*)?', name: 'quickReply', meta: { back: '/initial' }, component: QuickReply, props: true }]
}, { path: '/intimate/(.*)?', name: 'intimate', component: IntimateDialog, props: true,
    //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
    children: [{ path: ':humanId(\\d+)/(.*)?', name: 'dialog', meta: { back: '/intimate' }, component: MessagesActivity, props: true,
        children: [{ path: 'uploads', name: 'uploads', meta: { back: '.' }, component: PhotoSettings, props: true }, { path: 'incoming', name: 'incoming', meta: { back: '.' }, component: IncomingPhoto, props: true }]
    }]
}, { path: '/confirm-sex/:show?', component: SexConfirm, props: true }, { path: '/protect', component: ModeratorActivity }, { path: '/content/deal/:link/:locale?', component: DealContentPage, props: true }, { path: '/content/rules/:locale?', component: RulesContentPage, props: true }, { path: '/promo/:link', component: ContentModal, props: true }, { path: '(.*)?/settings/search', meta: { back: '/' }, component: SearchSettings,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/search');
    }
}, { path: '(.*)?/settings/account', component: AccountSettings,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/account');
    }
}, { path: '(.*)?/settings/other', component: OtherSettings }, { path: '(.*)?/settings/about', meta: { back: 'other' }, component: AboutSettings }, { path: '(.*)?/settings/social', meta: { back: 'other' }, component: SocialSettings }, { path: '(.*)?/settings/desires', meta: { back: 'other' }, component: DesiresSettings,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/search');
    }
}, { path: '(.*)?/settings/security', meta: { back: 'other' }, component: SecuritySettings }, { path: '(.*)?/wizard/city', meta: { back: '/settings/account' }, component: CityWizard,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/city');
    }
}];

var router = new VueRouter({
    //mode: 'history',
    routes: routes
});

// router.beforeEach((to, from, next) => {
//     console.log('router:', [to, from]);
//     next();
// });

// =================================================================
//
// =================================================================

var settingsRouter = new VueRouter({
    //mode: 'history',
    routes: [{ path: '/search/settings/account', meta: { back: 'search' }, component: AccountSettings }, { path: '(.*)?/:humanId(\\d+)/detail', component: AccountActivity, props: true }, { path: '(.*)?/notepad', component: Notepad, props: true },
    // { path: '(.*)?/uploads', component: PhotoSettings },
    // { path: '(.*)?/preview', name: 'preview', component: PhotoViewer, props: true },

    { path: '/login', name: 'login', component: LoginAccount }]
});

settingsRouter.beforeEach(function (to, from, next) {
    // console.log('sRouter:', [to, from]);
    if (!to.meta.back) {
        to.meta.back = from.fullPath;
    }
    next();
});

var app = new Vue({
    data: {
        alert: '',
        snackbar: {
            text: '',
            callback: null,
            action: ''
        }
    },
    mounted: function mounted() {
        this.$store.dispatch('notes/LOAD');
    },

    computed: {
        humanId: function (_humanId) {
            function humanId() {
                return _humanId.apply(this, arguments);
            }

            humanId.toString = function () {
                return _humanId.toString();
            };

            return humanId;
        }(function () {
            return humanId ? humanId : null;
        }),
        simple: function simple() {
            return this.$store.state.simple;
        },
        ready: function ready() {
            return this.$store.state.ready;
        },
        promt: function promt() {
            var promt = this.$store.state.user.promt;

            return !promt || promt == 'no';
        },
        tags: function tags() {
            return this.$store.getters['search/tags'];
        },
        human: function human() {
            var result = humanData ? json.parse(humanData) : null;
            return result && _.isObject(result) && _.has(result, 'id') ? result : [];
        }
    },
    methods: {
        showSnackbar: function showSnackbar(text, callback, action, play) {
            console.log('snackbar', text);
            this.snackbar.text = text;
            this.snackbar.callback = callback;
            this.snackbar.action = action;
            this.snackbar.play = play == true;
        },
        toast: function toast(text) {
            this.alert = text;
        },
        reload: function reload() {
            var home = this.$refs.results;
            home ? home.reload() : this.redirectHome();
            // Hard reload mail page to home
        },
        redirectHome: function redirectHome() {
            console.log('Hard reload mail page to home');
            window.location = '/';
        }
    },
    el: '#app',
    store: store,
    router: router
});

new Vue({
    data: {
        warning: '',
        alert: ''
    },
    methods: {
        snackbar: function snackbar(text) {
            this.warning = text;
        },
        toast: function toast(text) {

            this.alert = text;
        }
    },
    el: '#settings',
    store: store,
    router: settingsRouter
});

$(document).ready(function () {
    navigate.init();
});

// -- Получить новый хэш ---
var hash;
function simple_hash() {
    var now = new Date();
    hash = now.getTime();
}

// Навигация с помошью клавиатуры
var navigate = {

    enable: 0,

    init: function init() {
        $(document).on('keydown', function () {
            navigate.through(event);
        });
    },

    // Отправка сообщения по CTRL + Enter
    post_form: function post_form(event, formElem) {
        if (event.ctrlKey && (event.keyCode == 10 || event.keyCode == 13)) {
            formElem.submit();
        }
    },

    // Навигация с помошью стрелок + CTRL
    through: function through(event) {
        if (window.event) event = window.event;

        if (event.ctrlKey) {
            var link = null;
            var href = null;
            switch (event.keyCode ? event.keyCode : event.which ? event.which : null) {
                case 0x25:
                    link = '#previous_page';
                    break;
                case 0x27:
                    link = '#next_page';
                    break;
                case 0x26:
                    link = '#up_page';
                    break;
                case 0x28:
                    link = '#down_page';
                    break;
                case 0x24:
                    link = '#home_page';
                    break;
            }
            if ($('a').is(link)) // alert($(link).attr('href')); return false;
                document.location = $(link).attr('href');
        }
    }

    // -- Блокнот ---
};var notepad = {

    note_block: null,
    last_click: null,
    disibled: 0,
    create: 0,

    init: function init() {
        if (device.width() < 1000) {
            notepad.disibled = 1;
        }

        notepad.disibled = get_cookie('note_vis') * 1 ? 1 : 0; //////////////////////////

        active_textarea = $('#mess_text_val');
        notepad.note_block = $('.notepad');

        $('textarea').click(function () {
            active_textarea = this;
            notepad.show();
        });

        $('#notepad_on').click(function () {
            notepad.toggle_disable('on');notepad.show('force');
        });

        $('.close', notepad.note_block).click(function () {
            notepad.hide();
        });
        $('.post', notepad.note_block).click(function () {
            notepad.toggle_disable('off');notepad.hide();
        });
        $('.bunn', notepad.note_block).click(function () {
            notepad.toggle_disable('off');notepad.hide();
        });
    },

    hide: function hide() {
        notepad.note_block.hide('fade');
    },

    show: function show(force) {
        if (!notepad.disibled) if (force || active_textarea && notepad.last_click != active_textarea) {
            if (notepad.create) {
                notepad.note_block.show('fade');
                notepad.last_click = active_textarea; /////////////////////////////
            } else notepad.ajax_load();
        }
    },

    toggle_disable: function toggle_disable(vset) {
        if (vset == 'off') notepad.disibled = 1;
        if (vset == 'on') notepad.disibled = 0;

        if (vset) {
            set_cookie('note_vis', notepad.disibled, 259200); /////////////////////////
        }
    },

    ajax_load: function ajax_load() {
        simple_hash();
        $.get('/ajax/load_notepad.php', { hash: hash }, notepad.on_load);
    },

    remind: function remind() {
        var top = storage.load('notepad_top');
        var left = storage.load('notepad_left');

        if (top && top < 40) top = 50;
        if (left && left < 10) left = 10;
        if (top > device.height() - 300) top = 0;
        if (left > device.width() - 300) left = 0;

        if (top) notepad.note_block.css("top", top + 'px');
        if (left) notepad.note_block.css("left", left + 'px');
    },

    on_load: function on_load(data) {
        if (data.indexOf('div') > 0) {
            notepad.create = 1;
            $('.notes', notepad.note_block).html(data);
            $('.note_line', notepad.note_block).click(function () {
                var text = $(this).text();
                $(active_textarea).val(text).focus();
                if ($(active_textarea).attr('id') == 'mess-text-area') {
                    FormMess.message = text;
                } // TODO: жэсточайшы костыль для блокнота

                //                        // Trigger a DOM 'input' event
                //                        var evt = document.createEvent('HTMLEvents');
                //                        evt.initEvent('input', false, true);
                //                        elt.dispatchEvent(evt);
            });

            notepad.remind();

            notepad.note_block.draggable({
                handle: '.title',
                stop: function stop(event, ui) {
                    var topOff = $(this).offset().top - $(window).scrollTop();
                    notepad.note_block.css("top", topOff);
                    storage.save('notepad_top', topOff);
                    storage.save('notepad_left', $(this).offset().left);
                }
            });

            notepad.show();
        }
    }

    // -- Обратная связь ---
};var report = {

    is_report: 0,

    init: function init() {
        $('#send_question').click(function () {
            report.show_quest();
        });
        $('#send_report').click(function () {
            report.show_report();
        });
        $('#send_reset').click(function () {
            report.hide();
        });
        $('#report_text').unbind('click');

        $('#hint_close').click(function () {
            report.hint_hide();
        });
    },

    show: function show() {
        $('#report_send').off('click');
        $('#report_block').show('blind');
    },

    hide: function hide() {
        $('#report_block').hide('blind');
    },

    show_quest: function show_quest() {
        report.show();
        $('#report_send').val('Отправить вопрос');
        $('#report_send').on('click', report.post_quest);
    },

    show_report: function show_report() {
        report.show();
        $('#report_send').val('Отправить отзыв');
        $('#report_send').on('click', report.post_report);
    },

    hint_show: function hint_show() {
        $("#hint_block").show('blind');
    },

    hint_hide: function hint_hide() {
        $("#hint_block").hide('fade');
    },

    post_quest: function post_quest() {
        report.hide();
        var text = $('#report_text').val();

        $.post("/mailer/post/", {
            mess: text,
            id: 10336,
            hash: hash
        }, report.on_post);

        report.hint_show();
    },

    post_report: function post_report() {
        report.hide();
        var text = $('#report_text').val();

        $.post("/details.php?reviews", {
            text_reviews: text,
            hash: hash
        });

        report.hint_show();
        $('#report_text').val('');
    },

    on_post: function on_post(data) {
        // alert (data) 
        if (!data) return 0;
        var mess = JSON.parse(data);

        if (mess.error == 'reload') {
            location.href = '/10336?text=' + encodeURIComponent($('#report_text').val());
        }
        $('#report_text').val('');
    }

};
