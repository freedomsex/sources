
var profile_old = new Vue({
    el: '#profile-caption__old',
    data: {
        alert:   0,
        warning: 0,
        normal:  0,
    },
    mounted: function () {
        var day = 86400; console.log(this.old);
        if (this.old < day / 2) {
            this.alert = 1;
        } else
        if (this.old < day * 3) {
            this.warning = 1;
        } else
        if (this.old < day * 30) {
            this.normal = 1;
        }
    },
    methods: {
        show: function () {
            console.log(this.num);
        },
    },
    computed: {
        old: function () {
            return this.$el.attributes['data-old'].value;
        },
    }
});


var profile_last = new Vue({
    el: '#profile-info__old',
    data: {
        alert:   0,
        warning: 0,
        normal:  0,
    },
    mounted: function () {
        var day = 86400; console.log(this.old);
        if (this.old < 777) {
            this.alert = 1;
        } else
        if (this.old < day) {
            this.warning = 1;
        } else
        if (this.old < day * 3) {
            this.normal = 1;
        }
    },
    methods: {
        show: function () {
            console.log(this.num);
        },
    },
    computed: {
        old: function () {
            return 86500 *0.005;
            return this.$el.attributes['data-old'].value;
        },
    }
});