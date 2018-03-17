
const PhotoSettings = Vue.component('photo-settings', {
    extends: ClosedActivity,
    props: ['humanId'],
    data() {
        return {
            photos: [],
            photoAlert: false,
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
            },
            fail() {
                self.failed();
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
        },
        failed() {
            this.photoAlert = true;
        }
    },
    template: '#photo-settings',
});
