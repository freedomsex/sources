Vue.component('photo-view', {
  template: '<div>Пользовательский компонент!</div>'
})


var incoming_photo = new Vue({
    el: '#incoming-photo',
    data: {
        photos: [],
        user:   0,
        jwt:    '',
    },
    mounted: function () {
        this.jwt = get_cookie('jwt');
    },
    methods: {
        loadPhoto: function () {

            Vue.http.headers.common['Authorization'] = 'Bearer ' + this.jwt;
            this.$http.get('http://'+api_photo+'/api/v1/users/10336/photos?hash='+hash).then(function (response) {
                console.log(response.body);
                if (response.body.photos) {
                    this.photos = response.body.photos;
                }
            });
            if (this.user) {

            }
        },
        show: function (event) {
            this.user = false;
        },
    }
});

$(document).ready(function() {
    incoming_photo.loadPhoto();
});