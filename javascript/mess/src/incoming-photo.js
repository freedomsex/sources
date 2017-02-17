

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
            this.$http.get('http://'+api_photo+'/api/v1/users/'+tid+'/sends?hash='+hash).then(function (response) {
                console.log(response.body);
                if (response.body.photos) {
                    this.photos = response.body.photos;
                }
            });
            if (this.user) {

            }
        },
        show: function (index) {
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
                store.commit('viewPhoto', data);
            }
            //console.log(this.photos[index].height);
        },
    }
});

$(document).ready(function() {
    incoming_photo.loadPhoto();
});