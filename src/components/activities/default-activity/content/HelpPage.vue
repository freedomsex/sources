<script>
import ContentActivity from './ContentActivity';

export default {
  extends: ContentActivity,
  data() {
    return {
      enableReview: true,
    };
  },
  mounted() {
    this.title = 'Справка';
    this.load(`/content/help/${this.link}`);
  },
  computed: {
    reviewsUrl() {
      return `/docs/blog/rev/${this.link}.json`;
    },
  },
  methods: {
    show(index) {
      this.preview = this.galery[index];
    },
  },
};
</script>
