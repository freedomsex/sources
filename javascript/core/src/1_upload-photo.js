
Vue.http.options.emulateJSON = true;

var UploadPhoto = Vue.extend({
    template: "#upload-photo",
    data() {
        return {
            photos: [],
        }
        // file: {
        //     data: null,
        //     name: '',
        //     size: 0
        // }
    },
    methods: {
        loadPhoto() {
            Vue.http.headers.common['Authorization'] = 'Bearer ' + get_cookie('jwt');
            this.$http.get('http://'+api_photo+'/api/v1/users/'+uid+'/photos?hash='+hash).then(function (response) {
                console.log(response.body);
                if (response.body.photos) {
                    this.photos = response.body.photos;
                }
            });
            if (this.user) {

            }
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
                data.url = 'http://'+api_photo+'/api/v1/users/'+uid+'/photos?jwt=' + get_cookie('jwt');
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