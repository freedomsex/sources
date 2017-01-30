
var abuse_list = new Vue({
    el: '#search-form',
    store,
    mounted: function () {
        //console.log(abuse_form.mess());
    },
    methods: {
        showButton: function () {
            if (!this.isFormShow) {
                this.isButtonShow = true;
            }
        },
    },
    computed: Vuex.mapState({
        user: state => state.user.data,
        up() {
            console.log(this.user.up+' *up8');
            return this.user.up ? this.user.up : '';
        },
        to() {
            return this.user.to ? this.user.to : '';
        },
        more(state) {
            if (!this.user.sex || this.user.sex == 1) {
                return '1';
            } else {
                return '2';
            }
        },
    })
});