<script>
import QuickDialog from './QuickDialog';

export default {
  extends: QuickDialog,
  created() {
    console.log('mounted QuickDialog Reply');
  },
  computed: {
    reply: () => true,
    information() {
      return this.message;
    },
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
