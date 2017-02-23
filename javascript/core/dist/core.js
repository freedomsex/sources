'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

$(document).ready(function () {

    userinfo.init();
    slider.init();
    storage.init();
    giper_chat.init();
    notepad.init();

    mailsett.init();
    report.init();
    navigate.init();

    name_suggest.init();
    city_suggest.init();

    option_static.init();
    option_sex.init();
    option_email.init();
    profile_alert.init();
    profile_option.init();

    user_tag.init();
    desire_clip.init();

    result_list.init();
    visited.init();
});

moment.locale('ru');

var ls = lscache;

var store = new Vuex.Store({
    state: {
        apiToken: '',
        photoServer: '127.0.0.1:8888',
        //photoServer: '195.154.54.70',
        count: 0,
        photoView: {
            thumb: null,
            photo: null,
            height: null
        },
        uploadView: {
            show: false
        },
        formMess: {
            sendTo: null,
            sendPhoto: {
                thumb: null,
                photo: null,
                height: null,
                width: null
            },
            intimate: true
        },
        accepts: {
            photo: false
        }
    },
    actions: {
        LOAD_API_TOKEN: function LOAD_API_TOKEN(_ref) {
            var commit = _ref.commit;

            commit('setApiToken', { apiToken: get_cookie('jwt') });
        },
        LOAD_ACCEPTS: function LOAD_ACCEPTS(_ref2) {
            var commit = _ref2.commit;

            var accepts = ls.get('accepts');
            if (accepts && accepts.photo) {
                commit('approveViewPhoto');
            }
            //console.log(ls.get('accepts'));
        }
    },
    mutations: {
        setApiToken: function setApiToken(state, data) {
            if (data) {
                _.extend(state, data);
            }
            //console.log(state)
        },
        viewPhoto: function viewPhoto(state, data) {
            _.extend(state.photoView, data);
        },
        viewUpload: function viewUpload(state, data) {
            state.uploadView.show = data === true;
        },
        sendPhoto: function sendPhoto(state, data) {
            _.extend(state.formMess.sendPhoto, data);
        },
        approveViewPhoto: function approveViewPhoto(state) {
            state.accepts.photo = true;
            ls.set('accepts', _.extend(state.accepts, { photo: true }));
        },
        intimated: function intimated(state, data) {
            state.formMess.intimate = data === true;
        }
    },
    getters: {
        accept: function accept() {}
    }
});

store.dispatch('LOAD_API_TOKEN');
store.dispatch('LOAD_ACCEPTS');

// -- Получить новый хэш ---
var hash;
function simple_hash() {
    var now = new Date();
    hash = now.getTime();
}

function disabled_with_timeout(elem, time) {
    elem.prop("disabled", true);
    setTimeout(function () {
        elem.prop("disabled", false);
    }, time * 1000);
}

Vue.http.options.emulateJSON = true;

var UploadPhoto = Vue.extend({
    template: "#upload-photo",
    data: function data() {
        return {
            photos: [],
            server: null
        };
        // file: {
        //     data: null,
        //     name: '',
        //     size: 0
        // }
    },

    created: function created() {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        loadPhoto: function loadPhoto() {
            var _this = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { hash: hash }
            };
            axios.get('http://' + this.server + '/api/v1/users/' + uid + '/photos', config).then(function (response) {
                var result = response.data.photos;
                if (result && result.length) {
                    _this.photos = response.data.photos;
                }
                //console.log(this.photos);
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
                var _data = {
                    photo: links.origin.href,
                    thumb: links.thumb.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
                store.commit('sendPhoto', _data);
                //console.log('sendPhoto');
                //console.log(data);
            }
            this.close();
        },
        close: function close() {
            this.$emit('close');
        }
    },
    mounted: function mounted() {
        console.log('fileupload');
        var self = this;
        $('#fileupload').fileupload({
            dataType: 'json',
            add: function add(e, data) {
                data.url = 'http://' + self.server + '/api/v1/users/' + uid + '/photos?jwt=' + self.$store.state.apiToken;
                data.submit();
            },
            done: function done(e, data) {
                self.preview(data.result.photo);
            }
        });
        this.loadPhoto();
    }
});

// var photo_upload = new Vue({
//   el: "#upload-photo",
//   data: {
//     files : []
//   },
//   methods: {
//     addPhoto: function(){
//       this.files.push({ name: "", size: 0});
//       this.$nextTick(function () {
//         var inputId = "upload-photo__file-" + (this.files.length-1);
//         document.getElementById(inputId).click();
//       });
//     },
//     upload: function(e){
//       var f = e.target.files[0];
//       //file.name = f.name;
//       //file.size = f.size;
//     }
//   }
// })

// -- Автогенератор информации ---        
var auto_gen = {

    name: function name(sex) {
        var name = [];
        name[0] = ['Онилиона', 'Безимени', 'Неуказано', 'Хуисзиз', 'Незнаю', 'Неизвестно', 'Несонено'];
        name[1] = ['Саша', 'Дима', 'Сергей', 'Иван', 'Максим', 'Валера', 'Николай'];
        name[2] = ['Оля', 'Юля', 'Настя', 'Алена', 'Катя', 'Маргарита', 'Татьяна'];

        var x = Math.floor(Math.random() * 7);

        return name[sex][x];
    },

    age: function age(year) {
        var age = [];
        age[0] = [18, 21, 24, 25, 27, 28, 31];
        age[1] = [year + 3, year + 2, year + 1, year, year - 1, year - 2, year - 3];

        var y = year ? 1 : 0;
        var x = Math.floor(Math.random() * 7);

        return age[y][x];
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
        var data = get_cookie(name);
        var result = null;

        if (data) try {
            result = JSON.parse(data);
        } catch (e) {}

        return result;
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

var desire_clip = {

    sync_taglist: 0,

    init: function init() {
        desire_clip.action.set();
        desire_clip.ajax.sync();
    },
    ajax: {
        sync: function sync() {
            $.get('/sync/taglist/', desire_clip.ajax.parse);
        },
        parse: function parse(data) {
            data = json.parse(data);
            if (data) {
                if (data.id && user_tag.sync != data.id) {
                    user_tag.sync = data.id;
                    user_tag.action.store();
                    desire_clip.ajax.load();
                }
            }
        },
        load: function load() {
            $.get('/tag/user/', desire_clip.ajax.on_load);
        },
        on_load: function on_load(data) {
            // alert(data)
            data = json.parse(data);
            if (data.tags != undefined) {
                user_tag.list = data.tags;
                user_tag.option.set_count();
                user_tag.action.store();
            }
            if (data.tags.length > 0) {
                desire_clip.action.set();
            }
        },
        add: function add(tag) {
            $.post('/tag/add/', { tag: tag });
        }
    },
    action: {
        set: function set() {
            user_tag.action.ids();
            $('.desire_clip').each(function (i, elem) {
                $(elem).off('click');
                $(elem).removeClass('desire_user');
                if (user_tag.idls.indexOf($(elem).data('id')) >= 0) {
                    $(elem).addClass('desire_user');
                } else $(elem).on('click', desire_clip.action.add);
            });
            user_tag.option.set_count();
        },
        add: function add() {
            desire_clip.ajax.add($(this).data('tag'));
            desire_clip.option.toggle(this);
            //$(this).on('click',desire_clip.action.del);
            var data = { "tag": $(this).data('tag'), "id": $(this).data('id') };
            user_tag.list.push(data);
        },
        del: function del() {
            option_tag.ajax.del($(this).data('id'));
            desire_clip.option.toggle(this);
            user_tag.list.splice($(this).data('num'), 1);
            $(this).on('click', desire_clip.action.add);
        }
    },
    option: {
        toggle: function toggle(elem) {
            $(elem).off('click');
            $(elem).toggleClass('desire_user');
        }
    }
};

var device = {

    init: function init() {},

    width: function width() {
        return $(window).width();
    },

    height: function height() {
        return $(window).height(); //document                               
    }

};

var active_textarea; ////////////////////////////////////////////////////////
var giper_chat = {

    open_mess: 0,
    idle_round: 0,

    count_unread: 0,
    cascade: 0,

    round_time: 0,
    round_open: 1,

    timer_id: null,
    mess_block: null,

    mess_stock: [],

    prev_title: null,

    init: function init() {
        if (device.width() > 1200) {
            giper_chat.mess_stock = storage.array.load('mess_stock');
            giper_chat.remind();
        }
        $('<div id="block_timer" class="timer">').appendTo('body');
        giper_chat.timer_set();
        giper_chat.new_round();

        $('#giper_reply .post').on('click', giper_chat.reply_show);
        // Установка текста по умолчанию
        if (storage.load('reply_all')) $('#giper_reply textarea').val(storage.load('reply_all'));
        giper_chat.prev_title = document.title;
    },

    set_unread: function set_unread() {
        if (giper_chat.count_unread > 0) {
            $('#menu_message_unread b').text(giper_chat.count_unread);
            $('#menu_message_unread').show();
            $('#menu_message').attr('title', 'Новых сообщений ' + giper_chat.count_unread);
        } else {
            $('#menu_message_unread').text('');
            $('#menu_message_unread').hide();
            $('#menu_message').attr('title', 'Новых сообщений нет');
        }
    },

    on_timer: function on_timer() {
        giper_chat.title_blink();

        if (giper_chat.round_open && giper_chat.cascade == 0) giper_chat.round_time--;

        //if (giper_chat.cascade != 0)console.log('on_timer cascade: ' +giper_chat.cascade)

        giper_chat.trace();

        if (giper_chat.round_time < 1) giper_chat.new_round();
    },

    new_round: function new_round() {
        giper_chat.timer_stop();
        giper_chat.ajax_new();
    },

    trace: function trace() {
        $('#block_timer').text(giper_chat.round_time);
    },

    ajax_new: function ajax_new() {
        simple_hash();
        giper_chat.round_open = 0;

        $.get('/ajax/new_mess.php', { hash: hash }, giper_chat.on_load).always(function () {
            giper_chat.round_open = 1;
        });
    },

    on_load: function on_load(data) {
        if (data) {
            var mess = json.parse(data);
            giper_chat.route_xz(mess);
            giper_chat.count_unread = mess.count_unread; ////////////////////////////////////
            giper_chat.set_unread(); ////////////////////////////////////
        }
        setTimeout(function () {
            giper_chat.timer_set();
        }, 5000);
    },

    route_xz: function route_xz(mess) {
        if (device.width() > 1200 && mess.type && giper_chat.open_mess < 9) {
            /* */
            if (mess.type == 'air_user' || mess.type == 'new_client') {
                visited.action.load_cache();
                if (visited.list.length) {
                    if (visited.list.indexOf(mess.user + '') >= 0) {
                        giper_chat.reply_enable();
                        giper_chat.idle_round = 0;
                        setTimeout(function () {
                            giper_chat.timer_set();
                        }, 5000);
                        return 0;
                    }
                }
            }
            giper_chat.mess_stock.push(mess);
            giper_chat.stock.store();
            giper_chat.new_message(mess);
        }
    },

    reply_enable: function reply_enable() {
        if (giper_chat.cascade == 0) {
            if (giper_chat.open_mess > 2) $('#giper_reply').show('blind');
            if (giper_chat.open_mess > 5) $('#giper_reply textarea').show('blind');
        }

        if (giper_chat.open_mess < 3) $('#giper_reply').hide('blind');
        if (giper_chat.open_mess == 0) giper_chat.cascade = 0;

        // console.log('re cascade: ' +giper_chat.cascade)
    },

    reply_show: function reply_show() {
        var textarea = $('#giper_reply textarea');
        if (!$(textarea).is(":visible")) {
            active_textarea = textarea;
            textarea.show('blind');
            textarea.focus();
            notepad.show(); ////////////////////////////////////
        } else giper_chat.reply_all();
    },

    reply_all: function reply_all() {
        var textarea = $('#giper_reply textarea');
        var text = textarea.val();

        if (text) {
            var block_mess = $('#giper_stock').children().filter(':first');
            giper_chat.cascade = text;
            storage.save('reply_all', text);
            $('textarea', block_mess).val(text);
            $('.post', block_mess).click();
            textarea.hide('blind');
        }
        giper_chat.reply_enable();
    },

    new_message: function new_message(val) {
        //  elem.appendChild();
        giper_chat.open_mess++;
        giper_chat.reply_enable();

        var new_block = giper_chat.create_message(val);

        new_block.prependTo($('#giper_stock'));

        new_block.show('blind');

        setTimeout(function () {
            $('.sound', new_block).show();
        }, 500);

        giper_chat.idle_round = 0;
        // giper_chat.mess_stock.push(val);
        // giper_chat.stock.store();
    },

    remind: function remind() {
        jQuery.each(giper_chat.mess_stock, function (i, val) {
            giper_chat.new_message(val);
        });
    },

    stock: {

        store: function store() {
            storage.array.save('mess_stock', giper_chat.mess_stock);
        },

        remove: function remove(num) {
            var del = null;
            jQuery.each(giper_chat.mess_stock, function (i, val) {
                if (val.mess_id == num) del = i;
            });

            if (del || del == 0) {
                //alert($('.new_message').length + '  <> ' + giper_chat.mess_stock.length)
                giper_chat.mess_stock.splice(del, 1);
                if (giper_chat.mess_stock.length - $('.new_message').length > 1) giper_chat.mess_stock = [];
                giper_chat.stock.store();
            }
        }

    },

    create_message: function create_message(val) {
        if (!val.reply) val.reply = '';

        //return 0;

        var new_block = $('#new_message_ex').clone().attr('id', val.type + '_' + val.mess_id) //.css("display","none")
        .data('number', val.mess_id).data('user', val.user).addClass(val.type);

        $('.mess_text', new_block).html(val.text); // click( function (){ location.href =  });
        $('.close', new_block).click(function () {
            giper_chat.close_message($(new_block));
        });

        if (val.type == 'new_message' || val.type == 'old_message') {
            if (val.type == 'old_message') {
                $('.title', new_block).text('Есть сообщение без ответа');
                $('.sound', new_block).remove();
            }

            $('.post', new_block).click(function () {
                giper_chat.post_mess(val);
            });

            $('textarea', new_block).val(val.reply);
            $('.user_name', new_block).text(val.name + ':');
            $('.history', new_block).click(function () {
                giper_chat.follow_message(val.user, val.mess_id);
            });

            $('.bunn', new_block).click(function () {
                giper_chat.ajax_bun(val.user, val.mess_id, val.type);
                giper_chat.open_mess--;
            });

            if (val.type == 'new_message') $('#contact_update').show('fade');
        }

        if (val.type == 'server_mess') {
            $('.sound', new_block).remove();
            $('.title', new_block).text(val.reply);
            $('.bunn', new_block).remove();
            $('.post', new_block).val('Хорошо');

            $('.post', new_block).click(function () {
                send_serv_mess($('#' + val.type + '_' + val.mess_id), 'tip_user_bun_close');
            });

            $('.history', new_block).text('Подробнее...');
            $('.history', new_block).attr('href', '/блог/наказывайте-кого-следует/');
            $('.history', new_block).attr('target', '_blank');
        }

        if (val.type == 'air_user' || val.type == 'new_client') {
            if (val.type == 'air_user') $('.title', new_block).text('Сейчас на сайте');
            if (val.type == 'new_client') $('.title', new_block).text('Зарегистрировалась сегодня');

            $('.mess_text', new_block).html(val.age + ' ' + val.city + ' ' + val.text);

            $('.sound', new_block).remove();
            // var timer_air = setTimeout( function (){ close_message( $(new_block) ); open_mess--; },30000 );
            //$('.title',new_block).text( val.reply );
            $('.bunn', new_block).remove();
            $('.user_name', new_block).text(val.name + ',');
            $('.user_name', new_block).text(val.name + ',');
            $('.post', new_block).val('Написать');

            $('.post', new_block).click(function () {
                giper_chat.post_mess(val);
            });

            $('.history', new_block).text('Смотреть анкету');
            $('.history', new_block).click(function () {
                giper_chat.follow_message(val.user, val.mess_id);
            });

            if (val.type == 'new_client') {}
        }

        $(new_block).draggable({
            handle: '.title',
            stop: function stop(event, ui) {
                $('.sound', new_block).remove();

                //alert ($(this).offset().left)

                var topOff = $(this).offset().top - $(window).scrollTop();
                var leftOff = $(this).offset().left;
                $(this).css("top", topOff).css("left", leftOff).css("position", "fixed");

                $(this).appendTo('body');
            }
        }); /**/

        return new_block;
    },

    close_message: function close_message(elem) {
        $('.sound', elem).remove();
        elem.hide('blind');
        giper_chat.open_mess--;
        giper_chat.stock.remove(elem.data('number'));
        setTimeout(function () {
            elem.remove();
        }, 500);
    },

    close_all: function close_all(user) {/*
                                         $('#giper_stock div').
                                         $('.sound',elem).remove();
                                         elem.hide('blind');
                                         giper_chat.open_mess--;
                                         giper_chat.stock.remove(elem.data('number'));
                                         setTimeout( function (){ elem.remove(); },500 ); */
    },

    follow_message: function follow_message(user, mess_id) {
        giper_chat.stock.remove(mess_id);
        location.href = '/' + user;
    },

    ajax_bun: function ajax_bun(user, mess_id, type) {
        giper_chat.close_message($('#' + type + '_' + mess_id));
        $.post("/mess/bun/", { id: mess_id, tid: user });
    },

    timer_set: function timer_set() {
        giper_chat.timer_stop();
        if (giper_chat.idle_round == 0) {
            giper_chat.round_time = 10;
        } else if (giper_chat.idle_round == 1) {
            giper_chat.round_time = 10;
        } else if (giper_chat.idle_round == 2) {
            giper_chat.round_time = 5;
        } else if (giper_chat.idle_round == 3) {
            giper_chat.round_time = 25;
        } else if (giper_chat.idle_round == 4) {
            giper_chat.round_time = 35;
        } else if (giper_chat.idle_round > 11) {
            giper_chat.round_time = 300;
        } else if (giper_chat.idle_round > 4) {
            giper_chat.round_time = 60;
        }

        giper_chat.idle_round++;
        giper_chat.timer_id = window.setInterval('giper_chat.on_timer()', 1000);
        //console.log('таймер запущен: ' +giper_chat.round_time)
    },

    timer_stop: function timer_stop() {
        window.clearInterval(giper_chat.timer_id);
        //console.log('таймер остановлен: ' +giper_chat.cascade)
    },

    timer_cut: function timer_cut() {
        if (giper_chat.idle_round > 0 && giper_chat.round_time > 10) giper_chat.round_time = 10;
        giper_chat.idle_round = 0;
    },

    toggle_text: function toggle_text() {
        var textarea = $('textarea', giper_chat.mess_block);
        var text_value = $(textarea).val();
        if (!$(textarea).is(":visible")) {
            active_textarea = textarea; ///////////////////////////////////////
            $(textarea).show('blind');
            $(textarea).focus();
            notepad.show(); ///////////////////////////////////////
            return 0;
        }

        return text_value;
    },

    post_mess: function post_mess(val) {
        giper_chat.mess_block = $('#' + val.type + '_' + val.mess_id); // alert( user )

        var text, repl;

        if (giper_chat.cascade != 0) {
            text = giper_chat.cascade;
            repl = '';
        } else {
            text = giper_chat.toggle_text();
            repl = text;
        }

        if (text) {
            simple_hash();

            $.post("/mailer/post/", {
                mess: text,
                id: val.user,
                re: repl,
                captcha_code: $('.code', giper_chat.mess_block).val(),
                hash: hash
            }, giper_chat.on_post);

            disabled_with_timeout($('.post', giper_chat.mess_block), 5);
            giper_chat.timer_cut();
        }
    },

    on_post: function on_post(data) {
        // alert (data)
        if (!data) return 0;
        var mess = JSON.parse(data);

        if (mess.error == 'captcha') {
            $('textarea', giper_chat.mess_block).show('blind');
            $('.captcha_block', giper_chat.mess_block).show('blind');
            $('.captcha', giper_chat.mess_block).get(0).src = '/secret_pic.php?hash=' + hash;
        }

        if (mess.saved == '1') {
            giper_chat.idle_round = 0;

            $('#contact_update').show('fade');
            giper_chat.close_message(giper_chat.mess_block);

            notepad.hide(); //////////////////////////////////////////////
            visited.action.save(giper_chat.mess_block.data('user'));

            setTimeout(function () {
                if (giper_chat.cascade != 0) giper_chat.reply_all();
            }, 700);
        }

        if (mess.error == 'reload') {
            giper_chat.idle_round = 0;
            location.href = '/' + user + '?text=' + text; //alert ('reload')
        }

        disabled_with_timeout($('.post', giper_chat.mess_block), 0.05);
    },

    title_blink: function title_blink() {
        if (giper_chat.count_unread == 0) {
            document.title = giper_chat.prev_title;
            return false;
        }

        if (document.title != 'Вам сообщение!') {
            document.title = 'Вам сообщение!';
        } else document.title = ' * * * * * * * * * * * * ';
    },

    post_serv: function post_serv(elem, value) {
        giper_chat.close_message($(elem)); /*
                                           var param = {}; param[value] = 1;
                                           $.get( "/ajax/messages_load.php", param ); */
        set_cookie('user_bun', '1', 259200);
    }

};

$(document).ready(function () {
    /*            
      giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925673",name: "Максим",reply: "",sity: "Ивантеевка",text: "Привет. Давай познакомимся.",time: "1415561723",type: "air_user",user: "699208"});
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925674",name: "Николай",reply: "",sity: "Ивантеевка",text: "и дай я тебя отжарю. не пожалеешь. отсосешь мне",time: "1415561723",type: "new_message",user: "699208"});
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925675",name: "Виктор",reply: "",sity: "Ивантеевка",text: "юлия а где найти анонимные объявления",time: "1415561723",type: "new_message",user: "699208"});
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925676",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
     giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925677",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
     giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925678",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
            */
});

/*
 * jQuery File Upload Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, document, location, Blob, FormData */

;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery', 'jquery-ui/ui/widget'], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // Node/CommonJS:
        factory(require('jquery'), require('./vendor/jquery.ui.widget'));
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
})(function ($) {
    'use strict';

    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/

    $.support.fileInput = !(new RegExp(
    // Handle devices which give false positives for the feature detection:
    '(Android (1\\.[0156]|2\\.[01]))' + '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' + '|(w(eb)?OSBrowser)|(webOS)' + '|(Kindle/(1\\.0|2\\.[05]|3\\.0))').test(window.navigator.userAgent) ||
    // Feature detection for all other devices:
    $('<input type="file">').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // Helper function to create drag handlers for dragover/dragenter/dragleave:
    function getDragHandler(type) {
        var isDragOver = type === 'dragover';
        return function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 && this._trigger(type, $.Event(type, { delegatedEvent: e })) !== false) {
                e.preventDefault();
                if (isDragOver) {
                    dataTransfer.dropEffect = 'copy';
                }
            }
        };
    }

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default undefined.
            // Set to a DOM node or jQuery object to enable file pasting:
            pasteZone: undefined,
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function i18n(message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function formData(form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function add(e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || data.autoUpload !== false && $(this).fileupload('option', 'autoUpload')) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false,
            timeout: 0
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: ['fileInput', 'dropZone', 'pasteZone', 'multipart', 'forceIframeTransport'],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function _BitrateTimer() {
            this.timestamp = Date.now ? Date.now() : new Date().getTime();
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function _isXHRUpload(options) {
            return !options.forceIframeTransport && (!options.multipart && $.support.xhrFileUpload || $.support.xhrFormDataFileUpload);
        },

        _getFormData: function _getFormData(options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({ name: name, value: value });
                });
                return formData;
            }
            return [];
        },

        _getTotal: function _getTotal(files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function _initProgressObject(obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function _initResponseObject(obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function _onProgress(e, data) {
            if (e.lengthComputable) {
                var now = Date.now ? Date.now() : new Date().getTime(),
                    loaded;
                if (data._time && data.progressInterval && now - data._time < data.progressInterval && e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(e.loaded / e.total * (data.chunkSize || data._progress.total)) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += loaded - data._progress.loaded;
                this._progress.bitrate = this._bitrateTimer.getBitrate(now, this._progress.loaded, data.bitrateInterval);
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(now, loaded, data.bitrateInterval);
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger('progress', $.Event('progress', { delegatedEvent: e }), data);
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger('progressall', $.Event('progressall', { delegatedEvent: e }), this._progress);
            }
        },

        _initProgressListener: function _initProgressListener(options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function _isInstanceOf(type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function _initXHRData(options) {
            var that = this,
                formData,
                file = options.files[0],

            // Ignore non-multipart setting if not supported:
            multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ? options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' + encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: $.type(options.paramName) === 'array' && options.paramName[index] || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) || that._isInstanceOf('Blob', file)) {
                                formData.append($.type(options.paramName) === 'array' && options.paramName[index] || paramName, file, file.uploadName || file.name);
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function _initIframeSettings(options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function _initDataSettings(options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function _getParamName(options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function _initFormSettings(options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type || $.type(options.form.prop('method')) === 'string' && options.form.prop('method') || '').toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' && options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function _getAJAXSettings(data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function _getDeferredState(deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function _enhancePromise(promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function _getXHRPromise(resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function _addConvenienceMethods(e, data) {
            var that = this,
                getPromise = function getPromise(args) {
                return $.Deferred().resolveWith(that, args).promise();
            };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue = (this._processQueue || getPromise([this])).then(function () {
                        if (data.errorThrown) {
                            return $.Deferred().rejectWith(that, [data]).promise();
                        }
                        return getPromise(arguments);
                    }).then(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR = that._trigger('submit', $.Event('submit', { delegatedEvent: e }), this) !== false && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function _getUploadedBytes(jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 && parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function _chunkedUpload(options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                _upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) || options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(false, options.context, [null, 'error', file.error]);
            }
            // The chunk upload method:
            _upload = function upload() {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(file, ub, ub + mcs, file.type);
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' + (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = (that._trigger('chunksend', null, o) !== false && $.ajax(o) || that._getXHRPromise(false, o.context)).done(function (result, textStatus, jqXHR) {
                    ub = that._getUploadedBytes(jqXHR) || ub + o.chunkSize;
                    // Create a progress event if no final progress event
                    // with loaded equaling total has been triggered
                    // for this chunk:
                    if (currentLoaded + o.chunkSize - o._progress.loaded) {
                        that._onProgress($.Event('progress', {
                            lengthComputable: true,
                            loaded: ub - o.uploadedBytes,
                            total: ub - o.uploadedBytes
                        }), o);
                    }
                    options.uploadedBytes = o.uploadedBytes = ub;
                    o.result = result;
                    o.textStatus = textStatus;
                    o.jqXHR = jqXHR;
                    that._trigger('chunkdone', null, o);
                    that._trigger('chunkalways', null, o);
                    if (ub < fs) {
                        // File upload not yet complete,
                        // continue with the next chunk:
                        _upload();
                    } else {
                        dfd.resolveWith(o.context, [result, textStatus, jqXHR]);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    o.jqXHR = jqXHR;
                    o.textStatus = textStatus;
                    o.errorThrown = errorThrown;
                    that._trigger('chunkfail', null, o);
                    that._trigger('chunkalways', null, o);
                    dfd.rejectWith(o.context, [jqXHR, textStatus, errorThrown]);
                });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            _upload();
            return promise;
        },

        _beforeSend: function _beforeSend(e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function _onDone(result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function _onFail(jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function _onAlways(jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function _onSend(e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function send() {
                that._sending += 1;
                // Set timer for bitrate progress calculation:
                options._bitrateTimer = new that._BitrateTimer();
                jqXHR = jqXHR || ((aborted || that._trigger('send', $.Event('send', { delegatedEvent: e }), options) === false) && that._getXHRPromise(false, options.context, aborted) || that._chunkedUpload(options) || $.ajax(options)).done(function (result, textStatus, jqXHR) {
                    that._onDone(result, textStatus, jqXHR, options);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    that._onFail(jqXHR, textStatus, errorThrown, options);
                }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                    that._onAlways(jqXHRorResult, textStatus, jqXHRorError, options);
                    that._sending -= 1;
                    that._active -= 1;
                    if (options.limitConcurrentUploads && options.limitConcurrentUploads > that._sending) {
                        // Start the next queued upload,
                        // that has not been aborted:
                        var nextSlot = that._slots.shift();
                        while (nextSlot) {
                            if (that._getDeferredState(nextSlot) === 'pending') {
                                nextSlot.resolve();
                                break;
                            }
                            nextSlot = that._slots.shift();
                        }
                    }
                    if (that._active === 0) {
                        // The stop callback is triggered when all uploads have
                        // been completed, equivalent to the global ajaxStop event:
                        that._trigger('stop');
                    }
                });
                return jqXHR;
            };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.then(send);
                } else {
                    this._sequence = this._sequence.then(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function _onAdd(e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (!filesLength) {
                return false;
            }
            if (limitSize && files[0].size === undefined) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) || !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength || batchSize + files[i + 1].size + overhead > limitSize || limit && i + 1 - j >= limit) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger('add', $.Event('add', { delegatedEvent: e }), newData);
                return result;
            });
            return result;
        },

        _replaceFileInput: function _replaceFileInput(data) {
            var input = data.fileInput,
                inputClone = input.clone(true),
                restoreFocus = input.is(document.activeElement);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // If the fileInput had focus before it was detached,
            // restore focus to the inputClone.
            if (restoreFocus) {
                inputClone.focus();
            }
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function _handleFileTreeEntry(entry, path) {
            var that = this,
                dfd = $.Deferred(),
                entries = [],
                dirReader,
                errorHandler = function errorHandler(e) {
                if (e && !e.entry) {
                    e.entry = entry;
                }
                // Since $.when returns immediately if one
                // Deferred is rejected, we use resolve instead.
                // This allows valid files and invalid items
                // to be returned together in one set:
                dfd.resolve([e]);
            },
                successHandler = function successHandler(entries) {
                that._handleFileTreeEntries(entries, path + entry.name + '/').done(function (files) {
                    dfd.resolve(files);
                }).fail(errorHandler);
            },
                readEntries = function readEntries() {
                dirReader.readEntries(function (results) {
                    if (!results.length) {
                        successHandler(entries);
                    } else {
                        entries = entries.concat(results);
                        readEntries();
                    }
                }, errorHandler);
            };
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                readEntries();
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function _handleFileTreeEntries(entries, path) {
            var that = this;
            return $.when.apply($, $.map(entries, function (entry) {
                return that._handleFileTreeEntry(entry, path);
            })).then(function () {
                return Array.prototype.concat.apply([], arguments);
            });
        },

        _getDroppedFiles: function _getDroppedFiles(dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry || items[0].getAsEntry)) {
                return this._handleFileTreeEntries($.map(items, function (item) {
                    var entry;
                    if (item.webkitGetAsEntry) {
                        entry = item.webkitGetAsEntry();
                        if (entry) {
                            // Workaround for Chrome bug #149735:
                            entry._file = item.getAsFile();
                        }
                        return entry;
                    }
                    return item.getAsEntry();
                }));
            }
            return $.Deferred().resolve($.makeArray(dataTransfer.files)).promise();
        },

        _getSingleFileInputFiles: function _getSingleFileInputFiles(fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') || fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{ name: value.replace(/^.*\\/, '') }];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function _getFileInputFiles(fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply($, $.map(fileInput, this._getSingleFileInputFiles)).then(function () {
                return Array.prototype.concat.apply([], arguments);
            });
        },

        _onChange: function _onChange(e) {
            var that = this,
                data = {
                fileInput: $(e.target),
                form: $(e.target.form)
            };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data);
                }
                if (that._trigger('change', $.Event('change', { delegatedEvent: e }), data) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function _onPaste(e) {
            var items = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
                data = { files: [] };
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger('paste', $.Event('paste', { delegatedEvent: e }), data) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function _onDrop(e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger('drop', $.Event('drop', { delegatedEvent: e }), data) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: getDragHandler('dragover'),

        _onDragEnter: getDragHandler('dragenter'),

        _onDragLeave: getDragHandler('dragleave'),

        _initEventHandlers: function _initEventHandlers() {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    // event.preventDefault() on dragenter is required for IE10+:
                    dragenter: this._onDragEnter,
                    // dragleave is not required, but added for completeness:
                    dragleave: this._onDragLeave
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function _destroyEventHandlers() {
            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _destroy: function _destroy() {
            this._destroyEventHandlers();
        },

        _setOption: function _setOption(key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function _initSpecialOptions() {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function _getRegExp(str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function _isRegExpOption(key, value) {
            return key !== 'url' && $.type(value) === 'string' && /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function _initDataAttributes() {
            var that = this,
                options = this.options,
                data = this.element.data();
            // Initialize options set via HTML5 data-attributes:
            $.each(this.element[0].attributes, function (index, attr) {
                var key = attr.name.toLowerCase(),
                    value;
                if (/^data-/.test(key)) {
                    // Convert hyphen-ated key to camelCase:
                    key = key.slice(5).replace(/-[a-z]/g, function (str) {
                        return str.charAt(1).toUpperCase();
                    });
                    value = data[key];
                    if (that._isRegExpOption(key, value)) {
                        value = that._getRegExp(value);
                    }
                    options[key] = value;
                }
            });
        },

        _create: function _create() {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function active() {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function progress() {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function add(data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function send(data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(function (files) {
                        if (aborted) {
                            return;
                        }
                        if (!files.length) {
                            dfd.reject();
                            return;
                        }
                        data.files = files;
                        jqXHR = that._onSend(null, data);
                        jqXHR.then(function (result, textStatus, jqXHR) {
                            dfd.resolve(result, textStatus, jqXHR);
                        }, function (jqXHR, textStatus, errorThrown) {
                            dfd.reject(jqXHR, textStatus, errorThrown);
                        });
                    });
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });
});

/*
 * jQuery Iframe Transport Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, require, window, document */

;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
})(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:

    var counter = 0;

    // The iframe transport accepts four additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    // options.initialIframeSrc: the URL of the initial iframe src,
    //  by default set to "javascript:false;"
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            // javascript:false as initial iframe src
            // prevents warning popups on HTTPS in IE6:
            /*jshint scripturl: true */
            var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',

            /*jshint scripturl: false */
            form,
                iframe,
                addParamChar;
            return {
                send: function send(_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    // XDomainRequest only supports GET and POST:
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    counter += 1;
                    iframe = $('<iframe src="' + initialIframeSrc + '" name="iframe-transport-' + counter + '"></iframe>').bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ? options.paramName : [options.paramName];
                        iframe.unbind('load').bind('load', function () {
                            var response;
                            // Wrap in a try/catch block to catch exceptions thrown
                            // when trying to access cross-domain iframe contents:
                            try {
                                response = iframe.contents();
                                // Google Chrome and Firefox do not throw an
                                // exception when calling iframe.contents() on
                                // cross-domain requests, so we unify the response:
                                if (!response.length || !response[0].firstChild) {
                                    throw new Error();
                                }
                            } catch (e) {
                                response = undefined;
                            }
                            // The complete callback returns the
                            // iframe content document as response object:
                            completeCallback(200, 'success', { 'iframe': response });
                            // Fix for IE endless progress bar activity bug
                            // (happens on form submits to iframe targets):
                            $('<iframe src="' + initialIframeSrc + '"></iframe>').appendTo(form);
                            window.setTimeout(function () {
                                // Removing the form in a setTimeout call
                                // allows Chrome's developer tools to display
                                // the response result
                                form.remove();
                            }, 0);
                        });
                        form.prop('target', iframe.prop('name')).prop('action', options.url).prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>').prop('name', field.name).val(field.value).appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length && options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop('name', paramNames[index] || options.paramName);
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form.append(options.fileInput).prop('enctype', 'multipart/form-data')
                            // enctype must be set as encoding for IE:
                            .prop('encoding', 'multipart/form-data');
                            // Remove the HTML5 form attribute from the input(s):
                            options.fileInput.removeAttr('form');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                // Restore the original name and form properties:
                                $(input).prop('name', clone.prop('name')).attr('form', clone.attr('form'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function abort() {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe.unbind('load').prop('src', initialIframeSrc);
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, xml
    // and script.
    // Please note that the Content-Type for JSON responses has to be text/plain
    // or text/html, if the browser doesn't include application/json in the
    // Accept header, else IE will show a download dialog.
    // The Content-Type for XML responses on the other hand has to be always
    // application/xml or text/xml, so IE properly parses the XML response.
    // See also
    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
    $.ajaxSetup({
        converters: {
            'iframe text': function iframeText(iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function iframeJson(iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function iframeHtml(iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function iframeXml(iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc : $.parseXML(xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml || $(xmlDoc.body).html());
            },
            'iframe script': function iframeScript(iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });
});

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

// Установки  почты        
var mailsett = {

    init: function init() {
        $('#link_virt_turn').on('click', mailsett.turn_virt);
        $('#link_close_turn').on('click', mailsett.turn_close);
    },

    turn_virt: function turn_virt() {
        var text = $('#text_virt_turn').text();

        if (text == 'неприемлемо') {
            $('#text_virt_turn').text('возможен');
            mailsett.send_virt(1);
        } else {
            $('#text_virt_turn').text('неприемлемо');
            mailsett.send_virt(0);
        }
    },

    turn_close: function turn_close() {
        var text = $('#text_close_turn').text();

        if (text == 'ограничить') {
            $('#text_close_turn').text('разрешить');
            mailsett.send_close(0);
        } else {
            $('#text_close_turn').text('ограничить');
            mailsett.send_close(1);
        }
    },

    send_close: function send_close(data) {
        $.post('/msett/close/', { option_mess_town: data }, onAjaxSuccess);
        function onAjaxSuccess(data) {}
    },

    send_virt: function send_virt(data) {
        $.post('/msett/virt/', { option_virt_accept: data }, onAjaxSuccess);
        function onAjaxSuccess(data) {}
    }

};

var master_info = {

    init: function init() {
        if (!userinfo.data.sex) {
            master_info.ajax.load_sex();
        } else if (!userinfo.data.city && $('#human_print_city').text()) {
            master_info.ajax.load_city();
        } else if (!userinfo.data.age) {
            master_info.ajax.load_age();
        } else if (userinfo.data.second > 300 && userinfo.data.contact.mc < 20) {
            master_info.ajax.load_contact();
        }
    },
    ajax: {
        load_contact: function load_contact() {
            $('#anketa_master_info').load('/static/htm/master_contact.html', master_info.ajax.on_contact);
        },
        on_contact: function on_contact() {
            master_contact.action.sett(0);
            master_contact.option.print();
        },
        load_city: function load_city() {
            $('#anketa_master_info').load('/static/htm/master_city.html', master_info.ajax.on_city);
        },
        on_city: function on_city() {
            master_city.init();
            option_static.init();
        },
        load_age: function load_age() {
            $('#anketa_master_info').load('/static/htm/master_age.html', master_info.ajax.on_age);
        },
        on_age: function on_age() {
            master_age.init();
            option_static.init();
        },
        load_sex: function load_sex() {
            $('#anketa_master_info').load('/static/htm/master_sex.html', master_info.ajax.on_sex);
        },
        on_sex: function on_sex() {
            master_sex.init();
            option_static.init();
        }
    }

};

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

};

// -- Блокнот ---
var notepad = {

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

};

var option_age = {

    init: function init() {
        $('#option_age_value').val(userinfo.data.age);
        $('#option_age_button').off('click').on('click', option_age.action.send_age);
        $('.opt_age_val').off('click').on('click', option_age.action.send_link);
    },
    ajax: {
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.age) {
                userinfo.data.age = data.age;
                userinfo.action.set_age(data.say);
            }
        }
    },
    action: {
        save: function save(age) {
            userinfo.data.age = age;
            userinfo.ajax.save.age(option_age.ajax.on_save);
            userinfo.action.set_age();
            option_static.action.close();
        },
        send_link: function send_link() {
            option_age.action.save($(this).text());
        },
        send_age: function send_age() {
            option_age.action.save($('#option_age_value').val());
        }
    }
};

var option_anketa = {

    anketa: {
        growth: 0,
        weight: 0,
        figure: 0
    },

    init: function init() {
        $('#option_anketa input').prop('disabled', true);
        $('#option_anketa input:radio').on('click', option_anketa.action.set);
        $('#option_anketa_button').on('click', option_anketa.action.send);
        option_anketa.ajax.load();
    },
    ajax: {
        load: function load() {
            $.get('/sync/anketa/', option_anketa.ajax.on_load);
        },
        on_load: function on_load(data) {
            option_anketa.action.print(json.parse(data));
            //option_static.action.close();     
        },
        save: function save(anketa) {
            $.post('/option/anketa/', { anketa: anketa }, option_anketa.ajax.on_save);
            option_static.action.close();
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.alert != undefined) {
                profile_alert.option.show(data.alert);
                option_anketa.action.set_anketa(data.text);
            }
        }
    },
    action: {
        set_anketa: function set_anketa(text) {
            $('#user_anketa_option').text(text);
        },
        set: function set() {
            option_anketa.anketa.figure = $(this).val();
        },
        send: function send() {
            option_anketa.anketa.growth = $('#option_anketa_growth').val();
            option_anketa.anketa.weight = $('#option_anketa_weight').val();
            option_anketa.ajax.save(option_anketa.anketa);
        },
        print: function print(anketa) {
            if (anketa.figure != undefined) {
                option_anketa.anketa = anketa;
                var elem = $('#option_anketa input:radio[name=figure]');
                elem.filter('[value=' + anketa.figure * 1 + ']').prop('checked', true);
                $('#option_anketa_growth').val(anketa.growth * 1);
                $('#option_anketa_weight').val(anketa.weight * 1);
            }
            $('#option_anketa input').prop('disabled', false);
        }
    }
};

var option_chlogin = {

    init: function init() {
        $('.option_chlogin_toggle').on('click', option_chlogin.option.toggle);
        $('#option_chpass_send').on('click', option_chlogin.action.chpass);
        $('#option_chlogin_send').on('click', option_chlogin.action.chlogin); /*
                                                                              $('#hide_char').on('click',option_login.action.hide_char);     
                                                                              $('#option_remind_send').on('click',option_login.action.remind);  
                                                                              $('#option_login_reset').on('click',option_login.option.reset);     */

        /*
           $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
           option_intro.action.print(); */
    },
    ajax: {
        chpass: function chpass(pass) {
            $.post('/option/auth/', { pass: pass }, option_chlogin.ajax.on_pass);
        },
        chlogin: function chlogin(login) {
            $.post('/option/auth/', { login: login }, option_chlogin.ajax.on_login);
        },
        on_pass: function on_pass(data) {
            option_chlogin.ajax.on_err(data);
            disabled_with_timeout($('#option_chpass_send'), 0.5);
        },
        on_login: function on_login(data) {
            option_chlogin.ajax.on_err(data);
            disabled_with_timeout($('#option_chlogin_send'), 0.5);
        },
        on_err: function on_err(data) {
            data = json.parse(data);
            if (data.err != undefined && data.err > 0) {
                option_chlogin.option.text(data.say);
            } else option_static.action.close();
        }
    },
    action: {
        chlogin: function chlogin() {
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chlogin_send'), 5);
            option_chlogin.ajax.chlogin($('#option_chlogin_value').val());
        },
        chpass: function chpass() {
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chpass_send'), 5);
            option_chlogin.ajax.chpass($('#option_chpass_value').val());
        }
    },
    option: {
        toggle: function toggle() {
            option_chlogin.option.text('');
            $('#option_tab_chlogin').toggle('blind');
            $('#option_tab_chpass').toggle('blind');
        },
        text: function (_text) {
            function text(_x) {
                return _text.apply(this, arguments);
            }

            text.toString = function () {
                return _text.toString();
            };

            return text;
        }(function (text) {
            $('.option_chlogin_text').text(text);
        })
    }
};

var option_city = {

    init: function init() {
        $('#option_city_value').val(userinfo.data.city);
        $('#option_city_button').off('click').on('click', option_city.action.send_city);
        $('.opt_city_val').off('click').on('click', option_city.action.send_link);
    },
    ajax: {
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.city) {
                userinfo.data.city = data.city;
                userinfo.data.city_id = data.city_id;
                userinfo.data.verify = data.verify;
                userinfo.action.set_city();
            }
        }
    },
    action: {
        save: function save(city) {
            userinfo.data.city = city;
            userinfo.ajax.save.city(option_city.ajax.on_save);
            userinfo.action.set_city();
            option_static.action.close();
        },
        send_link: function send_link() {
            option_city.action.save($(this).text());
        },
        send_city: function send_city() {
            option_city.action.save($('#option_city_value').val());
        }
    }
};

var option_contact = {

    init: function init() {
        $('#option_contact input').prop('disabled', true);
        $('#option_contact input:checkbox').on('click', option_contact.action.set);
        $('#option_contact_button').on('click', option_contact.action.send);
        option_contact.action.print();
    },
    ajax: {
        save: function save(contact) {
            $.post('/option/contact/', { contact: contact }, option_contact.ajax.on_save);
        },
        on_save: function on_save(data) {
            mess = json.parse(data);
            $('#user_contact_option').text(mess.count);
            profile_alert.option.show(mess.alert);
            option_static.action.close();
        }
    },
    action: {
        set: function set() {
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked') * 1;
        },
        send: function send() {
            option_contact.ajax.save(userinfo.data.contact);
        },
        print: function print() {
            if (userinfo.data.contact != undefined) {
                $('#option_contact_em').prop('checked', userinfo.data.contact.em * 1);
                $('#option_contact_vk').prop('checked', userinfo.data.contact.vk * 1);
                $('#option_contact_ok').prop('checked', userinfo.data.contact.ok * 1);
                $('#option_contact_fb').prop('checked', userinfo.data.contact.fb * 1);
                $('#option_contact_go').prop('checked', userinfo.data.contact.go * 1);
                $('#option_contact_sk').prop('checked', userinfo.data.contact.sk * 1);
                $('#option_contact_ph').prop('checked', userinfo.data.contact.ph * 1);
                $('#option_contact input').prop('disabled', false);
            }
        }
    }
};

var option_email = {

    init: function init() {
        $('.option_email_button').off('click');
        $('.option_email_button').on('click', option_email.action.send_email);
        if (userinfo.data.email) $('.option_email_value').val(userinfo.data.email);
        option_email.ajax.load();
    },
    ajax: {
        load: function load() {
            $.post('/sync/email/', option_email.ajax.on_load);
        },
        post: function post(email) {
            $.post('/option/email/', { email: email }, option_email.ajax.on_save);
            userinfo.data.email = data.email;
            userinfo.action.set_email();
            option_static.action.close();
        },
        on_save: function on_save(data) {
            profile_alert.option.show(json.parse(data));
        },
        on_load: function on_load(data) {
            data = json.parse(data);
            if (data) {
                if (data.email != '') {
                    userinfo.data.email = data.email;
                    userinfo.action.set_email();
                }
            }
        }
    },
    action: {
        send_email: function send_email() {
            option_email.ajax.post($('.option_email_value').val());
        }
    }
};

var option_intro = {

    name: '',
    city: '',
    age: 0,
    sex: 0,

    init: function init() {
        $('#option_intro input').prop('disabled', true);
        $('#option_intro input:radio').on('click', option_intro.action.set_sex);
        $('#option_intro_button').on('click', option_intro.action.send);
        option_intro.action.print();
    },
    action: {
        set_sex: function set_sex() {
            var sex = $(this).val();
            if (sex != userinfo.data.sex) {
                userinfo.data.sex = sex;
                userinfo.ajax.save.sex(option_sex.ajax.on_save);
                userinfo.action.set_sex();
            }
        },
        set_name: function set_name() {
            var name = $('#option_intro_name').val();
            if (name != userinfo.data.name) {
                userinfo.data.name = name;
                userinfo.ajax.save.name(option_name.ajax.on_save);
                userinfo.action.set_name();
            }
        },
        set_city: function set_city() {
            var city = $('#option_intro_city').val();
            if (city != userinfo.data.city) {
                userinfo.data.city = city;
                userinfo.ajax.save.city(option_city.ajax.on_save);
                userinfo.action.set_city();
            }
        },
        set_age: function set_age() {
            var age = $('#option_intro_age').val();
            if (age != userinfo.data.age) {
                userinfo.data.age = age;
                userinfo.ajax.save.age(option_age.ajax.on_save);
                userinfo.action.set_age();
            }
        },
        send: function send() {
            option_intro.action.set_name();
            option_intro.action.set_city();
            option_intro.action.set_age();
            option_static.action.close();
        },
        print: function print() {
            option_intro.name = userinfo.data.name;
            option_intro.city = userinfo.data.city;
            option_intro.age = userinfo.data.age;
            option_intro.sex = userinfo.data.sex;
            $('#option_intro_name').val(userinfo.data.name);
            $('#option_intro_city').val(userinfo.data.city);
            $('#option_intro_age').val(userinfo.data.age);
            var elem = $('#option_intro input:radio[name=sex]');
            elem.filter('[value=' + userinfo.data.sex * 1 + ']').prop('checked', true);
            $('#option_intro input').prop('disabled', false);
        }
    }
};

var option_login = {

    init: function init() {
        $('#hide_char').on('click', option_login.action.hide_char);
        $('#option_login_send').on('click', option_login.action.send);
        $('#option_remind_send').on('click', option_login.action.remind);
        $('.option_login_toggle').on('click', option_login.option.toggle);
        $('#option_login_reset').on('click', option_login.option.reset);

        /*
           $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
           option_intro.action.print(); */
    },
    ajax: {
        send: function send(login, pass, captcha) {
            $.post('/sync/login/', { login: login, pass: pass, captcha: captcha }, option_login.ajax.on_save);
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                if (data.err != '0') {
                    option_login.option.captcha.reload();
                    option_login.option.captcha.show();
                    option_login.option.say_login(data.say);
                } else {
                    option_login.option.say_login(data.say);
                    location.href = location.href;
                }
                //option_anketa.action.set_anketa(data.text);    
                //option_static.action.close(); 
            }
            disabled_with_timeout($('#option_login_send'), 0.1);
        },
        remind: function remind(email) {
            $.post('/sync/remind/', { email: email }, option_login.ajax.on_load);
        },
        on_load: function on_load(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                if (data.err != '0') {
                    option_login.option.say_remind(data.say);
                } else {
                    option_login.option.posted();
                }
            }
            disabled_with_timeout($('#option_remind_send'), 0.1);
        }
    },
    action: {
        hide_char: function hide_char() {
            // $(this)
            var elem = $('#password_input');
            var attr = elem.attr('type');
            if (attr == 'password') {
                elem.attr('type', 'text');
            } else elem.attr('type', 'password');
        },
        send: function send() {
            var login = $('#login_input').val();
            var pass = $('#password_input').val();
            var captcha = $('#captcha_input').val();
            disabled_with_timeout($('#option_login_send'), 7);
            option_login.ajax.send(login, pass, captcha);
        },
        remind: function remind() {
            var email = $('#option_remind_email').val();
            disabled_with_timeout($('#option_remind_send'), 7);
            option_login.ajax.remind(email);
        }
    },
    option: {
        captcha: {
            show: function show() {
                $('#captcha_pass_block').show();
            },
            reload: function reload() {
                if ($('#captcha_code').is(":visible")) $('#captcha_code').get(0).src = '/capcha_pic.php?hash=' + hash;
            }
        },
        say_login: function say_login(text) {
            $('#option_login_text').text(text);
        },
        say_remind: function say_remind(text) {
            $('#option_remind_text').text(text);
        },
        toggle: function toggle() {
            $('#option_tab_login').toggle('blind');
            $('#option_tab_remind').toggle('blind');
            $('#option_tab_posted').hide('blind');
        },
        posted: function posted() {
            $('#option_tab_posted').show('blind');
            $('#option_tab_remind').hide('blind');
            $('#option_tab_login').hide('blind');
        },
        reset: function reset() {
            $('#option_tab_posted').hide('blind');
            $('#option_tab_remind').hide('blind');
            $('#option_tab_login').show('blind');
        }
    }
};

var option_name = {

    init: function init() {
        $('#option_name_value').val(userinfo.data.name);
        $('#option_name_button').off('click').on('click', option_name.action.send_name);
        option_name.option.namelist();
    },
    ajax: {
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.name) {
                userinfo.data.name = data.name;
                userinfo.action.set_name();
            }
        }
    },
    action: {
        save: function save(name) {
            userinfo.data.name = name;
            userinfo.ajax.save.name(option_name.ajax.on_save);
            userinfo.action.set_name();
            option_static.action.close();
        },
        send_link: function send_link() {
            option_name.action.save($(this).text());
        },
        send_name: function send_name() {
            option_name.action.save($('#option_name_value').val());
        }
    },
    option: {
        namelist: function namelist() {
            if (userinfo.data.sex == 1) {
                $('#man_opt_name').show();
            }
            if (userinfo.data.sex == 2) {
                $('#woman_opt_name').show();
            }
            if (!userinfo.data.sex) {
                //$('#woman_opt_name').show(); 
            }
            $('.opt_name_val').on('click', option_name.action.send_link);
        }
    }
};

var option_sex = {

    init: function init() {
        $('.option_sex_change').off('click').on('click', option_sex.action.send_sex);
    },
    ajax: {
        on_save: function on_save(data) {
            userinfo.data.name = auto_gen.name(userinfo.data.sex);
            userinfo.ajax.save.name(option_name.ajax.on_save);
            data = json.parse(data);
            if (data.sex) {
                userinfo.data.sex = data.sex;
                userinfo.action.set_sex();
            }
        }
    },
    action: {
        send_sex: function send_sex() {
            if (userinfo.data.sex == 0) {
                userinfo.data.sex = 2;
            } else if (userinfo.data.sex == 1) {
                userinfo.data.sex = 2;
            } else if (userinfo.data.sex == 2) {
                userinfo.data.sex = 1;
            }
            userinfo.ajax.save.sex(option_sex.ajax.on_save);
            userinfo.action.set_sex();
        },
        save: function save(sex) {
            userinfo.data.sex = sex;
            userinfo.ajax.save.sex(option_sex.ajax.on_save);
            userinfo.action.set_sex();
        }
    }
};

Vue.component('photo-view', {
    props: ['photo', 'thumb', 'width', 'height', 'bypass'],
    methods: {
        approve: function approve() {
            store.commit('approveViewPhoto');
        }
    },
    computed: Vuex.mapState({
        accept: function accept(state) {
            return state.accepts.photo || this.bypass ? true : false;
        }
    }),
    template: '#photo-view'
});

///
// Модальное окно настроек OptionDialog - контейнер
///
var OptionDialog = Vue.extend({
    template: '#option-static__dialog-window',
    props: {
        show: false
    },
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

var PhotoViewDialog = Vue.extend({
    methods: {
        close: function close() {
            store.commit('viewPhoto', { photo: null });
        }
    },
    components: {
        optionDialog: OptionDialog
    },
    computed: Vuex.mapState({
        config: function config(state) {
            return state.photoView;
        }
    }),
    template: '#option-content__photo-view'
});

var UploadDialog = Vue.extend({
    methods: {
        close: function close() {
            store.commit('viewUpload', false);
        }
    },
    components: {
        optionDialog: OptionDialog,
        uploadPhoto: UploadPhoto
    },
    computed: Vuex.mapState({
        config: function config(state) {
            return state.uploadView;
        }
    }),
    template: '#option-content__upload-photo'
});

var OptionStaticViewer = new Vue({
    el: '#option-static__viewer',
    store: store,
    components: {
        photoDialog: PhotoViewDialog,
        uploadDialog: UploadDialog
    }
});

// -- Статический блок опций ---
var option_static = {

    click_enable: null,
    active_elem: null,
    timer_id: null,
    form: null,

    init: function init() {
        if (!$('.option_static').length) return null;

        $('.option_static').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('click', option_static.action.preload);
                elem.data('active', 1);
            }
        }); // alert(1)
        $('#option-static__close').on('click', option_static.action.close);
    },

    ajax: {
        load: function load(option) {
            option_static.option.form.trash();
            $('#option-static__container').load('/static/htm/option_' + option + '.html', option_static.ajax.on_load);
        },
        on_load: function on_load(data) {
            // alert(visited.list)
            if (data) {
                option_static.action.router();
                option_static.action.show_form();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        },
        save: function save(tid) {
            //$.get( '/contact/addvisit/'+ uid +'/', { tid: tid }, visited.ajax.parse_save);
        }
    },

    option: {
        loader: {
            show: function show() {
                $('#option-static__loader').delay(1000).show('fade');
            },
            hide: function hide() {
                $('#option-static__loader').clearQueue();
                $('#option-static__loader').hide('fade');
            }
        },
        form: {
            show: function show() {
                $('#option-static__container').show('fade');
            },
            hide: function hide() {
                $('#option-static__container').hide('fade');
            },
            trash: function trash() {
                $('#option-static__container').empty();
            }
        },
        block: {
            show: function show() {
                $('#option-static').show('fade');
            },
            hide: function hide() {
                $('#option-static').hide('fade');
            }
        }
    },

    action: {
        show_form: function show_form() {
            option_static.option.form.show();
            option_static.option.loader.hide();
        },
        preload: function preload() {
            var option = $(this).data('option');
            option_static.form = option;
            if (option) {
                option_static.ajax.load(option);
                option_static.option.block.show();
                option_static.option.loader.show();
            }
        },
        close: function close() {
            option_static.option.form.hide();
            option_static.option.loader.hide();
            option_static.option.block.hide();
        },
        router: function router() {
            if (option_static.form == 'login') {
                option_login.init();
            }
            if (option_static.form == 'contact') {
                option_contact.init();
            }
            if (option_static.form == 'age') {
                option_age.init();
            }
            if (option_static.form == 'name') {
                option_name.init();
                name_suggest.init();
                city_suggest.init();
            }
            if (option_static.form == 'city') {
                option_city.init();
                city_suggest.init();
            }
            if (option_static.form == 'hidepass') {
                option_email.init();
            }
            if (option_static.form == 'anketa') {
                option_anketa.init();
                name_suggest.init();
                city_suggest.init();
            }
            if (option_static.form == 'chlogin') {
                option_chlogin.init();
            }
            if (option_static.form == 'introduce') {
                option_intro.init();
                name_suggest.init();
                city_suggest.init();
            }
            if (option_static.form == 'desire') {
                option_tag.init();
                tag_suggest.init();
            }
        }
    }
};

var option_tag = {

    loaded: 0,

    init: function init() {
        $('#option_tag input').prop('disabled', true);
        $('#option_tag_button').on('click', option_tag.action.send);
        option_tag.action.remind();
        option_tag.ajax.load();
    },
    ajax: {
        load: function load() {
            $.get('/tag/user/', option_tag.ajax.on_load);
        },
        on_load: function on_load(data) {
            data = json.parse(data);
            if (data.tags.length > 0) {
                option_tag.action.print(data.tags);
                user_tag.list = data.tags;
                user_tag.action.store();
            }
            $('#option_tag input').prop('disabled', false);
            //
            //option_static.action.close();
        },
        add: function add(tag) {
            $.post('/tag/add/', { tag: tag }, option_tag.ajax.on_save);
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.id) {
                user_tag.list[user_tag.list.length - 1].id = data.id;
                user_tag.option.set_count();
                option_tag.action.remind();
            } else {
                option_tag.option.error(option_tag.loaded);
            }
            $('#option_tag_value').val('');
            user_tag.action.store();
        },
        del: function del(id) {
            $.post('/tag/del/', { id: id });
        }
    },
    action: {
        remind: function remind() {
            if (user_tag.list.length > 0) {
                option_tag.action.print(user_tag.list);
            }
        },
        send: function send() {
            var tag = $('#option_tag_value').val();
            var data = { "tag": tag, "id": 0 };
            user_tag.list.push(data);
            option_tag.action.remind();
            option_tag.ajax.add(tag);
        },
        set: function set() {
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked') * 1;
        },
        print: function print(tags) {
            $('#option_tag_list').empty();
            for (var i = 0; i < tags.length; i++) {
                var style = '';
                var block_line = $('<i class="desire_tag">').text(tags[i].tag);
                if (!tags[i].id) block_line.addClass('desire_onload');
                block_line.data('id', tags[i].id);
                block_line.data('num', i);
                block_line.data('tag', tags[i].tag);
                block_line.attr('id', 'utag' + i);
                block_line.on('click', option_tag.action.del);
                $('#option_tag_list').append(block_line);
            }
        },
        add: function add() {
            option_tag.ajax.add($(this).data('tag'));
            option_tag.option.toggle(this);
            $(this).on('click', option_tag.action.del);
            var data = { "tag": $(this).data('tag'), "id": $(this).data('id') };
            user_tag.list.splice($(this).data('num'), 0, data);
        },
        del: function del() {
            option_tag.ajax.del($(this).data('id'));
            option_tag.option.toggle(this);
            user_tag.list.splice($(this).data('num'), 1);
            user_tag.option.set_count();
            $(this).on('click', option_tag.action.add);
        },
        ids: function ids() {
            user_tag.idls = [];
            for (var i = 0; i < user_tag.list; i++) {
                if (user_tag.list[i].id) user_tag.idls.push(user_tag.list[i].id);
            }
            return user_tag.idls;
        }
    },
    option: {
        toggle: function toggle(elem) {
            $(elem).off('click');
            $(elem).toggleClass('deleted_tag');
        },
        error: function error(i) {
            $('#utag' + [i]).off('click');
            $('#utag' + [i]).toggleClass('error_tag');
        }
    }
};

var profile_alert = {
    init: function init() {
        $('#profile_alert').on('click', profile_alert.option.hide);
    },
    option: {
        show: function show(text) {
            if (text) {
                var elem = $('#profile_alert');
                elem.clearQueue();
                elem.html(text);
                $('#profile_alert').show('fade');
                $("html, body").animate({ scrollTop: 0 }, "slow");
                elem.delay(5000).queue(profile_alert.option.hide);
            }
        },
        hide: function hide() {
            var elem = $('#profile_alert');
            elem.clearQueue();
            elem.hide('fade');
            elem.delay(500).queue(profile_alert.option.clear);
        },
        clear: function clear() {
            $('#profile_alert').empty();
        }
    }
};

var profile_option = {

    init: function init() {
        $('#profile_auth_button').on('click', profile_option.action.send_auth);
        $('#profile_send_pass').on('click', profile_option.action.send_pass);
        $('#profile_del_email').on('click', profile_option.action.del_email);
        $('#profile_subscr_send').on('click', profile_option.action.subscr);
    },
    ajax: {
        post: function post(login, pass) {
            $.post('/option/auth/', { login: login, pass: pass }, profile_option.ajax.on_save);
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                profile_alert.option.show(data.say);
            }
        },
        send_pass: function send_pass() {
            $.post('/option/passend/', profile_option.ajax.alert);
        },
        del_email: function del_email() {
            $.post('/option/demail/', profile_option.ajax.alert);
        },
        subscr: function subscr(_subscr) {
            $.post('/option/subscr/', profile_option.ajax.error);
        },
        alert: function alert(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                profile_alert.option.show(data.say);
            }
        },
        error: function error(data) {
            data = json.parse(data);
            if (data.err != undefined && data.err > 1) {
                profile_alert.option.show(data.say);
            }
        }
    },
    action: {
        send_email: function send_email() {
            option_email.ajax.post($('#profile_email_value').val());
        },
        send_auth: function send_auth() {
            profile_option.ajax.post($('#profile_login_value').val(), $('#profile_pass_value').val());
        },
        send_pass: function send_pass() {
            profile_option.ajax.send_pass();
        },
        del_email: function del_email() {
            profile_option.ajax.del_email();
        },
        subscr: function subscr() {
            var on = $('#subscr_status_on');
            var un = $('#subscr_status_off');
            if (on.text() == 'включены') {
                un.text('отключены');
                on.text('');
            } else {
                un.text('');
                on.text('включены');
            }
            profile_option.ajax.subscr();
        }
    }
};

// -- Обратная связь ---
var report = {

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

// -- Список контактов ---
var result_list = {

    init: function init() {
        //result_list.ajax.load_visited(); 
    },

    ajax: {

        load_visited: function load_visited() {
            $.get('/contact/visited/' + 'uid' + '/', result_list.ajax.parse_visited);
        },

        parse_visited: function parse_visited(data) {
            // alert(typeof(result_list.visited))
            if (data) {
                result_list.visited = JSON.parse(data);
            }
        }
    },

    action: {

        visited: function visited(list) {
            if (list && list.length) $('.user').each(result_list.action.select);
        },

        select: function select(i, element) {
            var tid = $(element).data('num') + '';
            if (tid != uid) // alert(typeof());  return 0;
                if (visited.list.indexOf(tid) < 0) $('i', $(element)).addClass('list_user_new');else $('i', $(element)).removeClass('list_user_new');
        }

    }
};

// -- Слайдер, главная ---
var slider = {

    timer: null,
    context: 0,
    next: 0,

    init: function init() {
        if (!$('div').is('#top_intro_info_block')) return null;

        $('#top_intro_info_block').on('mouseover', slider.stop);
        $('#top_intro_info_block').on('mouseout', slider.start);

        // Предзагрузка картинок
        setInterval(function () {
            var nn = slider.next + 1 < 5 ? slider.next + 1 : 0;
            var a1 = new Image();
            a1.src = "/img/board/top_intro_info_" + nn + ".jpg";
        }, 10000);
    },

    slide: function slide(num, st) {
        var top_intro_caption = [];
        var top_intro_context = [];
        top_intro_context[0] = 'Позволит познакомиться с парнем или девушкой для секса, найти партнёра в соседнем подъезде или доме напротив. Знакомиться в собственном дворе или районе уже сегодня';
        top_intro_caption[0] = 'Уникальный способ знакомства';
        top_intro_caption[1] = 'Знакомства без регистрации';
        top_intro_context[1] = 'Начинайте использовать всё и сразу, на полную, лишь только зайдя на сайт. Без подтверждений регистрации, без активации анкет. Лёгкий и быстрый поиск новых знакомств';
        top_intro_caption[2] = 'Секс знакомства без смс';
        top_intro_context[2] = 'Ни номеров телефонов, ни подтверждений, ни смс. 100% анонимность, лёгкое и раскрепощённое общение. Онлайн обмен любыми фотографиями. E-mail адрес и всё остальное указывается по желанию';
        top_intro_caption[3] = 'Онлайн общение, интимные темы';
        top_intro_context[3] = 'То что вы хотели спросить, то о чём вы хотели поговорить. Получайте прямо сейчас. Комфортное онлайн общение, интимные беседы, уютная обстановка и приятные собеседники уже ждут вас';
        top_intro_caption[4] = 'Секс знакомства бесплатно';
        top_intro_context[4] = 'Здесь всё бесплатно. Вам доступны все сервисы сайта полностью, уже сейчас. Ваша анкета всегда наверху. Vip аккаунтов нет, открытый доступ ко всем анкетам и безграничные возможности';

        if (num > 4) num = 0;
        for (var i = 0; i < 5; i++) {
            $('#board_img_' + i).removeClass('show');
            $('#board_img_' + i).attr('src', '');
        }

        $('#board_img_' + num).addClass('show active');
        $('#board_img_' + num).attr('src', '/img/board/top_intro_info_' + num + '.jpg');

        if (slider.context) {
            $('#top_intro_info_block_caption').text(top_intro_caption[num]);
            $('#top_intro_info_block_context').text(top_intro_context[num]);
        }

        slider.next = num;
    },

    start: function start() {
        slider.timer = setInterval(function () {
            slider.slide(++slider.next, 0);
        }, 20000);
    },

    stop: function stop() {
        clearTimeout(slider.timer);
    }

};

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

// -- Города, подсказки, поиск названия ---
var city_suggest = {

    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function init() {
        if (!$('.city_suggest').length) return null;

        $('.city_suggest').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('mouseover', city_suggest.enabled);
                elem.on('blur', city_suggest.blur);
                elem.on('keyup', city_suggest.ajax_load);
                elem.attr('autocomplete', 'off');
                elem.wrap($('<div class="suggest_wrap">'));
                elem.parent().append($('<div class="small_loader">'));
                elem.parent().append($('<div class="suggest_block">')); /**/
                elem.data('active', 1);
            }
        });
    },

    enabled: function enabled() {
        if (!$(this).data('click')) {
            $(this).on('click', city_suggest.ajax_load);
            $(this).data('click', 1);
        }
    },

    ajax_load: function ajax_load(elem) {
        // alert ($(this).val()); return false //  data('num')
        //if (!elem) elem = this;       
        city_suggest.active_elem = $(this);
        var city = city_suggest.active_elem.val();
        $.get('/town/suggest/', { q: city, hash: hash }, city_suggest.on_load);
        /* */
    },

    on_load: function on_load(data) {
        if (data) {
            var mess = JSON.parse(data);
            if (mess.cities) {
                city_suggest.hide_suggest();
                city_suggest.show_suggest(mess.cities);
            }
        }
    },

    blur: function blur() {
        $('.suggest_block').hide('fade');
    },

    hide_suggest: function hide_suggest() {
        $('.suggest_block').empty();
        $('.suggest_block').hide();
    },

    show_suggest: function show_suggest(cities) {
        var block_line = '';
        var block_this = city_suggest.active_elem.parent();
        for (var i = 0; i < cities.length; i++) {
            if (!cities[i]) continue;

            block_line = $('<div class="suggest_line" data-city="' + cities[i] + '">').text(cities[i]);
            block_line.on('click', city_suggest.print);

            $('.suggest_block', block_this).append(block_line);
        }

        if ($('.suggest_line', block_this).length) $('.suggest_block', block_this).show();
    },

    print: function print() {
        city_suggest.active_elem.val($(this).data('city'));
        city_suggest.hide_suggest();
    }

};

// -- Имена подсказки, поиск ---
var name_suggest = {

    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function init() {
        if (!$('.name_suggest').length) return null;

        $('.name_suggest').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('mouseover', name_suggest.enabled);
                elem.on('blur', name_suggest.blur);
                elem.on('keyup', name_suggest.ajax_load);
                elem.attr('autocomplete', 'off');
                elem.wrap($('<div class="suggest_wrap">'));
                elem.parent().append($('<div class="small_loader">'));
                elem.parent().append($('<div class="suggest_block">')); /**/
                elem.data('active', 1);
            }
        });
    },

    enabled: function enabled() {
        if (!$(this).data('click')) {
            $(this).on('click', name_suggest.ajax_load);
            $(this).data('click', 1);
        }
    },

    ajax_load: function ajax_load(elem) {
        //alert ($(this).val()); //return    data('num')
        //if (!elem) elem = this;       
        name_suggest.active_elem = $(this);
        var name = name_suggest.active_elem.val();
        $.post('/ajax/name.php', { name: name, hash: hash }, name_suggest.on_load);
        /* */
    },

    on_load: function on_load(data) {
        if (data) {
            var mess = JSON.parse(data);
            if (mess.names) {
                name_suggest.hide_suggest();
                name_suggest.show_suggest(mess.names);
            }
        }
    },

    blur: function blur() {
        $('.suggest_block').hide('fade');
    },

    hide_suggest: function hide_suggest() {
        $('.suggest_block').empty();
        $('.suggest_block').hide();
    },

    show_suggest: function show_suggest(names) {
        var block_line = '';
        var block_this = name_suggest.active_elem.parent();
        for (var i = 0; i < names.length; i++) {
            if (!names[i]) continue;
            block_line = $('<div class="suggest_line" data-name="' + names[i] + '">').text(names[i]);
            block_line.on('click', name_suggest.print);
            $('.suggest_block', block_this).append(block_line);
        }

        if ($('.suggest_line', block_this).length) $('.suggest_block', block_this).show();
    },

    print: function print() {
        name_suggest.active_elem.val($(this).data('name'));
        name_suggest.hide_suggest();
    }
};

// -- Таги подсказки, поиск ---
var tag_suggest = {

    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function init() {
        if (!$('.tag_suggest').length) return null;
        $('.tag_suggest').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('mouseover', tag_suggest.enabled);
                elem.on('blur', tag_suggest.blur);
                elem.on('keyup', tag_suggest.ajax_load);
                elem.attr('autocomplete', 'off');
                elem.wrap($('<div class="suggest_wrap">'));
                elem.parent().append($('<div class="small_loader">'));
                elem.parent().append($('<div class="suggest_block">')); /**/
                elem.data('active', 1);
            }
        });
    },
    enabled: function enabled() {
        if (!$(this).data('click')) {
            $(this).on('click', tag_suggest.ajax_load);
            $(this).data('click', 1);
        }
    },
    ajax_load: function ajax_load(elem) {
        tag_suggest.active_elem = $(this);
        var tag = tag_suggest.active_elem.val();
        $.post('/tag/suggest/', { tag: tag, hash: hash }, tag_suggest.on_load);
    },
    on_load: function on_load(data) {
        tag_suggest.hide_suggest();
        data = json.parse(data);
        if (data.tags.length > 0) {
            tag_suggest.show_suggest(data.tags);
        }
    },
    blur: function blur() {
        $('.suggest_block').hide('fade');
    },
    hide_suggest: function hide_suggest() {
        $('.suggest_block').empty();
        $('.suggest_block').hide();
    },
    show_suggest: function show_suggest(tags) {
        var block_line = '';
        var block_this = tag_suggest.active_elem.parent();
        for (var i = 0; i < tags.length; i++) {
            block_line = $('<div class="suggest_line" data-tag="' + tags[i] + '">').text(tags[i]);
            block_line.on('click', tag_suggest.print);
            $('.suggest_block', block_this).append(block_line);
        }
        if ($('.suggest_line', block_this).length) $('.suggest_block', block_this).show();
    },

    print: function print() {
        tag_suggest.active_elem.val($(this).data('tag'));
        tag_suggest.hide_suggest();
    }
};

var user_menu = {

    init: function init() {},
    ajax: {},
    action: {
        sets: {
            search: function search() {
                var str = '/index.php?view=simple&town=' + userinfo.data.town + '&years_up=' + userinfo.data.years_up + '&years_to=' + userinfo.data.years_to + '' + '&who=' + userinfo.data.who + ''; // alert(userinfo.data.years_up)
                $('#menu_user_button_search').attr('href', str);
            },
            contact: function contact() {
                //storage.save('contact',0);
                //storage.load('contact');
                var str = '/mail.php';
                $('#menu_message').attr('href', str);
            }
        }
    },
    option: {
        act: {
            show_reg: function show_reg() {
                $('#menu_user_action_new').show();
                $('#menu_user_action_block').hide();
            },
            show_opt: function show_opt() {
                $('#menu_user_action_new').hide();
                $('#menu_user_action_block').show();
            }
        },
        se: function se() {}
    }
};

var user_tag = {

    list: [],
    idls: [],
    sync: 0,
    count: 0,

    init: function init() {
        user_tag.list = storage.array.load('user_tag_list');
        user_tag.sync = storage.load('sync_taglist');
        user_tag.count = storage.load('user_tag_count');
    },
    action: {
        store: function store() {
            storage.array.save('user_tag_list', user_tag.list);
            storage.save('user_tag_count', user_tag.count);
            storage.save('sync_taglist', user_tag.sync);
        },
        ids: function ids() {
            user_tag.idls = [];
            for (var i = 0; i < user_tag.list.length; i++) {
                if (user_tag.list[i].id) user_tag.idls.push(user_tag.list[i].id);
            }
            return user_tag.idls;
        }
    },
    option: {
        set_count: function set_count() {
            if (user_tag.list.length) $('#user_desire_count').text(user_tag.list.length);
        }
    }
};

// -- Информация о пользователе ---
var userinfo = {

    data: {
        uid: 0,
        sex: 0,
        age: 0,
        name: '',
        city: '',
        city_id: 0,
        verify: 0,
        name_mod: 0,
        apromt: 0,
        daily: 0,

        town: '',
        who: 0,
        years_up: 0,
        years_to: 0,
        virt: 0,
        close: 0,

        dating: '',
        setting: 0,
        assist: 0,
        intim: 0,

        second: 0,
        time: 0,
        email: ''
    },

    init: function init() {
        userinfo.ajax.load();
    },
    ajax: {
        load: function load(option) {
            $.get('/sync/sess/', userinfo.ajax.on_load);
        },
        on_load: function on_load(data) {
            // alert(userinfo.name)
            data = json.parse(data);
            if (data && data.uid) {
                userinfo.data = data;
                userinfo.action.set_data(data);
                master_info.init();
            } else {
                storage.save('auth', 0);
                user_menu.option.act.show_reg();
                userinfo.action.set_string();
            }
        },
        save: {
            sex: function sex(func) {
                $.post('/option/sex/', { sex: userinfo.data.sex }, func);
            },
            age: function age(func) {
                $.post('/option/age/', { age: userinfo.data.age }, func);
            },
            name: function name(func) {
                $.post('/option/name/', { name: userinfo.data.name }, func);
            },
            city: function city(func) {
                $.post('/option/city/', { city: userinfo.data.city }, func);
            }
        }
    },
    action: {
        set_data: function set_data(data) {
            storage.save('auth', data.uid);

            user_menu.option.act.show_opt();
            user_menu.action.sets.search();

            userinfo.action.set_sex();
            userinfo.action.set_age();
            userinfo.action.set_name();
            userinfo.action.set_city();

            userinfo.action.set_string(); /**/
        },
        set_name: function set_name() {
            if (userinfo.data.name && userinfo.data.name.length > 2) {
                $('.user_name_option').text(userinfo.data.name);
                $('.name_suggest').val(userinfo.data.name);
            }
            userinfo.action.set_string();
        },
        set_age: function set_age(say) {
            if (userinfo.data.age > 0) $('.user_age_option').text(userinfo.data.age);
            if (say) $('.user_age_say').text(say);
            userinfo.action.set_string();
        },
        set_city: function set_city() {
            if (userinfo.data.city && userinfo.data.city.length > 3) {
                $('.user_city_option').text(userinfo.data.city);
                $('.city_suggest').val(userinfo.data.city);
            }
            //userinfo.data.city_id = city['city_id'];
            //userinfo.data.verify  = city['verify'];
            userinfo.action.set_string();
        },
        set_sex: function set_sex() {
            var say;
            if (userinfo.data.sex == 0) {
                say = 'Парень или девушка';
            } else if (userinfo.data.sex == 1) {
                say = 'Парень';
            } else if (userinfo.data.sex == 2) {
                say = 'Девушка';
            }
            $('.user_sex_option').text(say);
        },
        set_string: function set_string() {
            var str = userinfo.data.name ? userinfo.data.name : '';
            if (!userinfo.data.name) {
                if (userinfo.data.sex == 1) {
                    str = 'Парень';
                } else if (userinfo.data.sex == 2) {
                    str = 'Девушка';
                }
            }

            var cityLen = userinfo.data.city ? userinfo.data.city.length : 0;
            if (userinfo.data.age > 10 || cityLen > 3) {
                str = str + ', ';
            }
            if (userinfo.data.age > 10) str = str + userinfo.data.age + ' ';
            if (20 - str.length - cityLen >= 0) {
                str = str + userinfo.data.city;
            }
            if (!str) {
                str = 'Кто вы?';
            }
            if (userinfo.data.uid) {
                $('.user_string_option').text(str);
                storage.save('user_string_print', str);
            } else
                //if (!uid)
                $('.user_string_option').text('');
        },
        set_email: function set_email() {
            $('.option_email_value').val(userinfo.data.email);
            $('.profile_email_value').text(userinfo.data.email);
        }

    }
};

// -- Список посещенных страниц ---
var visited = {

    sync: 0,
    list: [],

    init: function init() {
        if (storage.enable) {
            visited.list = storage.array.load('visitor_list'); // alert(visited.list)
            result_list.action.visited(visited.list);
            visited.ajax.sync();
        }
    },

    ajax: {

        sync: function sync() {
            $.get('/sync/visitor/' + uid + '/', visited.ajax.parse_sync);
        },

        parse_sync: function parse_sync(data) {
            if (data) {
                visited.sync = JSON.parse(data); // alert(visited.sync)             
                visited.action.check();
            }
        },

        load: function load() {
            $.get('/contact/visited/' + uid + '/', visited.ajax.on_load);
        },

        on_load: function on_load(data) {
            // alert(visited.list)   
            if (data) {
                visited.list = JSON.parse(data);
                storage.array.save('visitor_list', visited.list);
                result_list.action.visited(visited.list);
            }
        },

        save: function save(tid) {
            $.get('/contact/addvisit/' + uid + '/', { tid: tid }, visited.ajax.parse_save);
        },

        parse_save: function parse_save(data) {
            // 
            if (data) {
                var sync = JSON.parse(data) * 1;
                if (sync) {
                    visited.sync = sync;
                    storage.save('visitor_sync', visited.sync);
                }
            }
        }

    },

    index: function index(data) {
        var result = 0;
        visited.action.load_cache();
        if (visited.list.length && visited.list.indexOf(data + '')) {
            result = 1; // alert('index')
        }
        return result;
    },

    action: {

        check: function check() {
            if (visited.sync != storage.load('visitor_sync')) {
                visited.ajax.load();
                storage.save('visitor_sync', visited.sync);
            }
        },

        save: function save(data) {
            console.log("save", data);
            visited.list = storage.array.load('visitor_list');
            if (visited.list.indexOf(data + '') < 0) {
                visited.list.push(json.encode(data));
                storage.array.save('visitor_list', visited.list);
                visited.ajax.save(data);
            }
        },

        load_cache: function load_cache() {
            if (storage.enable) {
                visited.list = storage.array.load('visitor_list');
            } else visited.list = [];
        }

    }
};
