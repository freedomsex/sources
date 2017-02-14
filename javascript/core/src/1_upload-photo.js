
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
            this.$http.get('http://'+api_photo+'/api/v1/users/10336/photos?hash='+hash).then(function (response) {
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
            let links = this.photos[index]._links;
            if (links.origin.href) {
                OptionStaticViewer.photoView.show = true;
                OptionStaticViewer.photoView.thumb = links.thumb.href;
                OptionStaticViewer.photoView.photo = links.origin.href;
                OptionStaticViewer.photoView.height= this.photos[index].height;
            }
            //console.log(photo);
        },
    },
    mounted() {
        console.log('fileupload');
        $('#fileupload').fileupload({
            dataType: 'json',
            add(e, data) {
                data.url = 'http://'+api_photo+'/api/v1/users/10336/photos?jwt=' + get_cookie('jwt');
                data.submit();
            },
            done(e, data) {
                // $.each(data.result.files, function (index, file) {
                //   $('<p/>').text(file.name).appendTo(document.body);
                // });
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