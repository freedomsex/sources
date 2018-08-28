<script>
import ContentActivity from './ContentActivity';

export default {
  extends: ContentActivity,
  mounted() {
    this.title = 'Правила сообщества';
    this.load('/content/rules/ru');
  },
};
</script>
