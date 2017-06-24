
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


