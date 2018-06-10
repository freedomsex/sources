<script>
import QuickDialog from './QuickDialog';

export default {
  extends: QuickDialog,
  computed: {
    reply: () => true,
  },
  methods: {
    sended() {
      this.$emit('sended', this.index);
      this.close();
    },
    action() {},
  },
};
</script>
