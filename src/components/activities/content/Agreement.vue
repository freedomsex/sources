<script>
import showdown from 'showdown';
import ContentActivity from './ContentActivity';

const Converter = new showdown.Converter();

export default {
  extends: ContentActivity,
  mounted() {
    this.title = 'Пользовательское соглашение';
    this.load('/docs/de-jure/agreement.md');
  },
  methods: {
    load() {
      const url = '/docs/de-jure/agreement.md';
      fetch(url)
        .then(response => response.text())
        .then((content) => {
          this.onLoad(content);
        }).catch(() => {
          this.error = true;
        });
    },
    onLoad(content) {
      this.loader = false;
      this.text = Converter.makeHtml(content);
    },
  },
};
</script>
