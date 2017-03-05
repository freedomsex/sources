
Vue.component('initial-dialog', {
    data() {
        return {
            contacts: [],
            response: null,
            slow: false,
            next: 0,
            batch: 10,
            received: 0,
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        load() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {hash}
            };
            axios.get(`/contact/list/initial/`, config).then((response) => {
                let result = response.data;
                this.received = result ? result.length : 0;
                if (this.received) {
                    this.contacts = _.union(this.contacts, result);
                }
                this.next += this.batch;
                this.response = 200;
                this.slow = false;
            }).catch((error) => {
                console.log(error);
            });
            setTimeout(() => this.slow = true, 3000);
        },
    },
    mounted() {
        this.load();
    },
    template: '#contact-dialog'
});

Vue.component('sends-dialog', {
    data() {
        return {
            contacts: [],
            response: null,
            slow: false,
            next: 0,
            batch: 10,
            received: 0,
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        load() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {hash}
            };
            axios.get(`/contact/list/sends/`, config).then((response) => {
                let result = response.data;
                this.received = result ? result.length : 0;
                if (this.received) {
                    this.contacts = _.union(this.contacts, result);
                }
                this.next += this.batch;
                this.response = 200;
                this.slow = false;
            }).catch((error) => {
                console.log(error);
            });
            setTimeout(() => this.slow = true, 3000);
        },
    },
    mounted() {
        this.load();
    },
    template: '#contact-dialog'
});

Vue.component('photo-view', {
    props: [
        'photo',
        'thumb',
        'width',
        'height',
        'bypass'
    ],
    methods: {
        approve() {
            store.commit('approveViewPhoto');
        }
    },
    computed: Vuex.mapState({
        accept(state) {
            return (state.accepts.photo || this.bypass) ? true : false;
        }
    }),
    template: '#photo-view'
});

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

Vue.component('upload-dialog', {
    template: '#upload-dialog',
    data() {
        return {
            photos: [],
            server: null,
        }
        // file: {
        //     data: null,
        //     name: '',
        //     size: 0
        // }
    },
    created: function () {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        loadPhoto() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {hash}
            };
            axios.get(`http://${this.server}/api/v1/users/${uid}/photos`, config).then((response) => {
                let result = response.data.photos;
                if (result && result.length) {
                    this.photos = response.data.photos;
                }
                //console.log(this.photos);
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
                store.commit('sendPhoto', data);
                //console.log('sendPhoto');
                //console.log(data);
            }
            this.close();
        },
        close() {
            this.$emit('close');
        }
    },
    mounted() {
        console.log('fileupload');
        var self = this;
        $('#fileupload').fileupload({
            dataType: 'json',
            add(e, data) {
                data.url = `http://${self.server}/api/v1/users/${uid}/photos?jwt=` + self.$store.state.apiToken;
                data.submit();
            },
            done(e, data) {
                self.preview(data.result.photo);
            }
        });
        this.loadPhoto();
    }
})



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

var OptionStaticViewer = new Vue({
    el: '#option-static__viewer',
    store,
    computed: Vuex.mapState({
        view: state => state.optionStatic.view
    }),
    methods: {
        close() {
            store.commit('optionDialog', false);
        }
    }
});












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

