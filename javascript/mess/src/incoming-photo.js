

var incoming_photo = new Vue({
    el: '#incoming-photo',
    store,
    data: {
        photos: [],
        user:   0,
        server: null,
    },
    created: function () {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        loadPhoto() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {tid, hash}
            };
            axios.get(`http://${this.server}/api/v1/users/${uid}/sends`,config).then((response) => {
                this.photos = response.data.photos;
                //console.log(this.photos);
            }).catch((error) => {
                console.log(error);
            });
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