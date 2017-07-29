
var json = {
        
    parse: function (str) 
    {
        var result = null;
        try 
        {
            result = JSON.parse(str);
        } 
        catch (e) { }
        
        return result;
    } ,
    
    encode: function (str) 
    {
        return JSON.stringify(str); 
    }       
}       
   


var cookie_storage = {
         
    enabled: 0, 

    init: function () 
    {  

    } ,

    get_cookie: function (name) 
    {       
        var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' ); 
        if (results)
          return (unescape(results[2]));
        else
          return null; 
    } ,
     
    del_cookie: function (name) 
    {              
        let expires = new Date(); // получаем текущую дату 
        expires.setTime( expires.getTime() - 1000 ); 
         document.cookie = name + "=; expires=" + expires.toGMTString() +  "; path=/";  
    } ,    
    
    set_cookie: function (name, val, time) 
    {      
        let expires = new Date(); 
        expires.setTime( expires.getTime() + (1000 * 60 * time ) ); // минут
        document.cookie = name + "="+ val +"; expires=" + expires.toGMTString() +  "; path=/";
    } ,  
    
    get_data: function (name) 
    {   
        return json.parse(get_cookie(name));     
    } ,  
    
    set_data: function () 
    {  

    }  
  
  

}



function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

function del_cookie ( name ) {
  let expires = new Date(); // получаем текущую дату
  expires.setTime( expires.getTime() - 1000 );
   document.cookie = name + "=; expires=" + expires.toGMTString() +  "; path=/";
}
function set_cookie ( name, val, time ) {
  let expires = new Date();
  expires.setTime( expires.getTime() + (1000 * 60 * time ) ); // минут
   document.cookie = name + "="+ val +"; expires=" + expires.toGMTString() +  "; path=/";
}



var device = {    
        
    init: function () 
    {   
                                      
    } ,

    width: function () 
    {   
        return $(window).width();                                 
    } ,

    height: function () 
    {   
        return $(window).height();  //document                               
    }  
    
        
}
  


function disabled_with_timeout(elem,time) {  
 elem.prop("disabled",true);
 setTimeout( function (){
  elem.prop("disabled",false);
 },time * 1000); 
}



// -- Получить новый хэш ---
var hash; 
function simple_hash() { 
  var now = new Date(); 
   hash = now.getTime();  
}
     
function disabled_with_timeout(elem,time) {  
 elem.prop("disabled",true);
 setTimeout( function (){
  elem.prop("disabled",false);
 },time * 1000); 
}
     


// -- Хранилище ---
var storage = {

    enable:  0,

    init: function ()
    {
        if (storage.is_enable())
        {
            storage.enable = 1;
        }

    } ,

    is_enable: function ()
    {
        try
        {
            return 'localStorage' in window && window['localStorage'] !== null;
        }
        catch (e)
        {
            return false;
        }
    } ,

    save: function (key,val)
    {
        if (storage.enable)
        {
            localStorage.setItem(key,val);
        }
    } ,

    load: function (key,def)
    {
        var result = def ? def : null;

        if (storage.enable && localStorage.getItem(key))
        {
            result = localStorage.getItem(key);
        }

        return result;
    } ,

    array: {

        load: function (key)
        {
            var result = [];
            var value = null;

            value = storage.load(key);
            value = json.parse(value);
            if (value)
                result = value;

            return result;
        } ,

        save: function (key,val)
        {
            storage.save(key,json.encode(val));
        } ,

        add: function (key,val)
        {

        }
    }
}

storage.init();


const AccountActivity = Vue.component('account-activity', {
    props: ['humanId'],
    data() {
        return {
            loading: false,
        };
    },
    mounted() {
        this.load();
    },
    computed: {
        human() {
            return this.$store.state.search.human;
        },
        age() {
            return this.human.age ? moment.duration(this.human.age, "years").humanize() : null;
        },
        tags() {
            return ('tags' in this.human) ? this.human.tags : [];
        },
        social() {
            let {em, vk, ok, fb, go} = this.human;
            if (em || vk || ok || fb || go) {
                return {em, vk, ok, fb, go};
            }
            return null;
        },
        interact() {
            let {ph, sk} = this.human;
            if (ph || sk) {
                return {ph, sk};
            }
            return null;
        },
        figure() {
            var figure = this.human.anketa ? this.human.anketa.figure : null;
            var result = figure;
            switch (figure) {
                case 2: result = 'спортивного'; break;
                case 3: result = 'обычного'; break;
                case 5: result = 'полного'; break;
                case 6: result = 'худого'; break;
            }
            return result;
        },
        hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        who() {
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
        ago() {
            var {last} = this.human;
            var result = 'Онлайн';
            if (last > 2592000) {
                result = null;
            } //else
            if (last > 777) {
                result = moment.duration((0 - last), "seconds").humanize(true);
            }
            return result;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        loaded() {
            this.loading = false;
                console.log(this.human);
        },
        hope() {
            setTimeout(() => this.loading = false, 4 * 1000);
        },
        load() {
            this.loading = true;
            this.hope();
            store.dispatch('HUMAN', this.humanId).then((response) => {
                this.loaded();
            }).catch((error) => {
                console.log(error);
                this.loading = false;
            });
        }
    },
    template: '#account-activity',
});

const ActivityActions = {
    beforeRouteLeave(to, from, next) {
        console.log('Leave:', [to, from]);
        next();
    },
    methods: {
        close() {
            this.$emit('close');
        },
        back(back) {
            back = (back === undefined) ? this.$route.meta.back : back;
            console.log('back:', back);
            (back === undefined) ? this.$router.push('/') : this.$router.push(back);
        },
    },
}


var ClosedActivity = Vue.component('closed-activity', {
    extends: ActivityActions,
    template: '#closed-activity',
});


var DefaultActivity = Vue.component('default-activity', {
    extends: ActivityActions,
    template: '#default-activity',
});


const MessagesActivity = Vue.component('messages-activity', {
    extends: DefaultActivity,
    props: ['humanId', 'title'],
    data() {
        return {
            message: '',
            caption: '',
        reply:  '',
        code:  '',
        show: true,
        process: false,
        approve: true,
        dirt: false,
            captcha: false,
            preview: false,
            photo: false,
        }
    },
    // beforeRouteUpdate(to, from, next) {
    //     this.photo = this.preview;
    //     console.log('MessagesActivity', this.photo);
    //     next();
    // },
    mounted: function () {
        if (this.title) {
            this.caption = this.title;
        }
    },
    methods: {
        reset() {
            //this.cancelPhoto();
            this.show = true;
            this.process = false;
            this.approve = true;
            this.message = '';
            this.photo = null;
        },
        isDirt: _.debounce(function() {
            let word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i;
            this.dirt = word.test(this.message) ? true : false;
            return this.dirt;
        }, 700),

        close() {
            //this.$emit('close');
            this.back();
        },
        cancel() {
            this.captcha = false;
            this.confirm = false;
            this.ignore = true;
            console.log('cancel');
        },
        select(data) {
            this.photo = data;
            this.preview = data;
        },
        sendMessage() {
            console.log(data);
            let data = {
                id: this.humanId,
                captcha_code: this.code
            };
            if (this.photo && this.photo.alias) {
                data['photo'] = this.photo.alias;
            } else
            if (true) {
                data['mess'] = this.message;
                data['re'] = this.reply;
            }
            this.$store.commit('intimate/notifi', false);
            api.messages.send(data).then((response) => {
                this.onMessageSend(response.data);
            }).catch(() => {
                this.onError();
            });
            this.preview = null;
            this.process = true;
            console.log(data);
        },
        setCode(code) {
            this.code = code;
            this.sendMessage();
        },
        onMessageSend(response) {
            if (!response.saved && response.error) {
                if (response.error == 'need_captcha') {
                    this.captcha = true;
                }
                this.onError();
            } else {
                this.sended(response);
            }
            this.process = false;
        },
        sended(response) {
            //MessList.messages.unshift(response.message);
            this.$refs.messages.reload();
            // TODO: очень старая зависимость
            giper_chat.timer_cut();
            this.reset();
        },
        onError() {
            this.process = false;
        },
        account() {
            this.$router.push(this.humanId + '/detail')
        },
        uploads() {
            this.$router.push(this.humanId + '/uploads')
        },
        incoming() {
            this.$router.push(this.humanId + '/incoming')
        },
        // preview() {
        //     this.$router.push(this.humanId + '/preview')
        // },
        videochat() {
            window.open('/videochat.php?to='+this.humanId, 'videochat', 'width=432, height=280, resizable=yes, scrollbars=yes');
        }
    },
    template: '#messages-activity',
});


const SearchActivity = Vue.component('search-activity', {
    extends: DefaultActivity,
    data() {
        return {

        };
    },
    beforeRouteUpdate(to, from, next) {
        if (to.fullPath == '/search' && from.fullPath == '/search/settings/search') {
            this.$refs.results.reload();
        }
        next();
    },
    computed: {

    },
    methods: {
        close() {
            this.back();
        },
    },
    template: '#search-activity',
});

Vue.component('api-key-update', {
    props: [
      'item',
    ],
    data() {
        return {
            showOption:  false,
        }
    },
    methods: {
        upKey() {
            console.log('upKey');
            axios.get('/sync/sess/').then((response) => {
                this.$store.dispatch('LOAD_API_TOKEN');
                this.upUser(response.data);
                this.upSettings(response.data);
            });
        },
        upUser(data) {
            let {uid, city, sex, age, name, contacts, apromt: promt} = data;
            //console.log('upUser', data);
            this.$store.commit('resetUser', {uid, city, sex, age, name, contacts, promt});
            //store.commit('loadUser', data.contacts);
        },
        upSettings(data) {
            let {who, years_up: up, years_to: to, close: town, virt} = data;
            this.$store.commit('settings', {who, up, to, virt, town});
        }
    },
    mounted() {
        this.upKey();
        setInterval(() => {
            this.upKey();
        }, 1000 * 600);
    },
    template: '#api-key-update'
});


Vue.component('attention-wall', {
    props: ['show', 'text'],
    data() {
        return {
            content: {
                1: {
                    caption: 'Предупреждение',
                    text: `На сообщения от этого пользователя поступают жалобы. Возможно его сообщения имеют грубый тон,
                    могут оскорбить, содержат интим фотографии, бессмысленные или резкие предложения.`
                },
                8: {
                    caption: 'Внимание',
                    text: `Действия пользователя нарушают правила. Сообщения пользователя намеренно оскорбительны,
                    имеют противоправное содержание, обман или предложение оплаты услуг.`
                }
            }
        }
    },
    computed: {
        caption() {
            return this.content[this.show].caption;
        },
        text() {
            return this.content[this.show].text;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        remove() {
            this.$emit('remove');
            this.close();
        },
    },
    template: '#attention-wall',
});



Vue.component('auth-board', {
    data() {
        return {
            confirmSend: false,
            hint: 'Введите ваш емаил.',
            process: false,
            email: ''
        }
    },
    mounted() {
        _.delay(() => {
            this.$store.dispatch('auth/SYNC').then(() => {
                this.email = this.$store.state.auth.email;
            });
        }, 2500);
    },
    computed: {
        login() {
            return this.$store.state.auth.login;
        },
        password() {
            return this.$store.state.auth.pass;
        },
        loaded() {
            return this.login && this.password;
        },
    },
    methods: {
        send() {
            if (!this.email) {
                return;
            }
            this.process = true;
            this.hint = 'Отправляю...';
            this.$store.dispatch('auth/SAVE_EMAIL', this.email).then((response) => {
                this.hint = response.data.say;
                this.error = response.data.err;
                this.sended();
            });
        },
        sended() {
            this.process = false;
            if (!this.error) {
                this.emit('close');
            }
        },
    },
    template: '#auth-board'
});

Vue.component('captcha-dialog', {
    data() {
        return {
            code: '',
            inc: 0
        }
    },
    computed: {
        src() {
            return '/secret_pic.php?inc=' + this.inc;
        }
    },
    methods: {
        close() {
            this.$emit('cancel');
        },
        send() {
            this.$emit('send', this.code);
            this.update();
            this.close();
        },
        update() {
            this.inc++;
        },
    },
    template: '#captcha-dialog',
});

Vue.component('city-suggest', {
    props: ['city'],
    data() {
        return {
            query: '',
            cities: [],
            enable: true
        };
    },
    mounted() {
        if (!this.query && this.city && this.city.length > 2) {
            this.query = this.city;
        }
    },
    computed: {
        suggested() {
            return this.cities.length;
        }
    },
    methods: {
        load() {
            if (!this.query.length) {
                return this.reset();
            }
            api.user.get({q: this.query, hash}, 'town/suggest').then((response) => {
                this.loaded(response.data.cities);
            });
        },
        reset() {
            this.cities = [];
        },
        select(item) {
            this.query = item;
            this.$emit('select', item);
            this.reset();
        },
        loaded(data) {
            if (data && data.length) {
                this.cities = data;
            } else {
                this.reset();
            }
        },
    },
    template: '#city-suggest',
});


var ContactDialog = {
    extends: DefaultActivity,
    props: [
      'quick',
    ],
    data() {
        return {
            response: false,
            slow: false,
            error: false,
            amount: 0,
            offset: 0,
            batch: 10,
            max: 100,
            dialog: false,
        }
    },
    computed: {
        showLoader() {
            return this.slow && !this.response;
        },
        showAlert() {
            return this.error && this.response;
        },
        showHint() {
            return this.count < 1;
        },
        count() {
            let result = this.contacts ? this.contacts.length : 0;
            return result;
        },
        more() {
            let max = this.offset <= this.max - this.batch;
            let min = this.amount >= this.batch;
            return (min && max);
        }
    },
    methods: {
        close() {
            //this.$emit('close');
            this.back();
        },
        reset() {
            this.response = false;
            this.error  = false;
            this.slow = false;
        },
        hope() {
            let sec = 2;
            setTimeout(() => this.slow = true,  sec * 1000);
            this.reset();
        },
        loaded(result) {
            //this.received = result ? result.length : 0;
            // if (this.received) {
            //     this.contacts = _.union(this.contacts, result);
            // }
            this.offset += this.batch;
            this.amount = this.count;
            this.response = true;
            this.slow = false;
        },
        bun(index) {
            let item = this.contacts[index];
            console.log('bun', item);
            this.remove(index); return;
            api.bun.send({
                id: item.cont_id,
                tid: item.from,
                //text: this.item.message,
                //token: 'super secret token'
            });
        },
        splice(index) {
            this.$store.commit('delete', index);
        },
        error(error) {
            this.response = true;
            this.error = true;
            console.log(error);
        },
        dialogOpen(data) {
            this.dialog = data.id;
            this.title = data.title;
        }
    },
    mounted() {
        this.load();
    }
};


const InitialDialog = Vue.component('initial-dialog', {
    extends: ContactDialog,
    mounted() {
        this.$store.dispatch('initial/CHECK');
    },
    computed: {
        initial: () => true,
        simple:  () => true,
        contacts() {
            //console.log(this.$store);
            return this.$store.state.contacts.initial.list;
        }
    },
    methods: {
        load() {
            this.$store.dispatch('initial/LOAD').then((response) => {
                this.loaded();
            });
            this.amount = this.count;
            this.hope();
        },
        next() {
            this.$store.dispatch('initial/NEXT', this.offset).then((response) => {
                this.loaded();
            });
            this.reset();
        },
        remove(index) {
            this.$store.dispatch('initial/DELETE', index);
        },
        read(index) {
            console.log('initial=read', index);
            this.$store.dispatch('initial/READ', index);
        },
        splice(index) {
            //console.log(this.$store); return;
            this.$store.commit('initial/delete', index);
        },
    },
    template: '#initial-dialog'
});

const IntimateDialog = Vue.component('intimate-dialog', {
    extends: ContactDialog,
    data() {
        return {
            max: 100
        }
    },
    mounted() {
        this.$store.dispatch('intimate/CHECK');
    },
    computed: {
        initial: () => true,
        simple:  () => false,
        contacts() {
            return this.$store.state.contacts.intimate.list;
        }
    },
    methods: {
        load() {
            this.$store.dispatch('intimate/LOAD', this.next).then((response) => {
                this.loaded();
            }).catch((error) => this.error = error);
            this.amount = this.count;
            this.hope();
        },
        next() {
            this.$store.dispatch('intimate/NEXT', this.offset).then((response) => {
                this.loaded();
            });
            this.hope();
        },
        remove(index) {
            console.log('imm=remove', index);
            this.$store.dispatch('intimate/DELETE', index);
        },
        read(index) {
            console.log('intimate=read', index);
            this.$store.dispatch('intimate/READ', index);
        },
        splice(index) {
            this.$store.commit('intimate/delete', index);
        },
    },
    template: '#intimate-dialog'
});

const SendsDialog = Vue.component('sends-dialog', {
    extends: ContactDialog,
    computed: {
        initial: () => false,
        simple:  () => false,
        contacts() {
            return this.$store.state.contacts.sends.list;
        }
    },
    methods: {
        load() {
            this.$store.dispatch('sends/LOAD', this.next).then((response) => {
                this.loaded();
            });
            this.amount = this.count;
            this.hope();
        },
        next() {
            this.$store.dispatch('sends/NEXT', this.offset).then((response) => {
                this.loaded();
            });
            this.reset();
        },
        remove(index) {
            this.$store.dispatch('sends/DELETE', index);
        },
        splice(index) {
            this.$store.commit('sends/delete', index);
        },
    },
    template: '#initial-dialog'
});



Vue.component('contact-item', {
    props: [
      'item',
      'index',
      'quick',
    ],
    data() {
        return {
            account: false,
            detail:  false,
            confirm: false
        }
    },
    computed: {
        name() {
            var result = 'Парень или девушка';
            if (this.item.user) {
                result = this.item.user.sex == 2 ? 'Девушка' : 'Парень';
                if (this.item.user.name) {
                    result = this.item.user.name;
                }
            }
            return result;
        },
        age() {
            return this.item.user && this.item.user.age ? this.item.user.age : '';
        },
        city() {
            return this.item.user && this.item.user.city ? this.item.user.city : '';
        },
        title() {
            return this.name + ' ' + this.age + ' ' + this.city;
        },
        message() {
            return this.item.message ? this.item.message.text : '';
        },
        unread() {
            return this.item.message ? this.item.message.unread : 0;
        },
        sent() {
            return this.item.message ? (this.item.message.sender == this.$store.state.user.uid) : 0;
        },
        humanId() {
            return this.item.human_id;
        },
    },
    methods: {
        show() {
            //this.$emit('show');
            if (this.quick) {
                this.reply();
            } else {
                //this.anketa();
                this.dialog();
            }
        },
        reply() {
            this.$emit('read', this.index);
            this.$router.push({ name: 'quickReply', params: {
                humanId: this.humanId,
                message: this.message,
                index: this.index
            } });
        },
        dialog() {
            this.$emit('read', this.index);
            //this.$emit('dialog', {id: this.humanId, title: this.title});
            this.$router.push({ name: 'dialog', params: {humanId: this.humanId, title: this.title} });
        },
        confirmBun() {
            this.confirm = 'doit';
        },
        confirmRemove() {
            //this.$emit('remove');
            //console.log('initial-item REMOVE');
            this.confirm = !this.quick ? 'some' : 'must';
        },
        close() {
            this.detail = false;
            console.log('close');
        },
        bun() {
            console.log('bun1', this.index);
            this.$emit('bun', this.index);
        },
        remove() {
            console.log('remove=remove', this.index);
            this.$emit('remove', this.index);
        },
        cancel() {
            this.confirm = false;
            console.log('cancel');
        },
        sended() {
            this.$emit('sended', this.index);
            this.close();
        }
    },
    template: '#contact-item'
});


Vue.component('desire-tag-item', {
    props: ['id', 'tag'],
    data() {
        return {
            active: false,
            error: false,
        }
    },
    methods: {
        select() {
            this.$emit('select');
        }
    },
    template: '#desire-tag-item'
});

Vue.component('email-sended', {
    template: '#email-sended'
});

Vue.component('inform-dialog', {
    props: [
      'loader',
      'alert',
      'hint',
    ],
    computed: {
        hasContext() {
            return !!this.$slots.context;
        },
        hasHint() {
            return !!this.$slots.hint;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
    template: '#inform-dialog'
});


Vue.component('intro-info', {
    data() {
        return {
            slide: 1
        }
    }
});

Vue.component('loading-cover', {
    props: ['show', 'text'],
    computed: {
        loader() {
            return this.text ? this.text : 'Отправляю';
        }
    },
    template: '#loading-cover',
});




Vue.component('loading-wall', {
    props: ['show', 'text'],
    data() {
        return {
            hope: false
        }
    },
    computed: {
        loader() {
            return this.text ? this.text : 'Загружаем';
        }
    },
    mounted() {
        this.hope = false;
        setTimeout(() => this.hope = true, 3000);
    },
    template: '#loading-wall',
});




const MenuUser = Vue.component('menu-user', {
    data() {
        return {

        }
    },
    computed: {
        authorized() {
            return (this.$store.state.user.uid > 0) ? 1 : 0;
        },
        newMessage() {
            let {status} = this.$store.state.contacts.intimate;
            return (status == false) || status < 8;
        },
        newContact() {
            let {status} = this.$store.state.contacts.initial;
            return (status == false) || status < 8;
        },
        signature() {
            var results = 'Кто вы?';
            let {name, city, age, sex} = this.$store.state.user;
            if (sex) {
                results = sex == 1 ? 'Парень' : 'Девушка';
                results = name ? name : results;
                return results + ' ' + (age ? age : '') + ' ' + (city ? city : '');
            }
            return results;
        }
    },
    methods: {
        search() {
            this.$store.commit('simple', true);
            this.$root.reload();
            this.$router.push('/');
        },
        initial() {
            this.$router.push({ name: 'initial' });
        },
        intimate() {
            this.$router.push({ name: 'intimate' });
        },
        loadStatus() {
            axios.get('/mailer/status').then((response) => {
                this.onIntimate(response.data.message);
                this.onInitial(response.data.contact);
            });
        },
        onIntimate(status) {
            let {notified, status: current} = this.$store.state.contacts.intimate;
            this.$store.commit('intimate/status', status);

            notified = (!notified || status != current) ? false : true;
            if (status == 1 && !notified && this.newMessage) {
                let callback = () => this.$router.push({ name: 'intimate' });
                this.$store.commit('intimate/notifi', true);
                this.$emit('snackbar', 'Новое сообщение', callback, 'Смотреть', true);
            }
        },
        onInitial(status) {
            let {notified, status: current} = this.$store.state.contacts.initial;
            this.$store.commit('initial/status', status);

            notified = (!notified || status != current) ? false : true;
            if (status == 1 && !notified && this.newContact && !this.newMessage) {
                let callback = () => this.$router.push({ name: 'initial' });
                this.$store.commit('initial/notifi', true);
                this.$emit('snackbar', 'Новое знакомство', callback, 'Смотреть', true);
            }
        },

        regmy() {
            window.location = '/?regmy';
        },
    },
    mounted() {
        let delay = 15;
        this.loadStatus();
        setInterval(() => {
            this.loadStatus();
        }, delay * 1000);
    },
});


Vue.component('list-date', {
    props: ['list','index'],
    computed: {
        count() {
            return this.list.length;
        },
        item() {
            return this.list[this.index];
        },
        currDate() {
            return moment(this.item.date).date();
        },
        prevDate() {
            if (this.index && this.index < this.count) {
                return moment(this.list[this.index-1].date).date();
            }
        },
        month() {
            return moment(this.item.date).format('MMMM').substring(0,3);
        },
        formatted() {
            var result = this.currDate + ' ' + this.month;
            let today = moment().date();
            let yestd = moment().subtract(1, 'day').date();
            result = (this.currDate === today) ? 'Сегодня' : result;
            result = (this.currDate === yestd) ? 'Вчера' : result;
            return result;
        },
        date() {
            if (this.prevDate != this.currDate) {
                return this.formatted;
            } else {
                return null;
            }
        },
    },
    template: '#list-date',
});

var prev  = null;

Vue.component('message-item', {
    props: [
      'item',
      'index',
      'count',
      'alert'
    ],
    template: '#messages-item',
    data() {
        return {
            showOption:  false,
            fixOption:   false,
            alertOption: false,
            showDialog: false,
            photo: false,
        }
    },
    methods: {
        fix() {
            this.showOption = true;
            this.alertOption = false;
            if (!this.alert) {
                this.fixOption = this.alert ? false : !this.fixOption;
            } else {
                this.$emit('admit');
            }
        },
        bun() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken}
            };
            let data = {
                id:  this.item.id,
                tid: this.item.from
            };
            axios.post('/mess/bun/', data, config).then((response) => {
                this.$emit('remove', this.index);
            }).catch((error) => {
                console.log('error');
            });
        },
        cancel() {
            this.showDialog = false;
            console.log('cancel');
        },
        remove() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken}
            };
            let data = {
                id:  this.item.id
            };
            axios.post('/mess/delete/', data, config).then((response) => {
                //this.$emit('remove', this.index);
            }).catch((error) => {
                console.log(error);
            });
            this.$emit('remove', this.index);
        },
        play() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: { tid: this.item.from }
            };
            let server = this.$store.state.photoServer;
            let url = `http://${server}/api/v1/users/${this.uid}/sends/${this.alias}.jpg`;
            axios.get(url, config).then((response) => {
                this.preview(response.data.photo)
            }).catch((error) => {
                console.log(error);
            });
        },
        preview(photo) {
            let links = photo._links;
            if (links.origin.href) {
                this.photo = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias:  photo.alias,
                    height: photo.height,
                    width:  photo.width,
                }
            }
        },
        pathName(name) {
            if (!name || name.length < 10) {
                return null;
            }
            let path = [
                name.substr(0, 2),
                name.substr(2, 2),
                name.substr(4, 3),
            ];
            return path.join('/')+'/'+name;
        },
    },
    mounted() {
        if (!this.sent && !this.index && this.count < 5) {
            this.fix();
            this.alertOption = true;
        }
        if (!this.sent && !this.read) {
            this.$emit('set-new');
        }
        //console.log('item', this.index +'+'+ this.date);
    },
    updated() {
        //console.log('item', this.index +'+'+ this.date);
    },
    computed: {
        uid() {
            return this.$store.state.user.uid;
        },
        attention() {
            return (this.alert || this.alertOption) ? 1 : 0;
        },
        option() {
            if (!this.index && this.alert) {
                return true;
            }
            return (this.showOption || this.fixOption) ? 1 : 0;
        },
        sent() {
            return (!this.uid || this.uid == this.item.from) ? 1 : 0;
        },
        read() {
            return (this.item.read == 0) ? false : true;
        },
        time() {
            return moment(this.item.date).format('HH:mm');
        },
        alias() {
            let result = false;
            let text = this.item.mess;
            let old = /.+images.intim?.(.{32})\.(jpg)/i;
            let now = /\[\[IMG:(.{32})\]\]/i;
            result = old.test(text) ? old.exec(text) : false;
            result = (!result && now.test(text)) ? now.exec(text) : result;
            if (result) {
                result = result[1];
            }
            return result;
        },
        image() {
            let server = this.$store.state.photoServer;
            let image = this.pathName(this.alias);
            return image ? `http://${server}/res/photo/preview/${image}.png` : false;
        },
        previous() {
            let p = prev;
            prev = this.item.from;
            return (!p || p == prev) ? true : false;
        }
    }
});


Vue.component('message-list', {
    props: ['humanId'],
    data() {
        return {
            messages: [],
            response: null,
            error: 0,
            next: 0,
            newCount: 0,
            batch: 15,
            received: 0,
            attention: false,
            uid: null,
            date: null,
            toSlow: false,
            skipScroll: false,
        }
    },
    mounted: function () {
        this.load();
    },
    methods: {
        reload() {
            this.next = 0;
            this.newCount = 0;
            this.messages = [];
            this.load();
            fdate = null;
            prev  = null;
            //TODO: переписать глобальную зависимость
        },
        load() {
            //console.log('load MessList data');
            this.response = 0;
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {id: this.humanId, next: this.next, hash}
            };
            axios.get('/ajax/messages_load.php', config).then((response) => {
                this.onLoad(response);
            }).catch((error) => {
                this.error = 10;
                console.log(error);
            });
            setTimeout(() => this.toSlow = true, 7000);
        },
        loadNext() {
            this.skipScroll = true;
            this.load();
        },
        onLoad(response) {
            let messages = response.data.messages;
            this.received = messages ? messages.length : 0;
            if (!messages && !this.messages.length) {
                this.noMessages();
            } else {
                if (this.received) {
                    this.messages = _.union(messages.reverse(), this.messages);
                }
                this.next += this.batch;
            }
            this.response = 200;
            this.toSlow = false;
            this.$nextTick(() => {
                //this.scroll();
            });
            //console.log(response);
        },
        scroll() {
            if (this.skipScroll) {
                return this.skipScroll = false;
            }
            var objDiv = document.getElementById("dialog-history");
            console.log('scroll', objDiv.scrollTop);
            objDiv.scrollTop = objDiv.scrollHeight+30;
            console.log('scroll', objDiv.scrollTop);
        },
        noMessages() {
            // TODO: Заменить на компоненты, страрые зависимости
            //quick_mess.ajax_load();
            //notice_post.show();
            store.commit('intimated', false);
        },
        setDate(date) {
            //this.date = new Date(this.item.date).getDayMonth();
        },
        remove(index) {
            console.log('remove('+index+')');
            this.messages.splice(index, 1);
        },
        admit() {
            console.log('itOk false');
            this.attention = false;
        },
        setNew() {
            console.log('new');
            this.newCount += 1;
        }
    },
    computed: {
        // items() {
        //     //let arr = this.messages.slice();
        //     return this.messages.slice().reverse();
        // },
        count() {
            return this.messages.length;
        },
        more() {
            if (this.received && this.received == this.batch) {
                return true;
            }
            return false;
        },
        uid: () => this.store.user.uid
    },
    template: '#message-list'
});

const ModalDialog = Vue.component('modal-dialog', {
    extends: ActivityActions,
    mounted() {
        // Close the modal when the escape key is pressed.
        var self = this;
        document.addEventListener('keydown', function() {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },
    template: '#modal-dialog',
});

Vue.component('modal-super', {
    template: '#modal-super',
});

///
// Модальное окно настроек OptionDialog - контейнер
///
Vue.component('option-dialog', {
    template: '#option-static__dialog-window',
    methods: {
        close() {
            this.$emit('close');
        }
    },
    created: function() {
        // Close the modal when the `escape` key is pressed.
        var self = this;
        document.addEventListener('keydown', function() {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },
    updated() {
        if (this.show) {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }
});

const PhotoViewer = Vue.component('photo-send', {
    props: ['photo', 'options'],
    data() {
        return {
            remove: false
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    },
    template: '#photo-send',
});


Vue.component('photo-view', {
    extends: ModalDialog,
    props: [
        'photo',
        'thumb',
        'maxWidth',
        'bypass'
    ],
    methods: {
        approve() {
            this.$store.commit('accepts/photo');
        },
        close() {
            this.back();
        }
    },
    computed: {
        accept() {
            return (this.$store.state.accepts.photo || this.bypass) ? true : false;
        }
    },
    template: '#photo-view'
});

Vue.directive('resized', {
  bind(el) {
    $(el).on('change', () => {
        el.style.height = '1px';
        el.style.height = (el.scrollHeight) + 'px';
    });
  },
  componentUpdated(el) {
      $(el).change();
  }
});


const QuickMessage = Vue.component('quick-message', {
    extends: ModalDialog,
    props: ['humanId'],
    data() {
        return {
            text: '',
            captcha: false,
            process: false,
            loading: false,
            confirm: false,
            ignore: false,
            code: null
        }
    },
    // beforeRouteLeave(to, from, next) {

    // },
    computed: {
        human() {
            return this.$store.state.search.human;
        },
        user() {
            return this.$store.state.user;
        },
        tags() {
            return ('tags' in this.human) ? this.human.tags : [];
        },
        hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        warning() {
            var result = '';
            var who = {1: 'парни', 2: 'девушки'};
            if (this.human.close && this.user.city && this.user.city != this.human.city) {
                result = 'Мне интересно общение только в моём городе';
            }
            if (this.human.who && this.human.who != this.user.sex) {
                result = 'Мне интересны только ' + who[this.human.who];
            } else
            if (this.human.who) {
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
    mounted() {
        this.reload();
    },
    methods: {
        reload() {
            this.loading = true;
            setTimeout(() => this.loading = false, 4 * 1000);
            store.dispatch('HUMAN', this.humanId).then((response) => {
                this.loaded();
            }).catch((error) => {
                console.log(error);
                this.loading = false;
            });
                console.log('reload*reload');
        },
        loaded() {
            this.loading = false;
            this.visited();
            //console.log('hold:', this.human.hold);
            //console.log('tags:', this.human);
            //this.process = false;
        },
        close() {
            this.back();
            //this.$emit('close');
        },
        remove() {
            console.log('::remove:: (!)');
            this.$emit('remove');
        },
        cancel() {
            this.captcha = false;
            this.confirm = false;
            this.ignore = true;
            console.log('cancel');
        },
        inProcess(sec) {
            this.process = true;
            setTimeout(() => this.process = false, sec*1000);
        },
        send() {
            let data = {
                id: this.humanId,
                mess: this.text,
                captcha_code: this.code
            };
            api.messages.send(data).then((response) => {
                this.onMessageSend(response.data);
            }).catch((error) => {
                this.onError(error);
            });
            //  this.sended();
            this.inProcess(5);
        },
        setCode(code) {
            this.code = code;
            this.send();
        },
        onMessageSend(response) {
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
        sended() {
            this.$emit('sended');
            this.close();
        },
        account() {
            this.$router.push(this.humanId + '/detail')
        },
        onError() {
            this.process = false;
        },
        visited() {
            this.$store.dispatch('visited/ADD', this.humanId);
        }
    },
    template: '#quick-message',
});



const QuickReply = Vue.component('quick-reply', {
    props: ['humanId', 'message', 'index'],
    extends: QuickMessage,
    methods: {
        sended() {
            this.$emit('sended', this.index);
            this.close();
        },
    },
    template: '#quick-reply',
});


Vue.component('quick-write', {
    // extends: QuickMessage,
    props: ['humanId'],
    data() {
        return {
            account: false,
            open: false,
            sended: false
        }
    },
    methods: {
        write() {
            this.$router.push('write/' + tid);
        },
    },
    template: '#quick-write',
});

Vue.component('remind-login', {
    data() {
        return {
            email: '',
            hint: 'Введите ваш емайл',
            confirm: false
        }
    },
    computed: {

    },
    methods: {
        close() {
            this.$emit('close');
        },
        send() {
            if (!this.email) {
                return;
            }
            this.hint = 'Отправляю...';
            api.user.post({email: this.email}, null, 'sync/remind').then((response) => {
                this.hint = response.data.say;
                this.error = response.data.err;
                this.sended();
            });
        },
        sended() {
            if (!this.error) {
                this.hint = 'Успешно. Подождите.';
                this.confirm = true;
            }
        },
    },
    template: '#remind-login'
});

var RemoveConfirm = Vue.component('remove-confirm', {
    props: ['show', 'item'],
    data() {
        return {
            content: {
                doit: {
                    caption: 'Наказывайте как следует',
                    text: `За резкие слова, за оскорбления или хамство,
                    за фотографии не в тему или бессмысленные сообщения, наказывайте всех, кого
                    считаете нужным. Наказание действует сразу.`,
                    action: 'Удалить и наказать'
                },
                must: {
                    caption: 'Может стоит наказать?',
                    text: `Нажмите "Дизлайк" у сообщения или контакта, которое вызвало негативные эмоции.
                    Наказание действует сразу же. Мы никогда не узнаем о нарушениях, если удалить без наказания.`,
                    action: 'Удалить и забыть'
                },
                some: {
                    caption: 'Удалить навсегда',
                    text: `Ваше сообщение будет удалено отовсюду, без возможности восстановить. Сообщение
                    пропадет как из вашей истории переписки, так и из переписки вашего собеседника.`,
                    action: 'Удалить навсегда'
                }
            }
        }
    },
    computed: {
        variant() {
            return this.show ? this.show : 'some';
        },
        caption() {
            return this.content[this.variant].caption;
        },
        text() {
            return this.content[this.variant].text;
        },
        action() {
            return this.content[this.variant].action;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        bun() {
            console.log('bun0');
            this.$emit('bun');
            this.close();
        },
        remove() {
            this.$emit('remove');
            this.close();
        },
    },
    template: '#remove-confirm',
});



Vue.component('remove-contact', {
    extends: RemoveConfirm,
    data() {
        return {
            content: {
                some: {
                    caption: 'Удалить навсегда',
                    text: `Контакт будет удален без возможности восстановить. Дальнейшее общение с собеседником станет невозможно.
                    Обменивайтесь реальными контактами с теми кто вам интересен всегда.`,
                    action: 'Удалить навсегда'
                }
            }
        }
    },
    methods: {
        remove() {
            this.$emit('remove');
            this.close();
        },
    },
    template: '#remove-confirm',
});

Vue.component('search-item', {
    props: ['human', 'visited', 'gold', 'compact'],
    data() {
        return {
            first:  null,
            second: null,
            third:  null,
            social: {
                first:  ['em','ok','vk','fb','go','sk','ph'],
                second: ['vk','ok','fb','go','sk','ph'],
                third:  ['sk','ph','em','ok','vk','fb','go'],
            },
        };
    },
    mounted() {
        _.find(_.pick(this.human, this.social.first), (value, key) => {
            return value ? (this.first = key) : false;
        });
        _.find(_.pick(this.human, this.social.second), (value, key) => {
            value = this.first == key ? false : value;
            return value ? (this.second = key) : false;
        });
        _.find(_.pick(this.human, this.social.second), (value, key) => {
            value = this.first == key ? false : value;
            value = this.second == key ? false : value;
            return value ? (this.third = key) : false;
        });
        // console.log('item',this.human);
    },
    computed: {
        search() {
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
        name() {
            let sex = this.human.sex == 1 ? 'Парень' : 'Девушка';
            return this.human.name ? this.human.name : sex;
        },
        tags() {
            return this.human.tags.length;
        },
        online() {
            return (this.human.last < 777) ? true : false;
        },
        differ() {
            result = false;
            let sex = this.$store.state.user.sex;
            if (sex && this.human.who && this.human.who != sex) {
                result = true;
            }
            return result;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        quick() {
            this.$router.push({
                name: 'quickWrite',
                params: {humanId: this.human.id}
            });
        },
        load() {
            api.search.load(null).then((response) => {
                this.users = response.data.users;
            });
        }
    },
    template: '#search-item',
});


Vue.component('search-list', {
    data() {
        return {
            loading: false,
            users: [],
            response: null,
            error: 0,
            next: null,
            newCount: 0,
            batch: 15,
            received: 0,
            attention: false,
            toSlow: false,
            humanId: null,
            account: null,
            sended: false,
            compact: true,
            ignore: false,
        };
    },
    mounted() {
        if (this.virgin && this.defaults) {
            this.compact = false;
            this.onLoad(this.defaults);
        } else {
            this.load();
        }
        this.visitedSync();
        this.$store.dispatch('desires/PICK');
    },
    computed: {
        more() {
            if (this.received && this.received == this.batch) {
                return true;
            }
            return false;
        },
        visited() {
            return this.$store.state.visited.list;
        },
        accept() {
            return !this.ignore && !this.$store.state.accepts.search && (this.next > this.batch);
        },
        defaults() {
            var result = defaultResults ? json.parse(defaultResults) : null;
            console.log(result)
            return (result && _.isObject(result) && _.has(result, 'users') && result.users.length) ? result : [];
        },
        items() {
            return this.users;
        },
        virgin() {
            return this.$store.getters.virgin;
        },
        desires() {
            return _.pluck(this.$store.state.desires.list, 'tag');
        },
        count() {
            return this.users.length;
        },
        loader() {
            return this.$store.state.ready && !this.count;
        },
    },
    methods: {
        reload() {
            this.next = 0;
            this.users = [];
            this.received = 0;
            this.compact = true;
            this.$store.commit('ready', false);
            this.load();
        },
        visitedSync() {
            this.$store.dispatch('visited/SYNC');
        },
        load() {
            this.response = 0;
            let {who, city, up, to, any} = this.$store.state.search.settings;
            let sex = this.$store.state.user.sex;
            let next = this.next;
            up = up ? up : 0;
            to = to ? to : 0;
            if (!city || any) {
                city = null;
                this.compact = false;
            }
            //this.onLoad(ls.get('last-search'));
            api.search.load({sex, who, city, up, to, next}).then((response) => {
                this.onLoad(response.data);
                //ls.set('last-search', response.data, 31*24*60*60);
            }).catch((error) => {
                this.response = 200;
                this.toSlow = false;
            });
        },
        loadNext() {
            //this.skipScroll = true;
            this.load();
        },
        onLoad(data) {
            let users = data.users;
            this.received = users ? users.length : 0;
            if (!users && !this.users.length) {
                this.noResult();
            } else {
                if (this.received) {
                    this.users = _.union(this.users, users);
                }
                this.next += this.batch;
            }
            this.$store.commit('ready', true);
            this.response = 200;
            this.toSlow = false;
        },
        openMessage(id) {
            this.humanId = id;
        },
        noResult() {

        },
        old(id) {
            return _.contains(this.visited, id);
        },
        gold(tags) {
            let result = _.intersection(this.desires, tags);
            return result.length ? true : false;
        },
        approve() {
            this.$store.commit('accepts/search');
        }
    },
    template: '#search-list',
});


Vue.component('search-wizard', {
    data() {
        return {

        };
    },
    store,
    computed: Vuex.mapState({
        range(state) {
            var settings = state.search.settings;
            var range = '';
            if (settings.up && settings.to) {
                range = settings.up + ' - ' + settings.to;
            } else
            if (settings.up && !settings.to) {
                range = ' от ' + settings.up;
            } else
            if (!settings.up && settings.to) {
                range = ' до ' + settings.to;
            }
            return range ? ' в возрасте ' + range + ' лет ' : '';
        },
        who(state) {
            var settings = state.search.settings;
            var who = ' знакомства с кем угодно ';
            if (settings.who) {
                who = settings.who == 1 ? ' знакомства с парнем ' : ' знакомства с девушкой ';
            }
            return who;
        },
        say(state) {
            var where = state.user.city ? '' : ', из любого города ';
            return this.who + this.range + where;
        },
        desires() {
            let count = this.$store.state.desires.list.length;
            return count ? count : 0;
        }
    }),
    mounted() {

    },
});

const AboutSettings = Vue.component('about-settings', {
    props: [],
    data() {
        return {
            inputGrowth: '',
            inputWeight: '',
            selectFigure: null,
            process: false,
            virgin: true
        }
    },
    computed: Vuex.mapState({
        growth(state) {
            return state.about.growth;
        },
        weight(state) {
            return state.about.weight;
        },
        figure(state) {
            return state.about.figure;
        }
    }),
    mounted() {
        this.$store.dispatch('about/SYNC').then(() => {
            this.init();
            this.process = false;
        }).catch(() => {
            this.process = false;
        });
        this.process = true;
        this.init();
    },
    methods: {
        init() {
            this.inputGrowth = this.growth ? this.growth : '';
            this.inputWeight = this.weight ? this.weight : '';
            this.selectFigure = this.figure;
        },
        deflower() {
            this.virgin = false;
        },
        close() {
            this.save();
            this.$emit('close');
        },
        save() {
            if (!this.virgin) {
                this.$store.dispatch('about/SAVE', {
                    growth: this.inputGrowth,
                    weight: this.inputWeight,
                    figure: this.selectFigure
                });
            }
        },
    },
    template: '#about-settings',
});


const AccountSettings = Vue.component('account-settings', {
    extends: ClosedActivity,
    props: ['root'],
    data() {
        return {
             selectCity: '',
             selectSex: 0,
             selectAge: 0,
             selectName: ''
        }
    },
    computed: Vuex.mapState({
        sex(state) {
            var sex = Number(state.user.sex);
            if (sex) {
                return (sex == 1) ? 1 : 2;
            }
            return 0;
        },
        city(state) {
            return state.user.city;
        },
        age(state) {
            return state.user.age;
        },
        name(state) {
            var variant = [];
            variant[1] = ['Саша','Дима','Сергей','Иван','Максим','Валера','Николай'];
            variant[2] = ['Оля','Юля','Настя','Алена','Катя','Маргарита','Татьяна'];
            let x = Math.floor( Math.random() * 7);
            let name = state.user.name;
            let auto = this.sex ? variant[this.sex][x] : '';
            return name ? name : auto;
        },
    }),
    created() {
        let {city, age} = defaultSettings; // GLOBAL
        this.selectCity = this.city ? this.city : city;
        this.selectAge = this.age ? this.age : age;
        this.selectSex = this.sex;
        this.selectName = this.name;
    },
    methods: {
        saveSex() {
            this.$store.dispatch('SAVE_SEX',  this.selectSex);
            this.resetName();
        },
        saveCity(city) {
            if (city) {
                this.selectCity = city;
            }
            if (this.selectCity != this.city) {
                this.$store.dispatch('SAVE_CITY', this.selectCity);
            }
        },
        saveAge() {
            if (this.selectAge != this.age) {
                this.$store.dispatch('SAVE_AGE',  this.selectAge);
            }
        },
        saveName() {
            this.$store.dispatch('SAVE_NAME', this.selectName);
        },
        resetName() {
            this.selectName = this.name;
        },
        save() {
            this.saveCity();
            this.saveAge();
            this.saveName();
        },
        close() {
            this.save();
            this.back();
        },
    },
    template: '#account-settings',
});


const DesiresSettings = Vue.component('desires-settings', {
    props: [],
    data() {
        return {
            process: false,
            desire: '',
            confirmRemove: null
        }
    },
    computed: Vuex.mapState({
        tags(state) {
            return state.desires.list;
        }
    }),
    mounted() {
        this.process = true;
        this.$store.dispatch('desires/SYNC').then((response) => {
            this.process = false;
        });
    },
    methods: {
        close() {
            this.$emit('close');
        },
        add(tag) {
            this.process = true;
            this.$store.dispatch('desires/ADD', tag).then((response) => {
                this.process = false;
            });
        },
        remove() {
            this.$store.dispatch('desires/DELETE', this.confirmRemove);
            this.confirmRemove = null;
        }
    },
    template: '#desires-settings',
});


const IncomingPhoto = Vue.component('incoming-photo', {
    extends: ClosedActivity,
    props: ['humanId'],
    data() {
        return {
            photos: [],
            user:   0,
            server: null,
            preview: null
        }
    },
    created: function () {
        this.server = this.$store.state.photoServer;
    },
    mounted() {
        this.loadPhoto();
    },
    computed: {
        uid() {
            return this.$store.state.user.uid;
        }
    },
    methods: {
        loadPhoto() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: { tid: this.humanId, hash }
            };
            axios.get(`http://${this.server}/api/v1/users/${this.uid}/sends`, config).then((response) => {
                this.photos = response.data.photos;
                //console.log(this.photos);
            }).catch((error) => {
                console.log(error);
            });
        },
        show(index) {
            let photo = this.photos[index];
            let links = photo._links;
            if (links.origin.href) {
                let data = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias:  photo.alias,
                    height: photo.height,
                    width:  photo.width,
                }
                this.preview = data;
            }
        },
        close() {
            this.back();
            //this.$emit('close');
        },
    },
    template: '#incoming-photo',
});


const LoginAccount = Vue.component('login-account', {
    props: [],
    data() {
        return {
            login: '',
            password: '',
            captcha: false,
            code: '',
            error: false,
            remind: false,
            hint: 'Введите данные',
        }
    },
    computed: Vuex.mapState({
        city(state) {
            return state.user.city;
        },
    }),
    mounted() {
    },
    methods: {
        close() {
            this.$emit('close');
        },
        send() {
            let data = {
                login: this.login,
                pass: this.password,
                captcha: this.code
            };
            api.user.post(data, null, 'sync/login').then((response) => {
                this.hint = response.data.say;
                this.error = response.data.err;
                this.captcha = response.data.captcha;
                this.onLogin();
            });
        },
        onLogin() {
            this.$refs.captcha.update();
            if (!this.error) {
                this.hint = 'Успешно. Подождите.';
                location.href = '/';
            }
        },
        setCode(code) {
            this.code = code;
        }
    },
    template: '#login-account',
});


const OtherSettings = Vue.component('other-settings', {
    props: [],
    data() {
        return {

        }
    },
    computed: Vuex.mapState({
        uid() {
            return this.$store.state.user.uid;
        }
    }),
    methods: {
        close() {
            this.$emit('close');
        },
        logout() {
            window.location = '/logout.php';
        }
    },
    template: '#other-settings',
});


const PhotoSettings = Vue.component('photo-settings', {
    extends: ClosedActivity,
    props: ['humanId'],
    data() {
        return {
            photos: [],
        }
    },
    computed: Vuex.mapState({

    }),
    mounted() {
        console.log('fileupload');
        var self = this;
        $('#fileupload').fileupload({
            dataType: 'json',
            add(e, data) {
                let server = self.$store.state.photoServer;
                let uid = self.$store.state.user.uid;
                data.url = `http://${server}/api/v1/users/${uid}/photos?jwt=` + self.$store.state.apiToken;
                data.submit();
            },
            done(e, data) {
                self.preview(data.result.photo);
            }
        });
        this.loadPhoto();
    },
    methods: {
        close() {
            this.back();
        },
        loadPhoto() {
            let server = this.$store.state.photoServer;
            let uid = this.$store.state.user.uid;
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {hash}
            };
            axios.get(`http://${server}/api/v1/users/${uid}/photos`, config).then((response) => {
                let result = response.data.photos;
                if (result && result.length) {
                    this.photos = response.data.photos;
                }
                console.log(this.photos);
            }).catch((error) => {
                console.log(error);
            });
        },
        upload(e) {
            $('#fileupload').click();
        },
        show: function (index) {
            this.preview(this.photos[index]);
        },
        preview(photo) {
            let links = photo._links;
            if (links.origin.href) {
                let data = {
                    photo: links.origin.href,
                    thumb: links.thumb.href,
                    alias:  photo.alias,
                    height: photo.height,
                    width:  photo.width,
                }
                //this.$router.push({ name: 'preview', params: {humanId: this.humanId, photo: data, options: true} });
                this.$emit('select', data);
                this.close();
                //this.$store.commit('sendPhoto', data);
                //console.log('sendPhoto');
                //console.log(data);
            } else {
                this.close();
            }
        }
    },
    template: '#photo-settings',
});


const SearchSettings = Vue.component('search-settings', {
    extends: ClosedActivity,
    props: ['root'],
    data() {
        return {
             ageRange: [0,16,17,18,20,23,25,27,30,35,40,45,50,60,80],
             selectWho: 0,
             selectUp: 0,
             selectTo: 0,
             selectCity: '',
             checkedTown: 0,
             checkedVirt: 0,
             checkedAnyCity: 0,
        }
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
        who(state) {
            var who = Number(state.search.settings.who);
            if (who) {
                return (who == 1) ? 1 : 2;
            }
            return 0;
        },
        city(state) {
            let {city} = defaultSettings; // GLOBAL
            return state.user.city ? state.user.city : city; // [~!!!~] READ_ONLY
        },
        up(state) {
            return this.age(state.search.settings.up);
        },
        to(state) {
            return this.age(state.search.settings.to);
        },
        town(state) {
            return state.search.settings.town == true;
        },
        virt(state) {
            return state.search.settings.virt == true;
        },
        any(state) {
            return state.search.settings.any == true;
        },
        virgin(state) {
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
            return (
                this.selectCity == this.city &&
                this.selectWho == this.who &&
                this.selectUp == this.up &&
                this.selectTo == this.to &&
                this.checkedTown == this.town &&
                this.checkedVirt == this.virt &&
                this.checkedAnyCity == this.any
            );
        }
    }),
    created() {
        let {city, who, up, to} = defaultSettings; // GLOBAL
        this.selectCity = this.city ? this.city : city;
        this.selectWho = this.who ? this.who : who;
        this.selectUp = this.up ? this.up : this.age(up);
        this.selectTo = this.to ? this.to : this.age(to);
        this.checkedTown = this.town;
        this.checkedVirt = this.virt;
        this.checkedAnyCity = this.any;
    },
    methods: {
        age(value) {
            value = Number(value);
            if (!value) { return 0; }
            var min = _.min(this.ageRange);
            var max = _.max(this.ageRange);
            if (value <= min) { return min; }
            if (value >= max) { return max; }
            return _.find(this.ageRange, (item, index, list) => {
                if (index && index < list.length) {
                    if (value > list[index-1] && value < list[index+1]) {
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
        save() {
            var data = {
                who:  this.selectWho,
                city: this.city,
                up:   this.selectUp,
                to:   this.selectTo,
                town: this.checkedTown,
                virt: this.checkedVirt,
                any: this.checkedAnyCity,
            };
            console.log(data);
            if (!this.virgin) {
                this.$store.dispatch('SAVE_SEARCH', data);
            }
        },
        // account() {
        //     if (this.root) {
        //         this.$router.push({ name: 'account-settings', params: {root: true} })
        //     } else {
        //         this.$router.push({ name: 'account-settings'})
        //     }
        // },
        close() {
            this.save();
            this.$root.reload();
            this.back();
        },
    },
    template: '#search-settings',
});


const SecuritySettings = Vue.component('security-settings', {
    props: [],
    data() {
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
        }
    },
    computed: Vuex.mapState({
        login(state) {
            return state.auth.login;
        },
        passwd(state) {
            return state.auth.pass;
        },
        email(state) {
            return state.auth.email;
        },
        promt(state) {
            return state.auth.promt;
        },
        subscr(state) {
            return state.auth.subscr;
        },
    }),
    mounted() {
        this.$store.dispatch('auth/SYNC').then(() => {
            this.init();
            this.process = false;
        }).catch(() => {
            this.process = false;
        });
        this.process = true;
        this.init();
    },
    methods: {
        init() {
            this.inputLogin = this.login;
            this.inputPasswd = this.passwd;
            this.inputEmail = this.email;
            this.checkSubscribe = this.subscr;
        },
        deflower() {
            this.virgin = false;
        },
        saveLogin() {
            this.processLogin = true;
            this.$store.dispatch('auth/SAVE_LOGIN', this.inputLogin).then((response) => {
                var data = response.data;
                if (data.err) {
                    this.$emit('warning', data.say);
                }
                this.processLogin = false;
            }).catch(() => {
                this.processLogin = false;
            });
        },
        savePasswd() {
            this.processPasswd = true;
            this.$store.dispatch('auth/SAVE_PASSWD', this.inputPasswd).then((response) => {
                var data = response.data;
                if (data.err) {
                    this.$emit('warning', data.say);
                }
                this.processPasswd = false;
            }).catch(() => {
                this.processPasswd = false;
            });
        },
        saveEmail() {
            this.processEmail = true;
            this.$store.dispatch('auth/SAVE_EMAIL', this.inputEmail).then((response) => {
                var data = response.data;
                if (data.err) {
                    this.$emit('warning', data.say);
                }
                this.processEmail = false;
            }).catch(() => {
                this.processEmail = false;
            });
        },
        removeEmail() {
            this.confirmRemove = false;
            this.processEmail = true;
            console.log('REMOVE_EMAIL');
            this.$store.dispatch('auth/REMOVE_EMAIL').then((response) => {
                var data = response.data;
                if (data.err) {
                    this.$emit('warning', data.say);
                }
                this.processEmail = false;
            }).catch(() => {
                this.processEmail = false;
            });
        },
        saveSubscribe() {
            this.$store.dispatch('auth/SAVE_SUSCRIBE');
        },
        close() {
            if (!this.processLogin && !this.processPasswd && !this.processEmail) {
                this.$emit('close');
            } else {
                this.$emit('alert', 'Подождите, сохраняю.');
            }
        },
    },
    template: '#security-settings',
});


const SocialSettings = Vue.component('social-settings', {
    props: [],
    data() {
        return {
            checkedContact: {
                em: 0,
                vk: 0,
                ok: 0,
                fb: 0,
                go: 0,
                sk: 0,
                ph: 0,
            },
            virgin: true
        }
    },
    computed: Vuex.mapState({
        contacts(state) {
            return state.user.contacts;
        }
    }),
    mounted() {
        console.log('user', this.contacts);
        this.checkedContact = this.contacts;
    },
    methods: {
        close() {
            this.save();
            this.$emit('close');
        },
        deflower() {
            this.virgin = false;
        },
        save() {
            if (!this.virgin) {
                this.$store.dispatch('SAVE_CONTACTS', this.checkedContact);
            }
        }
    },
    template: '#social-settings',
});

const SexConfirm = Vue.component('sex-confirm', {
    extends: ModalDialog,
    props: ['show'],
    computed: {
        variant() {
            return this.show ? this.show : 'message';
        },
        caption() {
            return this.content[this.variant].caption;
        },
        text() {
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
        close() {
            this.back();
        },
        index(val) {
            return val == this.variant;
        },
        save(sex) {
            this.$store.dispatch('SAVE_SEX', sex);
            this.$emit('select', this.show);
            this.redirect();
        },
        login() {
            this.$emit('login');
            this.$emit('close');
        },
        redirect() {
            if (this.index('search')) {
                this.$router.replace('/search');
            }
            // if (this.index('contacts')) {
            //     console.log('leave', 'contacts');
            //     next({name: 'search-settings'});
            // }
            if (this.index('account')) {
                this.$router.replace('/settings/account');
            }
            if (this.index('message')) {
                this.$router.replace('/');
            }
        }
    },
    data() {
        return {
            content: {
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
            }
        }
    },
    template: '#sex-confirm'
});

Vue.component('simple-captcha', {
    props: [],
    data() {
        return {
            code: '',
            inc: 0
        }
    },
    computed: {
        src() {
            return '/capcha_pic.php?inc=' + this.inc;
        }
    },
    mounted() {

    },
    methods: {
        close() {
            this.$emit('close');
        },
        update() {
            this.inc++;
        },
        input() {
            this.$emit('input', this.code);
        },
    },
    template: '#simple-captcha',
});


Vue.component('slider-vertical', {
    data() {
        return {
            slide: 1
        }
    }
});
Vue.component('snackbar', {
    props: ['callback', 'action', 'play'],
    computed: {
        time() {
            return this.callback ? 5000 : 3000;
        },
        title() {
            return this.action ? this.action : 'Ok';
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        approve() {
            this.callback();
        },
        autoplay(event) {
            if (this.play) {
                this.$refs.autoplay.play();
            }
        }
    },
    mounted() {
        _.delay(this.close, this.time);
        this.autoplay();
    },
    template: '#snackbar',
});

Vue.component('suggest-input', {
    props: ['url', 'disabled'],
    data() {
        return {
            query: '',
            items: [],
            enable: true
        };
    },
    computed: {
        suggested() {
            return this.items.length;
        }
    },
    methods: {
        load() {
            api.user.get({q: this.query}, 'tag/suggest').then((response) => {
                this.loaded(response.data);
            });
        },
        reset() {
            this.query = '';
            this.items = [];
        },
        select(item) {
            this.query = item;
            this.$emit('select', item);
            this.reset();
        },
        loaded(data) {
            if (data && data.length) {
                this.items = data;
                console.log('loaded', data)
            } else {
                this.reset();
            }
        },
    },
    template: '#suggest-input',
});

Vue.component('toast', {
    methods: {
        close() {
            this.$emit('close');
        },
    },
    mounted() {
        _.delay(this.close, 2000);
    },
    template: '#toast',
});


Vue.component('upload-dialog', {
    template: '#upload-dialog',
    data() {
        return {
            photos: [],
            server: null,
        }
    },
    created: function () {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        show: function (index) {
            this.preview(this.photos[index]);
        },
        preview(photo) {
            let links = photo._links;
            if (links.origin.href) {
                let data = {
                    photo: links.origin.href,
                    thumb: links.thumb.href,
                    alias:  photo.alias,
                    height: photo.height,
                    width:  photo.width,
                }
                this.$store.commit('sendPhoto', data);
                //console.log('sendPhoto');
                //console.log(data);
            }
            this.close();
        }
    }
})




Vue.component('photo-dialog', {
    methods: {
        close() {
            this.$emit('close');
            store.commit('viewPhoto', { photo: null });
        }
    },
    computed: Vuex.mapState({
        config: state => state.photoView
    }),
    template: '#photo-dialog'
})


// -- Хранилище ---
var storage = {
    enable:  0,
    init() {
        if (storage.is_enable()) {
            storage.enable = 1;
        }
    },
    is_enable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        }
        catch(e) {
            return false;
        }
    },
    save(key,val) {
        if (storage.enable) {
            localStorage.setItem(key,val);
        }
    },
    load(key,def) {
        var result = def ? def : null;
        if (storage.enable && localStorage.getItem(key)) {
            result = localStorage.getItem(key);
        }
        return result;
    },
    set(key,val) {
        storage.save(key,val);
    },
    get(key,def) {
        storage.load(key,def);
    },
    array: {
        load(key) {
            var result = [];
            var value = null;
            value = storage.load(key);
            value = json.parse(value);
            if (value)
                result = value;
            return result;
        } ,
        save(key,val) {
            storage.save(key,json.encode(val));
        } ,
        add(key,val) {

        }
    }
}
storage.init();


const about = {
    namespaced: true,
    state: {
        growth: 0,
        weight: 0,
        figure: 0
    },
    actions: {
        SYNC({rootState, commit, getters}) {
            return api.user.syncAbout().then((response) => {
                commit('update', response.data);
            });
        },
        SAVE({state, commit}, data) {
            api.user.saveAbout({anketa: data}).then((response) => {
                commit('update', data);
            });
        }
    },
    mutations: {
        update(state, data) {
            if (data) {
                _.assign(state, data);
            }
        },
    }
};


const accepts = {
    namespaced: true,
    state: {
        photo: false,
        search: false,
    },
    actions: {
        LOAD({state}) {
            let data = ls.get('accepts');
            if (data) {
                _.assign(state, data);
            }
        },
    },
    mutations: {
        photo(state) {
            state.photo = true;
            ls.set('accepts', state);
        },
        search(state) {
            state.search = true;
            ls.set('accepts', state);
        },
    }
};


const auth = {
    namespaced: true,
    state: {
        iss: '',
        exp: '',
        iat: '',
        sid: '',
        uid: '',
        auth: '',
        ip:  '',
            login: '',
            pass:  '',
            email: '',
            promt: '',
            subscr: false,
        last:  '',
        error: ''
    },
    actions: {
        SYNC({commit}) {
            return api.user.syncAuth().then((response) => {
                commit('update', response.data);
            });
        },
        SAVE_LOGIN({commit}, data) {
            return api.user.saveLogin(data);
        },
        SAVE_PASSWD({commit}, data) {
            return api.user.savePasswd(data);
        },
        SAVE_EMAIL({commit}, data) {
            return api.user.saveEmail(data);
        },
        REMOVE_EMAIL({commit}) {
            return api.user.removeEmail();
        },
        SAVE_SUSCRIBE({store, commit}, data) {
            commit('subscr');
            return api.user.saveSubscribe();
        }
    },
    mutations: {
        update(state, data) {
            if (data) {
                _.assign(state, data);
            }
        },
        subscr(state) {
            state.subscr = state.subscr ? false : true;
        }
    }
};


const mutations = {
    load(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = data;
        }
    },
    add(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = _.union(state.list, data);
        }
    },
    status(state, status) {
        state.status = status;
    },
    notifi(state, status) {
        state.notified = status == true;
    }
}
// // //

const initial = _.extend({
    namespaced: true,
    state: {
        status: 8,
        notified: false,
        list: []
    },
    actions: {
        LOAD({ state, commit, rootState }) {
            commit('load', ls.get('initial-contacts'));
            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then((response) => {
                commit('load', response.data);
                ls.set('initial-contacts', state.list);
            });
        },
        NEXT({ state, commit, rootState }, offset) {
            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset
            }).then((response) => {
                commit('add', response.data);
            });
        },
        DELETE({ state, commit, rootState }, index) {
            let result = api.contacts.initial.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ({ state, commit, rootState }, index) {
            let result = api.contacts.initial.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        },
        CHECK({commit}) {
            axios.get('/mailer/check_contact').then(() => {
                commit('status', 8);
                commit('notifi', false);
            });
        }
    },
    mutations: _.extend({
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('initial-contacts', state.list);
        },
        read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('initial-contacts', state.list);
        }
    }, mutations)
});

const intimate = _.extend({
    namespaced: true,
    state: {
        status: 8,
        notified: false,
        list: []
    },
    actions: {
        LOAD({ state, commit, rootState }) {
            commit('load', ls.get('intimate-contacts'));
            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then((response) => {
                commit('load', response.data);
                ls.set('intimate-contacts', state.list);
            });
        },
        NEXT({ state, commit, rootState }, offset) {
            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset
            }).then((response) => {
                commit('add', response.data);
            });
        },
        DELETE({ state, commit, rootState }, index) {
            let result = api.contacts.intimate.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ({ state, commit, rootState }, index) {
            let result = api.contacts.intimate.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        },
        CHECK({commit}) {
            axios.get('/mailer/check_message').then(() => {
                commit('status', 8);
                commit('notifi', false);
            });
        }
    },
    mutations: _.extend({
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('intimate-contacts', state.list);
        },
        read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('intimate-contacts', state.list);
        }
    }, mutations)
});

const sends = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD({ state, commit, rootState }) {
            commit('load', ls.get('sends-contacts'));
            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then((response) => {
                commit('load', response.data);
                ls.set('sends-contacts', state.list);
            });
        },
        NEXT({ state, commit, rootState }, offset) {
            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset
            }).then((response) => {
                commit('add', response.data);
            });
        },
        DELETE({ state, commit, rootState }, index) {
            let result = api.contacts.sends.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
    },
    mutations: _.extend({
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('sends-contacts', state.list);
        }
    }, mutations)
});


const contacts = {
    modules: {
        initial,
        intimate,
        sends
    }
}


const credits = {
    state: {
        count: 0,
        info: ''
    },
    actions: {

    },
    mutations: {

    }
};


const desires = {
    namespaced: true,
    state: {
        list: [],
    },
    actions: {
        PICK({commit}) {
            commit('update', ls.get('desires'));
        },
        SYNC({state, commit}) {
            commit('update', ls.get('desires'));
            return api.user.desireList().then((response) => {
                commit('update', response.data);
                ls.set('desires', state.list);
            });
        },
        ADD({state, commit}, tag) {
            //commit('add', tag);
            return api.user.desireAdd(tag).then((response) => {
                let id = response.data.id;
                commit('add', {id, tag});
            });
        },
        DELETE({state, commit}, index) {
            let result = api.user.desireDelete(state.list[index].id);
            commit('delete', index);
            return result;
        }
    },
    mutations: {
        update(state, data) {
            if (data && data.length) {
                state.list = data.slice();
            }
        },
        add(state, data) {
            state.list.unshift(data);
            ls.set('desires', state.list);
        },
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('desires', state.list);
        },
    }
};

const modals = {
    state: {
        initial: false,
        intimate: false,
        sends: false,
    },
    mutations: {
        showInitial(state, data) {
            store.commit('closeAll');
            state.initial = data == true;
        },
        showIntimate(state, data) {
            store.commit('closeAll');
            state.intimate = data == true;
        },
        showSends(state, data) {
            store.commit('closeAll');
            state.sends = data == true;
        },
        closeAll(state) {
            state.initial  = false;
            state.intimate = false;
            state.sends    = false;
        }
    }
}

const moderator = {
    state: {
        promt: 0,
        rank:  0,
        resident: 0,
        action: 0,
        effect: 0,
        bunn: 0,
        rang: ''
    },
    actions: {

    },
    mutations: {

    }
};


var search = {
    state: {
        list: [],
        url: '',
        human: {
            name: '',
            age: 0,
            city: '',
        },
        settings: {
            who: 0,
            city: '',
            up: null,
            to: null,
            town: false,
            virt: false,
            any: false,
        }
    },
    actions: {
        HUMAN({ commit }, tid) {
            let index = 'human.data.'+tid;
            commit('resetHuman', tid);
            commit('setHuman', ls.get(index));
            return api.search.get({tid}).then((response) => {
                commit('setHuman', response.data);
                ls.set(index, response.data, 1500);
            });
        },
        SETTINGS({ commit }) {
            commit('settingsCookies');
            commit('settings', ls.get('search.settings'));
            //let index = 'search.settings';
        },
        SAVE_SEARCH({state, commit}, data) {
                commit('settings', data);
                ls.set('search.settings', data);
                return api.user.saveSearch(data).then((response) => { });
        },
    },
    mutations: {
        // Сбросить предыдущие данные, если там что-то не то
        resetHuman(state, tid) {
            if (state.human && state.human.id != tid) {
                state.human = {};
            }
        },
        setHuman(state, data) {
            if (data) {
                state.human = data;
            }
        },
        settings(state, data) {
            if (data) {
                //console.log('settings:', data);
                _.assign(state.settings, data);
            }
        },
        settingsCookies(state) {
            var data = get_cookie('mail_sett');
            if (data) {
                try {
                  data = JSON.parse(data);
                }
                catch(e) { }
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
        searchURL(state, getters, rootState) {
            let settings = state.settings;
            let result = '/index.php?view=simple&town=' + rootState.user.city +
                '&years_up=' + settings.up + '&years_to=' + settings.to +
                '&who=' + settings.who +'';
            return result;
        },
        virgin(state, getters, rootState) {
            let {who, up, to} = state.settings;
            return (!who && !rootState.user.city && !up && !to);
        }
    }
};

const user = {
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
            ph: 0,
        },
        tags: {
            str: ''
        },
        status: 0,
        promt: null,
        last: ''
    },
    actions: {
        LOAD_USER({ commit }) {
            // if (uid) {
            //     commit('loadUser', {uid});
            // }
            commit('loadUser', ls.get('user.data'));
        },
        SAVE_SEX({ state, commit }, sex) {
            commit('loadUser', { sex, name: '' });
            if (sex) {
                api.user.saveSex(sex).then((response) => { });
                commit('loadUser', { sex });
            }
        },
        SAVE_AGE({ state, commit }, age) {
            if (age && state.age != age) {
                api.user.saveAge(age).then((response) => { });
                commit('loadUser', {age});
            }
        },
        SAVE_NAME({ state, commit }, name) {
            if (name && state.name != name) {
                api.user.saveName(name).then((response) => { });
                commit('loadUser', {name});
            }
        },
        SAVE_CITY({ state, commit }, city) {
            if (city && state.city != city) {
                api.user.saveCity(city).then((response) => { });
                commit('loadUser', {city});
            }
        },
        SAVE_CONTACTS({ state, commit }, contacts) {
            api.user.saveContacts(contacts).then((response) => { });
            commit('loadUser', {contacts});
        },
    },
    mutations: {
        loadUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', state, 23456);
        },
        resetUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', data, 23456);
        },
    }
}


const visited = {
    namespaced: true,
    state: {
        list: [],
    },
    actions: {
        SYNC({rootState, state, commit}) {
            let index = 'visited-' + rootState.user.uid;
            commit('update', ls.get(index));
            return api.user.visitedList().then((response) => {
                let {data} = response;
                commit('update', data);
                ls.set(index, state.list, 31*24*60*60);
            });
        },
        ADD({rootState, state, commit}, tid) {
            let uid = rootState.user.uid;
            let index = 'visited-' + uid;
            commit('add', tid);
            ls.set(index, state.list, 31*24*60*60);
            return api.user.visitedAdd(uid, tid).then((response) => {

            });
        }
    },
    mutations: {
        update(state, data) {
            if (data && data.length) {
                state.list = _.union(state.list, data);
            }
        },
        add(state, data) {
            state.list.unshift(data);
        },
    }
};


moment.locale('ru');

var ls = lscache;

const store = new Vuex.Store({
    modules: {
        user,
        auth,
        about,
        search,
        contacts,
        desires,
        visited,
        accepts,
        modals
    },
    state: {
        ready: false,
        apiToken: '',
        photoServer: '@@API-PHOTO',
        simple: false
    },
    actions: {
        LOAD_API_TOKEN({ commit }) {
            commit('setApiToken', { apiToken: get_cookie('jwt') });
        },
    },
    mutations: {
        setApiToken (state, data) {
            if (data) {
                _.assign(state, data);
            }
            //console.log(state)
        },
        simple(state, data) {
            state.simple = (data == true);
        },
        ready(state, data) {
            state.ready = (data == true);
        },
    },
    getters: {
        accept() {

        }
    }
});

store.dispatch('LOAD_API_TOKEN');
store.dispatch('accepts/LOAD');
store.dispatch('LOAD_USER');
store.dispatch('SETTINGS');


class Api {
    constructor(host, key, version, routing) {
        // Delay requests sec
        this.setDelay('@@NET-DELAY');
        // [!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
        this.setRoot(host, version);
        this.setConfig(this.root, key);
        this.setRouting(routing);
    }

    setDelay(sec) {
        this.wait = sec * 1000; //
    }
    setRouting(routing) {
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
    setRoot(host, version) {
        let ver = version ? 'v' + version + '/' : '';
        this.root = host + ver;
    }

    setConfig(url, key) {
        this.config = {
            baseURL: url,
            headers: {
                'Authorization': 'Bearer ' + key
            }
        };
    }

    setBaseURL(url) {
        _.extend(this.config, {
            baseURL: url
        });
    }

    setAuthKey(key) {
        _.extend(this.config.headers, {
            'Authorization': 'Bearer ' + key
        });
        this.key = key;
    }

    setParams(params, url) {
        let result = url.replace(/\{(.*?)\}/ig, (match, token) => {
            let slug = params[token];
            delete params[token];
            return slug;
        });
        //console.log('url: ', [this.root, result, params]);
        this.config.params = params ? params : {};
        return result;
    }
    setUrl(method, params, url) {
        this.refresh();
        let route = this.routing.route;
        if (url) {
            result = url;
        } else {
            let action = this.routing[method];
            result = route ? route : '';
            if (result && action) {
                result = result + '/' + action;
            } else if(action) {
                result = action;
            }
        }
        result = this.setParams(params, result);
        return this.root + result;
    }

    get(params, url) {
        return this.delay(axios.get(this.setUrl('get', params, url), this.config), 0);
    }
    load(params, url) {
        return this.delay(axios.get(this.setUrl('load', params, url), this.config), 0);
    }
    cget(params, url) {
        return this.delay(axios.get(this.setUrl('cget', params, url), this.config), 0);
    }
    send(params, url) {
        return this.delay(axios.get(this.setUrl('send', params, url), this.config), 0);
    }
    post(data, params, url) {
        return this.delay(axios.post(this.setUrl('post', params, url), data, this.config), 0);
    }
    save(data, params, url) {
        return this.delay(axios.post(this.setUrl('save', params, url), data, this.config), 0);
    }
    remove(data, params, url) {
        return this.delay(axios.post(this.setUrl('remove', params, url), data, this.config), 0);
    }
    delete(params, url) {
        return this.delay(axios.delete(this.setUrl('delete', params, url), this.config), 0);
    }
    put(data, params, url) {
        return this.delay(axios.put(this.setUrl('put', params, url), data, this.config), 0);
    }
    patch(data, params, url) {
        return this.delay(axios.patch(this.setUrl('patch', params, url), data, this.config), 0);
    }
    request(method, action, data, params, url) {
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
    option() {}

    delay(result, wait) {
        let msec = wait ? wait : this.wait;
        if (msec < this.wait) {
            msec = this.wait;
        }
        if(msec == 0 || typeof Promise == "undefined") {
            return result;
        }
        return new Promise((resolve, reject) => {
            _.delay(resolve, msec, result);
        });
    }

    refresh() {
        store.dispatch('LOAD_API_TOKEN');
    }
}

class ApiBun extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
    send(data) {

        return axios.post('mess/bun/', data, this.config);
        console.log('ApiBun Bun-Bun');
    }
}


class ApiMessages extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
    send(data) {
        return this.post(data, null, 'mailer/post/');
    }
}

class ApiUser extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key, null, null);
    }
    saveSex(sex) {
        return this.save({sex}, null, 'option/sex');
    }
    saveAge(age) {
        return super.save({age}, null, 'option/age');
    }
    saveName(name) {
        return super.save({name}, null, 'option/name');
    }
    saveCity(city) {
        return super.save({city}, null, 'option/city');
    }
    saveContacts(data) {
        return super.save({contact: data}, null, 'option/contact');
    }

    saveSearch(data) {
        data = {
            search_sex: data.who,
            years_up: data.up,
            years_to: data.to,
            option_mess_town: data.town,
            option_virt_accept: data.virt,
        };
        return super.save(data, null, 'msett/save');
    }

    syncAbout() {
        return super.load(null, 'sync/anketa');
    }
    saveAbout(data) {
        return super.save(data, null, 'option/anketa');
    }

    syncAuth() {
        return super.load(null, 'sync/authdata');
    }
    saveLogin(login) {
        return super.save({login}, null, 'option/login');
    }
    savePasswd(pass) {
        return super.save({pass}, null, 'option/passwd');
    }
    saveEmail(email) {
        return super.save({email}, null, 'option/email');
    }
    removeEmail() {
        return super.remove(null, null, 'option/demail');
    }
    saveSubscribe() {
        return super.save(null, null, 'option/subscr');
    }


    desireList() {
        return super.load(null, 'tag/user');
    }
    desireAdd(tag) {
        return super.save({tag}, null, 'tag/add');
    }
    desireDelete(id) {
        return super.remove({id}, null, 'tag/del');
    }

    visitedList() {
        return super.load(null, 'contact/visited');
    }
    visitedAdd(uid, tid) {
        return super.send({tid,uid}, 'contact/addvisit/{uid}');
    }

}

class ApiSearch extends Api {
    constructor() {
        let key = '1234';
        let host = 'http://@@API-SEARCH/';
        let routing = {
            route: 'users',
            get: '{tid}',
        };
        super(host, key, null, routing);
    }
}




class ApiContact extends Api {
    constructor(routing) {
        let key = store.state.apiToken;
        let host = 'http://@@API-CONTACT/';
        super(host, key, null, routing);
    }

    refresh() {
        store.dispatch('LOAD_API_TOKEN');
        this.setAuthKey(store.state.apiToken);
    }
}

class ApiInitial extends ApiContact {
    constructor() {
        let routing = {
            route:  'users/{uid}/initials',
        };
        super(routing);
    }
}

class ApiIntimate extends ApiContact {
    constructor() {
        let routing = {
            route: 'users/{uid}/intimates',
        };
        super(routing);
    }
}

class ApiSends extends ApiContact {
    constructor() {
        let routing = {
            route: 'users/{uid}/sends',
        };
        super(routing);
    }
}



var api = {
    user: new ApiUser(),
    search: new ApiSearch(),
    bun: new ApiBun(),
    contacts: {
        initial: new ApiInitial(),
        intimate: new ApiIntimate(),
        sends: new ApiSends(),
    },
    messages: new ApiMessages(),
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

var routes = [
    { path: '/write/:humanId(\\d+)/(.*)?', name: 'quickWrite', component: QuickMessage, props: true,
            beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/message')
    },
    // { path: '/', name: 'search', component: SearchActivity,
    //     beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search'),
    //     children: [
    //         { path: ':humanId(\\d+)/(.*)?', name: 'quickMessage', meta: {back: '/search'}, component: QuickMessage, props: true },
    //     ]
    // },
    { path: '/initial/(.*)?', name: 'initial', component: InitialDialog, props: true,
        //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
        children: [
            { path: ':humanId(\\d+)/(.*)?', name: 'quickReply', meta: {back: '/initial'}, component: QuickReply, props: true },
        ]
    },
    { path: '/intimate/(.*)?', name: 'intimate', component: IntimateDialog, props: true,
        //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
        children: [
            { path: ':humanId(\\d+)/(.*)?', name: 'dialog', meta: {back: '/intimate'}, component: MessagesActivity, props: true,
                children: [
                    { path: 'uploads', name: 'uploads', meta: {back: '.'}, component: PhotoSettings, props: true },
                    { path: 'incoming', name: 'incoming', meta: {back: '.'}, component: IncomingPhoto, props: true },
                    // { path: 'preview', name: 'preview', component: PhotoViewer, props: true },
                ]
            },
        ]
    },
    { path: '/confirm-sex/:show?', component: SexConfirm, props: true },

    { path: '(.*)?/settings/search', meta: {back: '/'}, component: SearchSettings,
        beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search')
    },
    { path: '(.*)?/settings/account', component: AccountSettings,
        beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/account')
    },
    { path: '(.*)?/settings/other', component: OtherSettings },
    { path: '(.*)?/settings/about', meta: {back: 'other'}, component: AboutSettings },
    { path: '(.*)?/settings/social', meta: {back: 'other'}, component: SocialSettings },
    { path: '(.*)?/settings/desires', meta: {back: 'other'}, component: DesiresSettings ,
            beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search')
    },
    { path: '(.*)?/settings/security', meta: {back: 'other'}, component: SecuritySettings },

];

var router = new VueRouter({
  //mode: 'history',
  routes
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
    routes: [
        { path: '/search/settings/account', meta: {back: 'search'}, component: AccountSettings },

        { path: '(.*)?/:humanId(\\d+)/detail', component: AccountActivity, props: true },
        // { path: '(.*)?/uploads', component: PhotoSettings },
        // { path: '(.*)?/preview', name: 'preview', component: PhotoViewer, props: true },

        { path: '/login', name: 'login', component: LoginAccount },
    ]
});

settingsRouter.beforeEach((to, from, next) => {
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
        },
    },
    mounted() {

    },
    computed: {
        humanId() {
            return Number(this.$route.path.substr(1));
        },
        simple() {
            return this.$store.state.simple;
        },
        ready() {
            return this.$store.state.ready;
        },
        promt() {
            let {promt} = this.$store.state.user;
            return !promt || promt == 'no';
        }
    },
    methods: {
        showSnackbar(text, callback, action, play) {
            console.log('snackbar', text);
            this.snackbar.text = text;
            this.snackbar.callback = callback;
            this.snackbar.action = action;
            this.snackbar.play = (play == true);
        },
        toast(text) {
            this.alert = text;
        },
        reload() {
            this.$refs.results.reload();
        }
    },
    el: '#app',
    store,
    router
});


new Vue({
    data: {
        warning: '',
        alert: '',
    },
    methods: {
        snackbar(text) {
            this.warning = text;
        },
        toast(text) {

            this.alert = text;
        },
    },
    el: '#settings',
    store,
    router: settingsRouter
});








$(document).ready(function()
{
    //userinfo.init();
    slider.init();
    //giper_chat.init();
    notepad.init();

    mailsett.init();
    report.init();
    navigate.init();

    name_suggest.init();
    city_suggest.init();

    option_static.init();
    option_sex.init();
    //option_email.init();
    profile_alert.init();
    profile_option.init();

    //user_tag.init();
    //desire_clip.init();

    //result_list.init();
    //visited.init();

});



// -- Получить новый хэш ---
var hash; 
function simple_hash() { 
  var now = new Date(); 
   hash = now.getTime();  
}


   
// -- Автогенератор информации ---        
var auto_gen = {    
    
    name: function (sex) 
    {      
        var name = []                              
        name[0] = ['Онилиона','Безимени','Неуказано','Хуисзиз','Незнаю','Неизвестно','Несонено'];
        name[1] = ['Саша','Дима','Сергей','Иван','Максим','Валера','Николай'];          
        name[2] = ['Оля','Юля','Настя','Алена','Катя','Маргарита','Татьяна'];  
        
        var x = Math.floor( Math.random() * 7);

        return name[sex][x];     
    } ,
    
    age: function (year) 
    {                                    
        var age = []                  
        age[0] = [18,21,24,25,27,28,31];
        age[1] = [year+3,year+2,year+1,year,year-1,year-2,year-3];
 
        var y = year ? 1 : 0;
        var x = Math.floor( Math.random() * 7);
                                
        return age[y][x]; 
    } 
    
}




var desire_clip = {

    sync_taglist: 0,

    init: function () {
        desire_clip.action.set();
        desire_clip.ajax.sync();
    },
    ajax: {
        sync: function () {
            $.get('/sync/taglist/', desire_clip.ajax.parse);
        },
        parse: function (data) {
            data = json.parse(data);
            if (data) {
                if (data.id && user_tag.sync != data.id) {
                    user_tag.sync = data.id;
                    user_tag.action.store();
                    desire_clip.ajax.load();
                }
            }
        },
        load: function () {
            $.get('/tag/user/', desire_clip.ajax.on_load);
        },
        on_load: function (data) {                    // alert(data)
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
        add: function (tag) {
            $.post('/tag/add/', { tag: tag });
        }
    },
    action: {
        set: function () {
            user_tag.action.ids();
            $('.desire_clip').each(function (i,elem) {
                $(elem).off('click');
                $(elem).removeClass('desire_user');
                if (user_tag.idls.indexOf($(elem).data('id')) >= 0) {
                    $(elem).addClass('desire_user');
                } else
                    $(elem).on('click',desire_clip.action.add);
            });
            user_tag.option.set_count();
        },
        add: function () {
            desire_clip.ajax.add($(this).data('tag'));
            desire_clip.option.toggle(this);
            //$(this).on('click',desire_clip.action.del);
            var data = {"tag":$(this).data('tag'),"id":$(this).data('id')};
            user_tag.list.push(data);
        },
        del: function () {
            option_tag.ajax.del($(this).data('id'));
            desire_clip.option.toggle(this);
            user_tag.list.splice($(this).data('num'),1);
            $(this).on('click',desire_clip.action.add);
        }
    },
    option: {
        toggle: function (elem) {
            $(elem).off('click');
            $(elem).toggleClass('desire_user');
        }
    }
}



var active_textarea ;             ////////////////////////////////////////////////////////
var giper_chat = {

    open_mess:  0,
    idle_round: 0,

    count_unread: 0,
    cascade: 0,

    round_time: 0,
    round_open: 1,

    timer_id:   null,
    mess_block: null,

    mess_stock: [],

    prev_title: null,

    init: function ()
    {
        if (device.width() > 1200) {
            giper_chat.mess_stock = storage.array.load('mess_stock');
            giper_chat.remind();
        }
            $('<div id="block_timer" class="timer">').appendTo('body');
        giper_chat.timer_set();
        giper_chat.new_round();

        $('#giper_reply .post').on('click', giper_chat.reply_show);
        // Установка текста по умолчанию
        if (storage.load('reply_all'))
            $('#giper_reply textarea').val(storage.load('reply_all'));
        giper_chat.prev_title = document.title;
    } ,

    set_unread: function ()
    {
        if (giper_chat.count_unread > 0)
        {
            $('#menu_message_unread b').text(giper_chat.count_unread);
            $('#menu_message_unread').show();
            $('#menu_message').attr('title','Новых сообщений ' + giper_chat.count_unread);
        } else {
            $('#menu_message_unread').text('');
            $('#menu_message_unread').hide();
            $('#menu_message').attr('title','Новых сообщений нет');
        }
    } ,

    on_timer: function ()
    {
        giper_chat.title_blink ();

        if (giper_chat.round_open && giper_chat.cascade == 0)
            giper_chat.round_time--

        //if (giper_chat.cascade != 0)console.log('on_timer cascade: ' +giper_chat.cascade)

        giper_chat.trace();

        if (giper_chat.round_time < 1)
            giper_chat.new_round();
    } ,

    new_round: function ()
    {
        giper_chat.timer_stop();
        giper_chat.ajax_new();
    } ,

    trace: function ()
    {
        $('#block_timer').text(giper_chat.round_time);
    } ,

    ajax_new: function ()
    {
        simple_hash();
        giper_chat.round_open = 0;

        $.get('/ajax/new_mess.php',{ hash: hash }, giper_chat.on_load)
          .always( function() { giper_chat.round_open = 1; } );
    } ,

    on_load: function (data)
    {
        if (data) {
            var mess = json.parse(data);
            giper_chat.route_xz(mess);
            giper_chat.count_unread = mess.count_unread          ////////////////////////////////////
            giper_chat.set_unread();                             ////////////////////////////////////
        }
        setTimeout( function (){ giper_chat.timer_set(); },5000 );
    } ,

    route_xz: function (mess)
    {
        if (device.width() > 1200 && mess.type && giper_chat.open_mess < 9) {                               /* */
            if (mess.type == 'air_user' || mess.type == 'new_client') {
//                visited.action.load_cache();
//                if (visited.list.length) {
//                    if (visited.list.indexOf(mess.user+'') >= 0) {
//                        giper_chat.reply_enable();
//                        giper_chat.idle_round = 0;
//                        setTimeout( function (){ giper_chat.timer_set(); },5000 );
//                        return 0;
//                    }
//                }
            }
            giper_chat.mess_stock.push(mess);
            giper_chat.stock.store();
            giper_chat.new_message(mess);
        }
    } ,

    reply_enable: function ()
    {
        if (giper_chat.cascade == 0)
        {
            if (giper_chat.open_mess > 2)
                $('#giper_reply').show('blind');
            if (giper_chat.open_mess > 5)
                $('#giper_reply textarea').show('blind');
        }

        if (giper_chat.open_mess < 3)
            $('#giper_reply').hide('blind');
        if (giper_chat.open_mess == 0)
            giper_chat.cascade = 0;

                // console.log('re cascade: ' +giper_chat.cascade)

    } ,

    reply_show: function ()
    {
        var textarea = $('#giper_reply textarea');
        if (!$(textarea).is(":visible"))
        {
            active_textarea = textarea;
            textarea.show('blind');
            textarea.focus();
            notepad.show();                                          ////////////////////////////////////
        }
        else
            giper_chat.reply_all();

    } ,

    reply_all: function ()
    {
        var textarea = $('#giper_reply textarea');
        var text = textarea.val();

        if (text)
        {
            var block_mess = $('#giper_stock').children().filter(':first');
            giper_chat.cascade = text;
            storage.save('reply_all',text);
            $('textarea',block_mess).val(text);
            $('.post',block_mess).click();
            textarea.hide('blind');
        }
        giper_chat.reply_enable();
    } ,

    new_message: function (val)
    {                              //  elem.appendChild();
        giper_chat.open_mess++
        giper_chat.reply_enable();

        let new_block = giper_chat.create_message(val);

        new_block.prependTo($('#giper_stock'));

        new_block.show('blind');

        setTimeout( function (){ $('.sound',new_block).show(); },500 );

        giper_chat.idle_round = 0;
               // giper_chat.mess_stock.push(val);
               // giper_chat.stock.store();

    } ,

    remind: function ()
    {
        jQuery.each (giper_chat.mess_stock,function(i,val)
        {
            giper_chat.new_message(val);
        });
    } ,

    stock: {

        store: function ()
        {
             storage.array.save('mess_stock',giper_chat.mess_stock);
        } ,

        remove: function (num)
        {
            var del = null;
            jQuery.each (giper_chat.mess_stock,function(i,val)
            {
                if (val.mess_id == num)
                    del = i;
            });

            if(del || del == 0)
            {                               //alert($('.new_message').length + '  <> ' + giper_chat.mess_stock.length)
                giper_chat.mess_stock.splice(del,1);
                if ((giper_chat.mess_stock.length - $('.new_message').length) > 1)
                    giper_chat.mess_stock = [];
                giper_chat.stock.store();
            }
        }

    } ,


    create_message: function (val)
    {
        if (!val.reply) val.reply = '';

        //return 0;

        var new_block = $('#new_message_ex').clone()
         .attr( 'id', val.type+'_'+val.mess_id )  //.css("display","none")
         .data('number',val.mess_id)
         .data('user',val.user)
         .addClass( val.type );

         $('.mess_text',new_block).html(val.text);       // click( function (){ location.href =  });
         $('.close',new_block).click(
             function ()
             {
                 giper_chat.close_message($(new_block));
             }
         );

         if( val.type == 'new_message' || val.type == 'old_message' )
         {
             if( val.type == 'old_message' )
             {
                 $('.title',new_block).text('Есть сообщение без ответа');
                 $('.sound',new_block).remove();
             }

             $('.post',new_block).click( function (){ giper_chat.post_mess(val); });

             $('textarea',new_block).val( val.reply );
             $('.user_name',new_block).text(val.name+':');
             $('.history',new_block).click(
             function ()
             {
                 giper_chat.follow_message(val.user,val.mess_id);
             });

             $('.bunn',new_block).click( function ()
             {
                 giper_chat.ajax_bun(val.user,val.mess_id,val.type);
                 giper_chat.open_mess--;
             });

             if( val.type == 'new_message' )
                 $('#contact_update').show('fade');
         }

         if( val.type == 'server_mess' )
         {
             $('.sound',new_block).remove();
             $('.title',new_block).text( val.reply );
             $('.bunn',new_block).remove();
             $('.post',new_block).val('Хорошо');

             $('.post',new_block).click(
                 function ()
                 {
                     send_serv_mess($('#'+val.type+'_'+val.mess_id ),'tip_user_bun_close')
                 }
              );

              $('.history',new_block).text( 'Подробнее...' ) ;
              $('.history',new_block).attr( 'href','/блог/наказывайте-кого-следует/' ) ;
              $('.history',new_block).attr( 'target','_blank' ) ;
         }

         if( val.type == 'air_user' || val.type == 'new_client' )
         {
             if( val.type == 'air_user' )
                 $('.title',new_block).text('Сейчас на сайте');
             if( val.type == 'new_client' )
                 $('.title',new_block).text('Зарегистрировалась сегодня');

             $('.mess_text',new_block).html(val.age + ' ' + val.city + ' ' + val.text);

             $('.sound',new_block).remove();
             // var timer_air = setTimeout( function (){ close_message( $(new_block) ); open_mess--; },30000 );
             //$('.title',new_block).text( val.reply );
             $('.bunn',new_block).remove();
             $('.user_name',new_block).text(val.name+',');
             $('.user_name',new_block).text(val.name+',');
             $('.post',new_block).val('Написать');

             $('.post',new_block).click( function () { giper_chat.post_mess(val); });

             $('.history',new_block).text( 'Смотреть анкету' ) ;
             $('.history',new_block).click(
             function ()
             {
                 giper_chat.follow_message(val.user,val.mess_id);
             });

             if( val.type == 'new_client' ) {

             }
         }

         $(new_block).draggable( {
             handle:'.title',
             stop: function(event, ui)
             {
                 $('.sound',new_block).remove();

                 //alert ($(this).offset().left)

                 var topOff  = $(this).offset().top - $(window).scrollTop()
                 var leftOff = $(this).offset().left
                  $(this).css("top",topOff).css("left",leftOff).css("position","fixed")

                 $(this).appendTo( 'body' );
             }
         });  /**/

         return new_block;

    } ,

    close_message: function (elem)
    {
        $('.sound',elem).remove();
        elem.hide('blind');
        giper_chat.open_mess--;
        giper_chat.stock.remove(elem.data('number'));
        setTimeout( function (){ elem.remove(); },500 );
    } ,

    close_all: function (user)
    {                                          /*
        $('#giper_stock div').
        $('.sound',elem).remove();
        elem.hide('blind');
        giper_chat.open_mess--;
        giper_chat.stock.remove(elem.data('number'));
        setTimeout( function (){ elem.remove(); },500 ); */
    } ,

    follow_message: function (user,mess_id)
    {
        giper_chat.stock.remove(mess_id);
        location.href = '/'+user;
    } ,

    ajax_bun: function (user,mess_id,type)
    {
        giper_chat.close_message( $('#'+type+'_'+mess_id ) );
        $.post( "/mess/bun/", { id: mess_id, tid: user } );

    } ,

    timer_set: function ()
    {
        giper_chat.timer_stop();
        if (giper_chat.idle_round == 0) { giper_chat.round_time = 10;  } else
        if (giper_chat.idle_round == 1) { giper_chat.round_time = 10;  } else
        if (giper_chat.idle_round == 2) { giper_chat.round_time = 5;   } else
        if (giper_chat.idle_round == 3) { giper_chat.round_time = 25;  } else
        if (giper_chat.idle_round == 4) { giper_chat.round_time = 35;  } else
        if (giper_chat.idle_round > 11) { giper_chat.round_time = 300; } else
        if (giper_chat.idle_round > 4 ) { giper_chat.round_time = 60;  }

        giper_chat.idle_round++
        giper_chat.timer_id = window.setInterval ( 'giper_chat.on_timer()', 1000 );
        //console.log('таймер запущен: ' +giper_chat.round_time)

    } ,

    timer_stop: function ()
    {
        window.clearInterval(giper_chat.timer_id);
        //console.log('таймер остановлен: ' +giper_chat.cascade)
    } ,

    timer_cut: function ()
    {
        if (giper_chat.idle_round > 0 && giper_chat.round_time > 10)
            giper_chat.round_time = 10;
        giper_chat.idle_round = 0;
    } ,

    toggle_text: function ()
    {
        var textarea   = $('textarea',giper_chat.mess_block);
        var text_value = $(textarea).val();
        if (!$(textarea).is(":visible"))
        {
            active_textarea = textarea;            ///////////////////////////////////////
            $(textarea).show('blind');
            $(textarea).focus();
            notepad.show();                        ///////////////////////////////////////
            return 0;
        }

        return text_value

    } ,

    post_mess: function (val)
    {
        giper_chat.mess_block = $('#'+val.type+'_'+val.mess_id);     // alert( user )

        var text, repl

        if (giper_chat.cascade != 0)
        {
            text = giper_chat.cascade;
            repl = '';
        }
        else
        {
            text = giper_chat.toggle_text();
            repl = text
        }

        if (text)
        {
            simple_hash();

            $.post
            (
                "/mailer/post/",
                {
                    mess: text,
                    id:   val.user,
                    re:   repl,
                    captcha_code: $('.code',giper_chat.mess_block).val(),
                    hash: hash
                 },
                 giper_chat.on_post
             );

            disabled_with_timeout( $('.post',giper_chat.mess_block), 5);
            giper_chat.timer_cut();
        }

    } ,

    on_post: function (data)
    {                                // alert (data)
        if( !data ) return 0;
        var mess = JSON.parse( data );

        if( mess.error == 'captcha' )
        {
            $('textarea',giper_chat.mess_block).show('blind');
            $('.captcha_block',giper_chat.mess_block).show('blind');
            $('.captcha',giper_chat.mess_block).get(0).src = '/secret_pic.php?hash='+hash;
        }

        if( mess.saved == '1' )
        {
            giper_chat.idle_round = 0;

            $('#contact_update').show('fade');
            giper_chat.close_message(giper_chat.mess_block);

            notepad.hide();                 //////////////////////////////////////////////
            //visited.action.save(giper_chat.mess_block.data('user'));

            setTimeout( function ()
            {
               if (giper_chat.cascade != 0)
                   giper_chat.reply_all();
            },700 );
        }

        if( mess.error == 'reload' )
        {
            giper_chat.idle_round = 0;
            location.href = '/'+user+'?text='+text; //alert ('reload')
        }

        disabled_with_timeout( $('.post',giper_chat.mess_block), 0.05);

    } ,

    title_blink: function ()
    {
        if (giper_chat.count_unread == 0)
        {
            document.title = giper_chat.prev_title;
            return false ;
        }

        if( document.title != 'Вам сообщение!' )
        {
            document.title = 'Вам сообщение!' ;
        }
        else
            document.title = ' * * * * * * * * * * * * ' ;
    } ,

    post_serv: function (elem,value)
    {
        giper_chat.close_message( $(elem) );                   /*
        var param = {}; param[value] = 1;
         $.get( "/ajax/messages_load.php", param ); */
        set_cookie( 'user_bun', '1', 259200 );
    }

}



  $( document ).ready(function() {   
  /*            
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925673",name: "Максим",reply: "",sity: "Ивантеевка",text: "Привет. Давай познакомимся.",time: "1415561723",type: "air_user",user: "699208"});
 giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925674",name: "Николай",reply: "",sity: "Ивантеевка",text: "и дай я тебя отжарю. не пожалеешь. отсосешь мне",time: "1415561723",type: "new_message",user: "699208"});
  giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925675",name: "Виктор",reply: "",sity: "Ивантеевка",text: "юлия а где найти анонимные объявления",time: "1415561723",type: "new_message",user: "699208"});
  giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925676",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
   giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925677",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
   giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925678",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
          */      
  }) ;

  
// Установки  почты        
var mailsett = {    
        
    init: function () 
    {      
        $('#link_virt_turn').on('click',mailsett.turn_virt);
        $('#link_close_turn').on('click',mailsett.turn_close);  
    } ,    
  
    turn_virt: function () 
    {
        var text = $('#text_virt_turn').text();
        
        if (text == 'неприемлемо') 
        {
            $('#text_virt_turn').text('возможен');
            mailsett.send_virt(1);
        }
        else
        {  
            $('#text_virt_turn').text('неприемлемо'); 
            mailsett.send_virt(0); 
        } 
        
    } ,
    
    turn_close: function () 
    {
        var text = $('#text_close_turn').text();
        
        if (text == 'ограничить') 
        {
            $('#text_close_turn').text('разрешить');
            mailsett.send_close(0);
        }
        else
        {  
            $('#text_close_turn').text('ограничить'); 
            mailsett.send_close(1); 
        }
        
    } , 
    
    send_close: function (data) 
    {
        $.post( '/msett/close/', { option_mess_town: data }, onAjaxSuccess);
        function onAjaxSuccess(data) { }                    
    } ,
  
    send_virt: function (data) 
    {
        $.post( '/msett/virt/', { option_virt_accept: data }, onAjaxSuccess);
        function onAjaxSuccess(data) { }                    
    }
    
}


                      
var master_info = { 
  
    init: function () {                   
        if (!userinfo.data.sex) {    
            master_info.ajax.load_sex();
        } else    
        if (!userinfo.data.city && $('#human_print_city').text()) {    
            master_info.ajax.load_city();
        } else                    
        if (!userinfo.data.age) {    
            master_info.ajax.load_age();
        } else    
        if (userinfo.data.second > 300 && userinfo.data.contact.mc < 20) {    
            master_info.ajax.load_contact();
        }               
    },   
    ajax: {  
        load_contact: function () {         
            $('#anketa_master_info').load('/static/htm/master_contact.html',master_info.ajax.on_contact); 
        }, 
        on_contact: function () {           
            master_contact.action.sett(0);
            master_contact.option.print();
        }, 
        load_city: function () {         
            $('#anketa_master_info').load('/static/htm/master_city.html',master_info.ajax.on_city); 
        }, 
        on_city: function () {            
            master_city.init();
            option_static.init();
        }, 
        load_age: function () {         
            $('#anketa_master_info').load('/static/htm/master_age.html',master_info.ajax.on_age); 
        }, 
        on_age: function () {            
            master_age.init();
            option_static.init();
        }, 
        load_sex: function () {         
            $('#anketa_master_info').load('/static/htm/master_sex.html',master_info.ajax.on_sex); 
        }, 
        on_sex: function () {            
            master_sex.init();
            option_static.init();
        }             
    }   

}



// Навигация с помошью клавиатуры
var navigate = {

    enable:  0,

    init: function ()
    {
        $(document).on('keydown', function() {
            navigate.through(event);
        });

    } ,

    // Отправка сообщения по CTRL + Enter
    post_form: function (event, formElem)
    {
        if((event.ctrlKey) && ((event.keyCode == 10)||(event.keyCode == 13))) {
            formElem.submit();
        }
    } ,

    // Навигация с помошью стрелок + CTRL
    through: function (event)
    {
        if (window.event)
            event = window.event;

        if (event.ctrlKey)
        {
            var link = null;
            var href = null;
            switch (event.keyCode ? event.keyCode : event.which ? event.which : null)
            {
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
            if($('a').is(link))  // alert($(link).attr('href')); return false;
                document.location = $(link).attr('href');
        }
    }

}



// -- Блокнот ---
var notepad = {

    note_block: null,
    last_click: null,
    disibled:   0,
    create:     0,

    init: function ()
    {
        if (device.width() < 1000)
        {
            notepad.disibled = 1;
        }

        notepad.disibled = get_cookie ('note_vis')*1 ? 1 : 0;   //////////////////////////

        active_textarea = $('#mess_text_val');
        notepad.note_block = $('.notepad');


        $('textarea').click( function ()
        {
            active_textarea = this;
            notepad.show();
        });

        $('#notepad_on').click( function (){ notepad.toggle_disable('on'); notepad.show('force'); });

        $('.close',notepad.note_block).click( function (){ notepad.hide(); });
        $('.post',notepad.note_block).click( function (){ notepad.toggle_disable('off'); notepad.hide(); });
        $('.bunn',notepad.note_block).click( function (){ notepad.toggle_disable('off'); notepad.hide(); });

    } ,

    hide: function ()
    {
        notepad.note_block.hide('fade');
    } ,

    show: function (force)
    {
        if (!notepad.disibled)
        if (force || (active_textarea && notepad.last_click != active_textarea))
        {
            if (notepad.create)
            {
                notepad.note_block.show('fade');
                notepad.last_click = active_textarea;        /////////////////////////////
            }
            else
                notepad.ajax_load();
        }
    } ,

    toggle_disable: function (vset)
    {
        if (vset == 'off') notepad.disibled = 1;
        if (vset == 'on' ) notepad.disibled = 0;

        if (vset)
        {
            set_cookie ('note_vis', notepad.disibled, 259200);   /////////////////////////
        }
    } ,

    ajax_load: function ()
    {
         simple_hash();
         $.get( '/ajax/load_notepad.php', { hash: hash }, notepad.on_load);
    } ,

    remind: function ()
    {
        var top  = storage.load('notepad_top');
        var left = storage.load('notepad_left');

        if (top  && top  < 40) top  = 50;
        if (left && left < 10) left = 10;
        if (top  > (device.height()-300)) top  = 0;
        if (left > (device.width()-300))  left = 0;

        if (top)  notepad.note_block.css("top",top+'px');
        if (left) notepad.note_block.css("left",left+'px');

    } ,

    on_load: function (data)
    {
           if( data.indexOf('div') > 0 )
           {
               notepad.create = 1;
               $('.notes',notepad.note_block).html( data );
               $('.note_line',notepad.note_block).click(
                   function ()
                   {
                        let text = $(this).text();
                        $(active_textarea).val(text).focus();
                        if ($(active_textarea).attr('id') == 'mess-text-area') {
                            FormMess.message = text;
                        } // TODO: жэсточайшы костыль для блокнота

//                        // Trigger a DOM 'input' event
//                        var evt = document.createEvent('HTMLEvents');
//                        evt.initEvent('input', false, true);
//                        elt.dispatchEvent(evt);
                   }
               );

               notepad.remind();

               notepad.note_block.draggable
               (
                   {
                       handle:'.title',
                       stop: function(event, ui)
                       {
                           var topOff = $(this).offset().top - $(window).scrollTop();
                           notepad.note_block.css("top",topOff);
                           storage.save('notepad_top',topOff);
                           storage.save('notepad_left',$(this).offset().left);
                       }
                   }
               );

               notepad.show();
           }

    }






}



var option_age = { 
  
    init: function () {                              
        $('#option_age_value').val(userinfo.data.age); 
        $('#option_age_button').off('click').on('click',option_age.action.send_age);
        $('.opt_age_val').off('click').on('click',option_age.action.send_link);               
    } ,    
    ajax: {   
        on_save: function (data) {    
            data = json.parse(data);
            if (data.age) {
                userinfo.data.age = data.age;                      
                userinfo.action.set_age(data.say);
            }                                  
        }              
    } ,  
    action: {   
        save: function (age) {   
            userinfo.data.age = age;        
            userinfo.ajax.save.age(option_age.ajax.on_save); 
            userinfo.action.set_age();   
            option_static.action.close();                  
        },    
        send_link: function () {   
            option_age.action.save($(this).text());                 
        },  
        send_age: function () {                        
            option_age.action.save($('#option_age_value').val());                   
        }                                   
    }    
}          


   
var option_anketa = {
 
    anketa: {
        growth: 0,
        weight: 0,
        figure: 0  
    },  
  
    init: function () {  
        $('#option_anketa input').prop('disabled',true);
        $('#option_anketa input:radio').on('click',option_anketa.action.set); 
        $('#option_anketa_button').on('click',option_anketa.action.send); 
        option_anketa.ajax.load();                 
    } ,    
    ajax: {    
        load: function () {                             
            $.get('/sync/anketa/', option_anketa.ajax.on_load);                   
        },   
        on_load: function (data) {   
            option_anketa.action.print(json.parse(data));                            
            //option_static.action.close();     
        },    
        save: function (anketa) {                             
            $.post('/option/anketa/', { anketa: anketa }, option_anketa.ajax.on_save); 
            option_static.action.close();                   
        },   
        on_save: function (data) {          
            data = json.parse(data);
            if (data.alert != undefined) {                  
                profile_alert.option.show(data.alert);
                option_anketa.action.set_anketa(data.text);
            }               
        }             
    } ,        
    action: {    
        set_anketa: function (text) {     
            $('#user_anketa_option').text(text);                     
        } ,    
        set: function () {     
            option_anketa.anketa.figure = $(this).val();                     
        } ,         
        send: function () {           
            option_anketa.anketa.growth = $('#option_anketa_growth').val();
            option_anketa.anketa.weight = $('#option_anketa_weight').val();                  
            option_anketa.ajax.save(option_anketa.anketa);                  
        } ,  
        print: function (anketa) {         
            if (anketa.figure != undefined) {       
                option_anketa.anketa = anketa; 
                var elem = $('#option_anketa input:radio[name=figure]');
                elem.filter('[value='+(anketa.figure*1)+']').prop('checked', true);  
                $('#option_anketa_growth').val(anketa.growth*1);
                $('#option_anketa_weight').val(anketa.weight*1); 
            }      
            $('#option_anketa input').prop('disabled',false);           
        }                                   
    }    
}          


       
var option_chlogin = {
   
    init: function () {                               
        $('.option_chlogin_toggle').on('click',option_chlogin.option.toggle);    
        $('#option_chpass_send').on('click',option_chlogin.action.chpass);   
        $('#option_chlogin_send').on('click',option_chlogin.action.chlogin); /*
        $('#hide_char').on('click',option_login.action.hide_char);     
        $('#option_remind_send').on('click',option_login.action.remind);  
        $('#option_login_reset').on('click',option_login.option.reset);     */
        
     /*
        $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
        option_intro.action.print(); */               
    } ,    
    ajax: {     
        chpass: function (pass) {                             
            $.post('/option/auth/', { pass: pass }, option_chlogin.ajax.on_pass);                    
        },     
        chlogin: function (login) {                             
            $.post('/option/auth/', { login: login }, option_chlogin.ajax.on_login);                    
        },     
        on_pass: function (data) {  
            option_chlogin.ajax.on_err(data); 
            disabled_with_timeout($('#option_chpass_send'),0.5);                   
        },     
        on_login: function (data) {     
            option_chlogin.ajax.on_err(data);       
            disabled_with_timeout($('#option_chlogin_send'),0.5);                     
        },     
        on_err: function (data) {                           
            data = json.parse(data);
            if (data.err != undefined && data.err > 0) {       
                option_chlogin.option.text(data.say);     
            } else
                option_static.action.close();                             
        }        
    } ,        
    action: {      
        chlogin: function () {                  
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chlogin_send'),5);
            option_chlogin.ajax.chlogin($('#option_chlogin_value').val());        
        },    
        chpass: function () {                      
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chpass_send'),5);
            option_chlogin.ajax.chpass($('#option_chpass_value').val());        
        }                              
    } ,        
    option: {         
        toggle: function () {                   
            option_chlogin.option.text(''); 
            $('#option_tab_chlogin').toggle('blind'); 
            $('#option_tab_chpass').toggle('blind'); 
        },          
        text: function (text) {              
            $('.option_chlogin_text').text(text);  
        } 
    }    
}          


   
var option_city = { 
  
    init: function () {                              
        $('#option_city_value').val(userinfo.data.city); 
        $('#option_city_button').off('click').on('click',option_city.action.send_city);
        $('.opt_city_val').off('click').on('click',option_city.action.send_link);               
    } ,    
    ajax: {     
        on_save: function (data) {   
            data = json.parse(data);
            if (data.city) {
                userinfo.data.city    = data.city;   
                userinfo.data.city_id = data.city_id;             
                userinfo.data.verify  = data.verify;                    
                userinfo.action.set_city();
            }         
        }              
    } ,  
    action: {    
        save: function (city) {   
            userinfo.data.city = city;        
            userinfo.ajax.save.city(option_city.ajax.on_save); 
            userinfo.action.set_city();   
            option_static.action.close();                  
        },  
        send_link: function () {       
            option_city.action.save($(this).text());                   
        },  
        send_city: function () {             
            option_city.action.save($('#option_city_value').val());                  
        }                                   
    }    
}          


    
var option_contact = {
   
    init: function () {  
        $('#option_contact input').prop('disabled',true);
        $('#option_contact input:checkbox').on('click',option_contact.action.set);
        $('#option_contact_button').on('click',option_contact.action.send); 
        option_contact.action.print();                 
    } ,    
    ajax: {     
        save: function (contact) {                             
            $.post('/option/contact/', { contact: contact }, option_contact.ajax.on_save);                   
        },   
        on_save: function (data) {  
            mess = json.parse(data);
            $('#user_contact_option').text(mess.count); 
            profile_alert.option.show(mess.alert);                           
            option_static.action.close(); 
        }             
    } ,        
    action: {    
        set: function () {     
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked')*1;                     
        } ,     
        send: function () {                             
            option_contact.ajax.save(userinfo.data.contact);                  
        } ,  
        print: function () {                           
            if (userinfo.data.contact != undefined) {  
                $('#option_contact_em').prop('checked',userinfo.data.contact.em*1);
                $('#option_contact_vk').prop('checked',userinfo.data.contact.vk*1);
                $('#option_contact_ok').prop('checked',userinfo.data.contact.ok*1);
                $('#option_contact_fb').prop('checked',userinfo.data.contact.fb*1);
                $('#option_contact_go').prop('checked',userinfo.data.contact.go*1);
                $('#option_contact_sk').prop('checked',userinfo.data.contact.sk*1);
                $('#option_contact_ph').prop('checked',userinfo.data.contact.ph*1); 
                $('#option_contact input').prop('disabled',false);
            }                 
        }                                   
    }    
}          



var option_email = {

    init: function () {
        $('.option_email_button').off('click');
        $('.option_email_button').on('click',option_email.action.send_email);
        if (userinfo.data.email)
            $('.option_email_value').val(userinfo.data.email);
        option_email.ajax.load();
    } ,
    ajax: {
        load: function () {
            $.post('/sync/email/', option_email.ajax.on_load);
        },
        post: function (email) {
            $.post('/option/email/', { email: email }, option_email.ajax.on_save);
            userinfo.data.email = data.email;
            userinfo.action.set_email();
            option_static.action.close();
        },
        on_save: function (data) {
            profile_alert.option.show(json.parse(data));
        },
        on_load: function (data) {
            data = json.parse(data);
            if (data) {
                if (data.email != '') {
                    userinfo.data.email = data.email;
                    userinfo.action.set_email();
                }
            }
        }
    } ,
    action: {
        send_email: function () {
            option_email.ajax.post($('.option_email_value').val());
        }
    }
}


      
var option_intro = {
 
    name: '', 
    city: '', 
    age: 0, 
    sex: 0, 
   
    init: function () {  
        $('#option_intro input').prop('disabled',true);
        $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
        $('#option_intro_button').on('click',option_intro.action.send); 
        option_intro.action.print();                
    } ,          
    action: {    
        set_sex: function () {      
            var sex = $(this).val();
            if (sex != userinfo.data.sex) { 
                userinfo.data.sex = sex;   
                userinfo.ajax.save.sex(option_sex.ajax.on_save);           
                userinfo.action.set_sex();  
            }                  
        } ,   
        set_name: function () {        
            var name = $('#option_intro_name').val();
            if (name != userinfo.data.name) { 
                userinfo.data.name = name;   
                userinfo.ajax.save.name(option_name.ajax.on_save);           
                userinfo.action.set_name();  
            }                  
        } ,   
        set_city: function () {   
            var city = $('#option_intro_city').val();
            if (city != userinfo.data.city) { 
                userinfo.data.city = city;   
                userinfo.ajax.save.city(option_city.ajax.on_save);           
                userinfo.action.set_city();  
            }                  
        } ,   
        set_age: function () { 
            var age = $('#option_intro_age').val();
            if (age != userinfo.data.age) { 
                userinfo.data.age = age;   
                userinfo.ajax.save.age(option_age.ajax.on_save);           
                userinfo.action.set_age();  
            }                  
        } ,         
        send: function () {                              
            option_intro.action.set_name();              
            option_intro.action.set_city();              
            option_intro.action.set_age();
            option_static.action.close();                    
        } ,  
        print: function () {   
            option_intro.name = userinfo.data.name; 
            option_intro.city = userinfo.data.city; 
            option_intro.age  = userinfo.data.age; 
            option_intro.sex  = userinfo.data.sex; 
            $('#option_intro_name').val(userinfo.data.name);
            $('#option_intro_city').val(userinfo.data.city);
            $('#option_intro_age').val(userinfo.data.age);                   
            var elem = $('#option_intro input:radio[name=sex]');
            elem.filter('[value='+(userinfo.data.sex*1)+']').prop('checked', true); 
            $('#option_intro input').prop('disabled',false);           
        }                                   
    }    
}          
 


var option_login = {
   
    init: function () {      
        $('#hide_char').on('click',option_login.action.hide_char);     
        $('#option_login_send').on('click',option_login.action.send);  
        $('#option_remind_send').on('click',option_login.action.remind);  
        $('.option_login_toggle').on('click',option_login.option.toggle);
        $('#option_login_reset').on('click',option_login.option.reset); 
        
     /*
        $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
        option_intro.action.print(); */               
    } ,    
    ajax: {     
        send: function (login,pass,captcha) {                             
            $.post('/sync/login/', { login: login, pass: pass, captcha: captcha }, option_login.ajax.on_save);                    
        },   
        on_save: function (data) {          
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
        remind: function (email) {                             
            $.post('/sync/remind/', { email: email }, option_login.ajax.on_load);                    
        },   
        on_load: function (data) {          
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
    } ,        
    action: {    
        hide_char: function () {         // $(this)
            var elem = $('#password_input');
            var attr = elem.attr('type');   
            if (attr == 'password') {
                elem.attr('type','text');
            } else 
                elem.attr('type','password');        
        } ,   
        send: function () {         
            var login = $('#login_input').val();
            var pass = $('#password_input').val();
            var captcha = $('#captcha_input').val();
            disabled_with_timeout($('#option_login_send'),7);
            option_login.ajax.send(login,pass,captcha);        
        } ,   
        remind: function () {         
            var email = $('#option_remind_email').val();  
            disabled_with_timeout($('#option_remind_send'),7);
            option_login.ajax.remind(email);        
        }                             
    } ,        
    option: {      
        captcha: {  
            show: function () {         
                $('#captcha_pass_block').show();         
            } ,  
            reload: function () {      
                if ($('#captcha_code').is(":visible")) 
                    $('#captcha_code').get(0).src = '/capcha_pic.php?hash='+hash;       
            } 
        } ,   
        say_login: function (text) {         
            $('#option_login_text').text(text);         
        } ,  
        say_remind: function (text) {         
            $('#option_remind_text').text(text);         
        } ,    
        toggle: function () {                    
            $('#option_tab_login').toggle('blind'); 
            $('#option_tab_remind').toggle('blind');  
            $('#option_tab_posted').hide('blind');  
        },    
        posted: function () {         
            $('#option_tab_posted').show('blind'); 
            $('#option_tab_remind').hide('blind'); 
            $('#option_tab_login').hide('blind');   
        },    
        reset: function () {         
            $('#option_tab_posted').hide('blind'); 
            $('#option_tab_remind').hide('blind'); 
            $('#option_tab_login').show('blind');   
        }  
    }    
}         


                     
var option_name = { 
  
    init: function () {                              
        $('#option_name_value').val(userinfo.data.name); 
        $('#option_name_button').off('click').on('click',option_name.action.send_name); 
        option_name.option.namelist();                   
    } ,    
    ajax: {     
        on_save: function (data) {          
            data = json.parse(data);
            if (data.name) {
                userinfo.data.name = data.name;                      
                userinfo.action.set_name();
            }                                 
        }              
    } ,  
    action: {     
        save: function (name) {   
            userinfo.data.name = name;               
            userinfo.ajax.save.name(option_name.ajax.on_save); 
            userinfo.action.set_name();   
            option_static.action.close();                  
        }, 
        send_link: function () {       
            option_name.action.save($(this).text());                
        },  
        send_name: function () {                      
            option_name.action.save($('#option_name_value').val());               
        }                                   
    } ,  
    option: {     
        namelist: function () {            
            if (userinfo.data.sex == 1) {
                $('#man_opt_name').show();
            }
            if (userinfo.data.sex == 2) {   
                $('#woman_opt_name').show(); 
            }
            if (!userinfo.data.sex) {   
                //$('#woman_opt_name').show(); 
            } 
            $('.opt_name_val').on('click',option_name.action.send_link); 
        }                                   
    }    
}    


      
var option_sex = { 
  
    init: function () {                         
        $('.option_sex_change').off('click').on('click',option_sex.action.send_sex);               
    } ,    
    ajax: {     
        on_save: function (data) {   
            userinfo.data.name = auto_gen.name(userinfo.data.sex);   
            userinfo.ajax.save.name(option_name.ajax.on_save);
            data = json.parse(data);
            if (data.sex) {
                userinfo.data.sex = data.sex;                      
                userinfo.action.set_sex();
            }      
        }              
    } ,  
    action: {    
        send_sex: function () { 
            if (userinfo.data.sex == 0) {
                userinfo.data.sex = 2;
            } else  
            if (userinfo.data.sex == 1) {
                userinfo.data.sex = 2;
            } else    
            if (userinfo.data.sex == 2) {
                userinfo.data.sex = 1;
            }    
            userinfo.ajax.save.sex(option_sex.ajax.on_save);           
            userinfo.action.set_sex();                  
        },  
        save: function (sex) {  
            userinfo.data.sex = sex;
            userinfo.ajax.save.sex(option_sex.ajax.on_save);           
            userinfo.action.set_sex();                  
        }                                   
    }    
}          



// -- Статический блок опций ---
var option_static = {

    click_enable: null,
    active_elem: null,
    timer_id: null,
    form: null,

    init: function ()
    {
        if (!$('.option_static').length)
            return null;

        $('.option_static').each( function (i,elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('click',option_static.action.preload);
                elem.data('active',1);
            }
        });                    // alert(1)
        $('#option-static__close').on('click',option_static.action.close);
    } ,

    ajax: {
        load: function (option) {
            option_static.option.form.trash();
            $('#option-static__container')
                .load( '/static/htm/option_' + option + '.html',option_static.ajax.on_load);
        } ,
        on_load: function (data) {           // alert(visited.list)
            if (data) {
                option_static.action.router();
                option_static.action.show_form();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        } ,
        save: function (tid) {
            //$.get( '/contact/addvisit/'+ uid +'/', { tid: tid }, visited.ajax.parse_save);
        }
    } ,

    option: {
        loader: {
            show: function () {
                $('#option-static__loader').delay(1000).show('fade');
            } ,
            hide: function () {
                $('#option-static__loader').clearQueue();
                $('#option-static__loader').hide('fade');
            }
        } ,
        form: {
            show: function () {
                $('#option-static__container').show('fade');
            } ,
            hide: function () {
                $('#option-static__container').hide('fade');
            } ,
            trash: function () {
                $('#option-static__container').empty();
            }
        } ,
        block: {
            show: function () {
                $('#option-static').show('fade');
            } ,
            hide: function () {
                $('#option-static').hide('fade');
            }
        }
    } ,

    action: {
        show_form: function () {
           option_static.option.form.show();
           option_static.option.loader.hide();
        } ,
        preload: function () {
            var option = $(this).data('option');
            option_static.form = option;
            if (option) {
               option_static.ajax.load(option);
               option_static.option.block.show();
               option_static.option.loader.show();
            }
        } ,
        close: function () {
           option_static.option.form.hide();
           option_static.option.loader.hide();
           option_static.option.block.hide();
        } ,
        router: function () {
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
}



var option_tag = {

    loaded:   0,

    init: function () {
        $('#option_tag input').prop('disabled',true);
        $('#option_tag_button').on('click',option_tag.action.send);
        option_tag.action.remind();
        option_tag.ajax.load();
    } ,
    ajax: {
        load: function () {
            $.get('/tag/user/', option_tag.ajax.on_load);
        },
        on_load: function (data) {
            data = json.parse(data);
            if (data.tags.length > 0) {
                option_tag.action.print(data.tags);
                user_tag.list = data.tags;
                user_tag.action.store();
            }
            $('#option_tag input').prop('disabled',false);
            //
            //option_static.action.close();
        },
        add: function (tag) {
            $.post('/tag/add/', { tag: tag }, option_tag.ajax.on_save);
        },
        on_save: function (data) {
            data = json.parse(data);
            if (data.id) {
                user_tag.list[user_tag.list.length-1].id = data.id;
                user_tag.option.set_count();
                option_tag.action.remind();
            } else {
                option_tag.option.error(option_tag.loaded);
            }
            $('#option_tag_value').val('');
            user_tag.action.store();
        },
        del: function (id) {
            $.post('/tag/del/', { id: id });
        }
    } ,
    action: {
        remind: function () {
            if (user_tag.list.length > 0) {
                option_tag.action.print(user_tag.list);
            }
        },
        send: function () {
            var tag = $('#option_tag_value').val();
            var data = {"tag":tag,"id":0};
            user_tag.list.push(data);
            option_tag.action.remind();
            option_tag.ajax.add(tag);
        },
        set: function () {
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked')*1;
        } ,
        print: function (tags) {
            $('#option_tag_list').empty();
            for (var i = 0; i < tags.length; i++) {
                var style = '';
                let block_line = $('<i class="desire_tag">').text(tags[i].tag);
                if (!tags[i].id)
                    block_line.addClass('desire_onload');
                block_line.data('id',tags[i].id);
                block_line.data('num',i);
                block_line.data('tag',tags[i].tag);
                block_line.attr('id','utag'+i);
                block_line.on('click',option_tag.action.del);
                $('#option_tag_list').append(block_line);
            }
        },
        add: function () {
            option_tag.ajax.add($(this).data('tag'));
            option_tag.option.toggle(this);
            $(this).on('click',option_tag.action.del);
            var data = {"tag":$(this).data('tag'),"id":$(this).data('id')};
            user_tag.list.splice($(this).data('num'),0,data);
        },
        del: function () {
            option_tag.ajax.del($(this).data('id'));
            option_tag.option.toggle(this);
            user_tag.list.splice($(this).data('num'),1);
            user_tag.option.set_count();
            $(this).on('click',option_tag.action.add);
        },
        ids: function () {
            user_tag.idls = [];
            for (var i=0; i<user_tag.list; i++) {
                if (user_tag.list[i].id)
                    user_tag.idls.push(user_tag.list[i].id);
            }
            return user_tag.idls;
        }
    },
    option: {
        toggle: function (elem) {
            $(elem).off('click');
            $(elem).toggleClass('deleted_tag');
        },
        error: function (i) {
            $('#utag'+[i]).off('click');
            $('#utag'+[i]).toggleClass('error_tag');
        }
    }
}


      
var profile_alert = { 
    init: function () {                            
        $('#profile_alert').on('click',profile_alert.option.hide);              
    } , 
    option: {   
        show: function (text) {  
            if (text) {  
                var elem = $('#profile_alert');          
                elem.clearQueue();                
                elem.html(text);                 
                $('#profile_alert').show('fade');   
                $("html, body").animate({ scrollTop: 0 }, "slow");            
                elem.delay(5000).queue(profile_alert.option.hide);   
            }               
        } , 
        hide: function () {  
            var elem = $('#profile_alert');           
            elem.clearQueue();          
            elem.hide('fade');                             
            elem.delay(500).queue(profile_alert.option.clear);
        } , 
        clear: function () {  
            $('#profile_alert').empty();                      
        }                                   
    }    
}          


     
var profile_option = { 
  
    init: function () {                           
        $('#profile_auth_button').on('click',profile_option.action.send_auth); 
        $('#profile_send_pass').on('click',profile_option.action.send_pass);  
        $('#profile_del_email').on('click',profile_option.action.del_email);  
        $('#profile_subscr_send').on('click',profile_option.action.subscr);            
    } ,    
    ajax: {   
        post: function (login,pass) {                             
            $.post('/option/auth/', { login: login, pass: pass }, profile_option.ajax.on_save);                   
        },   
        on_save: function (data) {                      
            data = json.parse(data);
            if (data.err != undefined) {  
                profile_alert.option.show(data.say);     
            }        
        },  
        send_pass: function () {                             
            $.post('/option/passend/', profile_option.ajax.alert);                   
        },  
        del_email: function () {                             
            $.post('/option/demail/', profile_option.ajax.alert);                   
        },  
        subscr: function (subscr) {                             
            $.post('/option/subscr/', profile_option.ajax.error);                   
        },   
        alert: function (data) {                     
            data = json.parse(data);
            if (data.err != undefined) {  
                profile_alert.option.show(data.say);     
            }      
        },   
        error: function (data) {                     
            data = json.parse(data);
            if (data.err != undefined && data.err > 1) {  
                profile_alert.option.show(data.say);     
            }      
        }       
    } ,  
    action: {   
        send_email: function () {                            
            option_email.ajax.post($('#profile_email_value').val());                  
        },     
        send_auth: function () {                            
            profile_option.ajax.post(
                $('#profile_login_value').val(),
                $('#profile_pass_value').val()
            );                  
        },     
        send_pass: function () {                            
            profile_option.ajax.send_pass();                  
        },     
        del_email: function () {                            
            profile_option.ajax.del_email();                  
        },     
        subscr: function () {  
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
}  


    
// -- Обратная связь ---
var report = {    
         
    is_report:  0,   
        
    init: function () 
    {     
        $('#send_question').click( function () { report.show_quest() });
        $('#send_report').click( function () { report.show_report() }); 
        $('#send_reset').click( function () { report.hide() });      
        $('#report_text').unbind('click');      
                                        
        $('#hint_close').click( function () { report.hint_hide() }); 
    } ,

    show: function () 
    {                                 
        $('#report_send').off('click'); 
        $('#report_block').show('blind');                           
    } ,

    hide: function () 
    {             
        $('#report_block').hide('blind');                            
    } ,

    show_quest: function () 
    {                
        report.show();                   
        $('#report_send').val('Отправить вопрос'); 
        $('#report_send').on('click',report.post_quest);                                      
    } ,

    show_report: function () 
    {                                 
        report.show();     
        $('#report_send').val('Отправить отзыв');  
        $('#report_send').on('click',report.post_report);                                         
    } ,

    hint_show: function () 
    {               
        $("#hint_block").show('blind');                                           
    } ,

    hint_hide: function () 
    {                      
        $("#hint_block").hide('fade');                                       
    } ,
     
    post_quest: function ()
    {        
        report.hide();
        var text = $('#report_text').val();

        $.post
        (
            "/mailer/post/", 
            {
                mess: text, 
                id:   10336,   
                hash: hash
             },  
             report.on_post
         );  
        
         report.hint_show(); 
        
    } ,
     
    post_report: function ()
    {        
        report.hide();
        var text = $('#report_text').val();

        $.post
        (
            "/details.php?reviews", 
            {
                text_reviews: text, 
                hash: hash
             } 
        );  
       
        report.hint_show();
        $('#report_text').val(''); 
        
    } ,
     
    on_post: function (data)
    {                                // alert (data) 
        if( !data ) return 0;  
        var mess = JSON.parse( data );  
        
        if( mess.error == 'reload' ) 
        {  
            location.href = '/10336?text=' + encodeURIComponent($('#report_text').val());
        }
        $('#report_text').val(''); 
        
    }   

} 
 


// -- Слайдер, главная ---
var slider = {

    timer: null,
    context: 0,
    next: 0,

    init: function ()
    {
        if(!$('div').is('#top_intro_info_block'))
            return null;

        $('#top_intro_info_block').on('mouseover',slider.stop);
        $('#top_intro_info_block').on('mouseout',slider.start);

        // Предзагрузка картинок
        setInterval(function()
        {
            var nn = ( slider.next + 1 < 5 ) ? slider.next + 1 : 0;
            let a1 = new Image;
            a1.src = "/img/board/top_intro_info_" + nn + ".jpg";
        }, 10000);

    } ,

    slide: function (num,st)
    {
        var top_intro_caption = []
        var top_intro_context = []
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

        if( num > 4 ) num = 0;
        for (var i = 0; i<5; i++)
        {
            $('#board_img_'+i).removeClass('show');
            $('#board_img_'+i).attr('src','');
        }

        $('#board_img_' + num).addClass('show active');
        $('#board_img_' + num).attr('src','/img/board/top_intro_info_'+num+'.jpg');

        if (slider.context)
        {
            $('#top_intro_info_block_caption').text(top_intro_caption[num]);
            $('#top_intro_info_block_context').text(top_intro_context[num]);
        }

        slider.next = num
    } ,

    start: function ()
    {
        slider.timer = setInterval( function(){ slider.slide(++slider.next,0)}, 20000);
    } ,

    stop: function ()
    {
        clearTimeout(slider.timer);
    }


}


  
// -- Города, подсказки, поиск названия ---
var city_suggest = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function () 
    {                                          
        if (!$('.city_suggest').length)
            return null;
        
        $('.city_suggest').each( function (i,elem) 
        {   
            elem = $(elem);
            if (!elem.data('active'))
            {               
                elem.on('mouseover', city_suggest.enabled);
                elem.on('blur', city_suggest.blur);   
                elem.on('keyup', city_suggest.ajax_load);
                elem.attr('autocomplete','off');
                elem.wrap($('<div class="suggest_wrap">'));    
                elem.parent().append($('<div class="small_loader">')); 
                elem.parent().append($('<div class="suggest_block">'));  /**/
                elem.data('active',1) 
            }               
        });                                 
    } ,

    enabled: function () 
    {                                    
        if (!$(this).data('click'))
        {                              
            $(this).on('click', city_suggest.ajax_load ); 
            $(this).data('click',1);
        }                        
    } ,

    ajax_load: function (elem) 
    {                                // alert ($(this).val()); return false //  data('num')
        //if (!elem) elem = this;       
        city_suggest.active_elem = $(this);  
        var city = city_suggest.active_elem.val();    
        $.get('/town/suggest/', { q: city, hash: hash }, city_suggest.on_load); 
        /* */                              
    } ,

    on_load: function (data) 
    {                                      
        if (data) { 
            var mess = JSON.parse(data);     
            if (mess.cities) {        
                city_suggest.hide_suggest();
                city_suggest.show_suggest(mess.cities); 
            } 
        }                                 
    } ,

    blur: function () 
    {                                 
        $('.suggest_block').hide('fade');                                
    } , 

    hide_suggest: function () 
    {                                
        $('.suggest_block').empty(); 
        $('.suggest_block').hide();                                
    } , 

    show_suggest: function (cities) 
    {                                  
        var block_line = '';
        var block_this = city_suggest.active_elem.parent();  
        for (var i = 0; i < cities.length; i++) 
        { 
            if (!cities[i])
                continue; 
                
            block_line = $('<div class="suggest_line" data-city="'+cities[i]+'">').text(cities[i]);
            block_line.on('click',city_suggest.print);
            
            $('.suggest_block',block_this).append(block_line); 
        }   
                               
        if ($('.suggest_line',block_this).length)   
            $('.suggest_block',block_this).show();                          
    } , 
    
    print: function () 
    {                                 
        city_suggest.active_elem.val($(this).data('city')); 
        city_suggest.hide_suggest();                                
    }   
        
} 
 


// -- Имена подсказки, поиск ---
var name_suggest = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function () {                                          
        if (!$('.name_suggest').length)
            return null;
        
        $('.name_suggest').each( function (i,elem) {   
            elem = $(elem);
            if (!elem.data('active')) {               
                elem.on('mouseover', name_suggest.enabled);
                elem.on('blur', name_suggest.blur);   
                elem.on('keyup', name_suggest.ajax_load);
                elem.attr('autocomplete','off');
                elem.wrap($('<div class="suggest_wrap">'));    
                elem.parent().append($('<div class="small_loader">')); 
                elem.parent().append($('<div class="suggest_block">'));  /**/
                elem.data('active',1) 
            }               
        });                                  
    } ,

    enabled: function () {                                    
        if (!$(this).data('click')) {                              
            $(this).on('click', name_suggest.ajax_load ); 
            $(this).data('click',1);
        }                       
    } ,

    ajax_load: function (elem) 
    {                                 //alert ($(this).val()); //return    data('num')
        //if (!elem) elem = this;       
        name_suggest.active_elem = $(this);  
        var name = name_suggest.active_elem.val();    
        $.post('/ajax/name.php', { name: name, hash: hash }, name_suggest.on_load); 
        /* */                              
    } ,

    on_load: function (data) {                                    
        if (data) { 
            var mess = JSON.parse(data);  
            if (mess.names) {   
                name_suggest.hide_suggest();
                name_suggest.show_suggest(mess.names); 
            } 
        }                                 
    } ,

    blur: function () {                                 
        $('.suggest_block').hide('fade');                                
    } , 

    hide_suggest: function () {                                
        $('.suggest_block').empty(); 
        $('.suggest_block').hide();                                
    } , 

    show_suggest: function (names) {                                  
        var block_line = '';
        var block_this = name_suggest.active_elem.parent();  
        for (var i = 0; i < names.length; i++) { 
            if (!names[i])
                continue;  
            block_line = $('<div class="suggest_line" data-name="'+names[i]+'">').text(names[i]);
            block_line.on('click',name_suggest.print); 
            $('.suggest_block',block_this).append(block_line); 
        }   
                               
        if ($('.suggest_line',block_this).length)   
            $('.suggest_block',block_this).show();                          
    } , 
    
    print: function () {                                 
        name_suggest.active_elem.val($(this).data('name')); 
        name_suggest.hide_suggest();                                
    }      
} 


      
// -- Таги подсказки, поиск ---
var tag_suggest = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function () {                                          
        if (!$('.tag_suggest').length)
            return null; 
        $('.tag_suggest').each(function (i,elem) {   
            elem = $(elem);
            if (!elem.data('active')) {               
                elem.on('mouseover', tag_suggest.enabled);
                elem.on('blur', tag_suggest.blur);   
                elem.on('keyup', tag_suggest.ajax_load);
                elem.attr('autocomplete','off');
                elem.wrap($('<div class="suggest_wrap">'));    
                elem.parent().append($('<div class="small_loader">')); 
                elem.parent().append($('<div class="suggest_block">'));  /**/
                elem.data('active',1) 
            }               
        });                                  
    }, 
    enabled: function () {                                    
        if (!$(this).data('click')) {                              
            $(this).on('click', tag_suggest.ajax_load ); 
            $(this).data('click',1);
        }                       
    }, 
    ajax_load: function (elem) {                                    
        tag_suggest.active_elem = $(this);  
        var tag = tag_suggest.active_elem.val();   
        $.post('/tag/suggest/', { tag: tag, hash: hash }, tag_suggest.on_load);                            
    }, 
    on_load: function (data) { 
        tag_suggest.hide_suggest();     
        data = json.parse(data);                           
        if (data.tags.length > 0) {  
            tag_suggest.show_suggest(data.tags); 
        }                                 
    }, 
    blur: function () {                                 
        $('.suggest_block').hide('fade');                                
    },  
    hide_suggest: function () {                                
        $('.suggest_block').empty(); 
        $('.suggest_block').hide();                                
    },  
    show_suggest: function (tags) {                                  
        var block_line = '';
        var block_this = tag_suggest.active_elem.parent();  
        for (var i = 0; i < tags.length; i++) {  
            block_line = $('<div class="suggest_line" data-tag="'+tags[i]+'">').text(tags[i]);
            block_line.on('click',tag_suggest.print); 
            $('.suggest_block',block_this).append(block_line); 
        }               
        if ($('.suggest_line',block_this).length)   
            $('.suggest_block',block_this).show();                          
    } , 
    
    print: function () {                                 
        tag_suggest.active_elem.val($(this).data('tag'));    
        tag_suggest.hide_suggest();                                
    }      
} 



var user_menu = { init: function () {},
    ajax: {},
    action: {sets: {search: function () { },contact: function () {}}},
    option: {act: { }, se: function () {}}
}


      
var user_tag = { 
                    
    list: [],
    idls: [], 
    sync:  0, 
    count: 0,
  
    init: function () {                                           
        user_tag.list  = storage.array.load('user_tag_list'); 
        user_tag.sync  = storage.load('sync_taglist');     
        user_tag.count = storage.load('user_tag_count');          
    },        
    action: {    
        store: function () {                             
            storage.array.save('user_tag_list',user_tag.list);
            storage.save('user_tag_count',user_tag.count); 
            storage.save('sync_taglist',user_tag.sync);                 
        },    
        ids: function () {    
            user_tag.idls = [];               
            for (var i = 0; i < user_tag.list.length; i++) {
                if (user_tag.list[i].id)          
                    user_tag.idls.push(user_tag.list[i].id);
            }                                                
            return user_tag.idls;              
        }                      
    }, 
    option: {                                  
        set_count: function () {                     
            if (user_tag.list.length)
                $('#user_desire_count').text(user_tag.list.length); 
        }
    }     
}          



// -- Информация о пользователе ---
var userinfo = {

    data: {
        uid:      0,
        sex:      0,
        age:      0,
        name:     '',
        city:     '',
        city_id:  0,
        verify:   0,
        name_mod: 0,
        apromt:   0,
        daily:    0,

        town:     '',
        who:      0,
        years_up: 0,
        years_to: 0,
        virt:     0,
        close:    0,

        dating:   '',
        setting:  0,
        assist:   0,
        intim:    0,

        second:   0,
        time:     0,
        email:    ''
    },

    init: function () {
        userinfo.ajax.load();
    } ,
    ajax: {
        load: function (option) {
            $.get( '/sync/sess/', userinfo.ajax.on_load);
        } ,
        on_load: function (data) {           // alert(userinfo.name)
            data = json.parse(data);
            if (data && data.uid) {
                userinfo.data = data;
                userinfo.action.set_data(data);
                master_info.init();
            } else {
                storage.save('auth',0);
                user_menu.option.act.show_reg();
                userinfo.action.set_string();
            }
        } ,
        save: {
            sex: function (func) {
                $.post('/option/sex/', { sex: userinfo.data.sex }, func);
            } ,
            age: function (func) {
                $.post('/option/age/', { age: userinfo.data.age }, func);
            } ,
            name: function (func) {
                $.post('/option/name/', { name: userinfo.data.name }, func);
            } ,
            city: function (func) {
                $.post('/option/city/', { city: userinfo.data.city }, func);
            }
        }
    } ,
    action: {
        set_data: function (data) {
            storage.save('auth',data.uid);

            user_menu.option.act.show_opt();
            user_menu.action.sets.search();

            userinfo.action.set_sex();
            userinfo.action.set_age();
            userinfo.action.set_name();
            userinfo.action.set_city();

            userinfo.action.set_string(); /**/
        } ,
        set_name: function () {
            if (userinfo.data.name && userinfo.data.name.length > 2) {
                $('.user_name_option').text(userinfo.data.name);
                $('.name_suggest').val(userinfo.data.name);
            }
            userinfo.action.set_string();
        } ,
        set_age: function (say) {
            if (userinfo.data.age > 0)
                $('.user_age_option').text(userinfo.data.age);
            if (say)
                $('.user_age_say').text(say);
            userinfo.action.set_string();
        } ,
        set_city: function () {
            if (userinfo.data.city && userinfo.data.city.length > 3) {
                $('.user_city_option').text(userinfo.data.city);
                $('.city_suggest').val(userinfo.data.city);
            }
            //userinfo.data.city_id = city['city_id'];
            //userinfo.data.verify  = city['verify'];
            userinfo.action.set_string();
        } ,
        set_sex: function () {
            var say;
            if (userinfo.data.sex == 0) {
                say = 'Парень или девушка';
            } else
            if (userinfo.data.sex == 1) {
                say = 'Парень';
            } else
            if (userinfo.data.sex == 2) {
                say = 'Девушка';
            }
            $('.user_sex_option').text(say);
        } ,
        set_string: function () {
            var str = userinfo.data.name ? userinfo.data.name : '';
            if (!userinfo.data.name) {
                if (userinfo.data.sex == 1) {
                    str = 'Парень';
                } else
                if (userinfo.data.sex == 2) {
                    str = 'Девушка';
                }
            }

            var cityLen = userinfo.data.city ? userinfo.data.city.length : 0;
            if (userinfo.data.age > 10 || cityLen > 3) {
                str = str + ', ';
            }
            if (userinfo.data.age > 10)
                str = str + userinfo.data.age + ' ';
            if ((20 - str.length - cityLen) >= 0) {
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
        } ,
        set_email: function () {
            $('.option_email_value').val(userinfo.data.email);
            $('.profile_email_value').text(userinfo.data.email);
        }

    }
}

