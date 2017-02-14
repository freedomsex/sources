

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
        show: function (index) {
            let links = this.photos[index]._links;
            if (links.origin.href) {
                OptionStaticViewer.photoView.show = true;
                OptionStaticViewer.photoView.thumb = links.thumb.href;
                OptionStaticViewer.photoView.photo = links.origin.href;
                OptionStaticViewer.photoView.height= this.photos[index].height;
            }
            //console.log(this.photos[index].height);
        },
    }
});

$(document).ready(function() {
    incoming_photo.loadPhoto();
});