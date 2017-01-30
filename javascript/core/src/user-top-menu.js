Vue.component('abuse-form', {
    template: '#abuse-form',
    props: [
        'show'
    ],

});

var menu_user_top = new Vue({
    el: '#menu-user-top',
    store,
    data: {
        auth: 1
    },
    mounted() {
        //console.log(abuse_form.mess());
    },
    methods: {
        showButton() {
            if (!this.isFormShow) {
                this.isButtonShow = true;
            }
        },
    },
    computed: Vuex.mapState({
        user: state => state.user.data,
        userString(state) {
            let str = this.user.name;
            // TODO: переделать без возможности отображения без имени
            if (!str) {
                if (this.user.sex == 1) {
                    str = 'Парень';
                } else
                if (this.user.sex == 2) {
                    str = 'Девушка';
                }
            }
            //
            if (this.user.age > 10 || this.user.city.length > 3) {
                str = str + ', ';
            }
            if (this.user.age > 10) {
                str = str + this.user.age + ' ';
            }
            if ((20 - str.length - this.user.city.length) >= 0) {
                str = str + this.user.city;
            }
            if (!str) {
                str = 'Кто вы?';
            }
            ls.save('user_string_print', str);
            return str;
        },
        searchString(state) {
            let str = '/index.php?view=simple&town='+this.user.city+
                '&years_up='+this.user.up+'&years_to='+this.user.to+''+
                '&who='+this.user.who+'';
            return str;
        }
    })
});