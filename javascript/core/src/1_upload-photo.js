
Vue.http.options.emulateJSON = true;

var UploadPhoto = Vue.extend({
    template: "#upload-photo",
    data() {
        return {
            photos: [],
            server: null,
        }
        // file: {
        //     data: null,
        //     name: '',
        //     size: 0
        // }
    },
    created: function () {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        loadPhoto() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {hash}
            };
            axios.get(`http://${this.server}/api/v1/users/${uid}/photos`, config).then((response) => {
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
                store.commit('sendPhoto', data);
                console.log('sendPhoto');
                console.log(data);
            }
            this.close();
        },
        close() {
            this.$emit('close');
        }
    },
    mounted() {
        console.log('fileupload');
        var self = this;
        $('#fileupload').fileupload({
            dataType: 'json',
            add(e, data) {
                data.url = `http://${self.server}/api/v1/users/${uid}/photos?jwt=` + self.$store.state.apiToken;
                data.submit();
            },
            done(e, data) {
                self.preview(data.result.photo);
            }
        });
        this.loadPhoto();
    }
})

// var photo_upload = new Vue({
//   el: "#upload-photo",
//   data: {
//     files : []
//   },
//   methods: {
//     addPhoto: function(){
//       this.files.push({ name: "", size: 0});
//       this.$nextTick(function () {
//         var inputId = "upload-photo__file-" + (this.files.length-1);
//         document.getElementById(inputId).click();
//       });
//     },
//     upload: function(e){
//       var f = e.target.files[0];
//       //file.name = f.name;
//       //file.size = f.size;
//     }
//   }
// })