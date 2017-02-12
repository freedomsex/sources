
$('#fileupload').fileupload({
  dataType: 'json',
  add: function (e, data) {
    data.url = 'http://'+api_photo+'/api/v1/users/10336/photos.html?jwt=' + get_cookie('jwt');
    data.submit();
  },
  done: function (e, data) {
    // $.each(data.result.files, function (index, file) {
    //   $('<p/>').text(file.name).appendTo(document.body);
    // });
  }
});


Vue.http.options.emulateJSON = true;

var photo_upload = new Vue({
  el: "#upload-photo",
  data: {
    file: {
      data: null,
      name: '',
      size: 0
    }

  },
  methods: {
    upload: function(e){
      var data = e.target.files[0];
      this.file.data = data;
      this.file.name = data.name;
      this.file.size = data.size;
      Vue.http.headers.common['Authorization'] = 'Bearer ' + get_cookie('jwt');
      this.$http.post('http://'+api_photo+'/api/v1/users/10336/photos.html', e.target.files, {
         emulateJSON: true
      }).then(function (response) {
        console.log('upl');
      }).then(function () {
        console.log('err');
      });
    }
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