<script>
// TODO: REMOVE ???
export default {
  data() {
    return {
      photos: [],
      server: null,
    };
  },
  created() {
    this.server = this.$store.state.photoServer;
  },
  methods: {
    show(index) {
      this.preview(this.photos[index]);
    },
    preview(photo) {
      const {_links: links} = photo;
      if (links.origin.href) {
        const data = {
          photo: links.origin.href,
          thumb: links.thumb.href,
          alias: photo.alias,
          height: photo.height,
          width: photo.width,
        };
        this.$store.commit('sendPhoto', data);
        // console.log('sendPhoto');
        // console.log(data);
      }
      this.$emit('close');
    },
  },
};
</script>
