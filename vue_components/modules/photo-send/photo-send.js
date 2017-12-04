const PhotoViewer = Vue.component('photo-send', {
    props: ['photo', 'options'],
    data() {
        return {
            remove: false,
        }
    },
    created: function () {
        this.server = this.$store.state.photoServer;
    },
    computed: {
        uid() {
            return this.$store.state.user.uid;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        removePhoto() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                //params: { uid: this.uid, hash }
            };
            axios.delete(`http://${this.server}/api/v1/users/${this.uid}/photos/${this.photo.alias}.jpg`, config).then((response) => {
                this.$emit('removed');
                this.close();
                //console.log(this.photos);
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    template: '#photo-send',
});
