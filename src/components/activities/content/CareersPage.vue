<script>
import ContentActivity from './ContentActivity';

export default {
  extends: ContentActivity,
  mounted() {
    this.title = 'Работа и вакансии';
    this.load('/content/careers/ru');
  },
};
</script>
