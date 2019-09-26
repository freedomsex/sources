<script>
// TODO: remove support from proj
import ContactDialog from './ContactDialog';

export default {
  extends: ContactDialog,
  computed: {
    initial: () => false,
    simple: () => false,
    contacts() {
      return this.$store.state.offers.list;
    },
  },
  methods: {
    load() {
      this.$service.run('offers/load', this.next).then(() => {
        this.loaded();
      });
      this.amount = this.count;
      this.hope();
    },
    next() {
      this.$service.run('offers/next', this.offset).then(() => {
        this.loaded();
      });
      this.reset();
    },
    remove(index) {
      this.$service.run('offers/delete', index);
    },
    splice(index) {
      this.$service.run('offers/delete', index);
    },
  },
};
</script>
