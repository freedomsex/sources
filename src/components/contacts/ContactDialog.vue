<script>
import api from '~config/api';

export default {
  props: ['quick'],
  data() {
    return {
      response: false,
      slow: false,
      error: false,
      amount: 0,
      offset: 0,
      batch: 10,
      max: 100,
      dialog: false,
      modals: {
        acceptSettings: false,
      },
    };
  },
  computed: {
    showLoader() {
      return this.slow && !this.response;
    },
    showAlert() {
      return this.error && this.response;
    },
    showHint() {
      return this.count < 1;
    },
    count() {
      const result = this.contacts ? this.contacts.length : 0;
      return result;
    },
    more() {
      const max = this.offset <= this.max - this.batch;
      const min = this.amount >= this.batch;
      return min && max;
    },
  },
  methods: {
    close() {
      // this.$emit('close');
      this.$emit('close');
    },
    reset() {
      this.response = false;
      this.error = false;
      this.slow = false;
    },
    hope() {
      const sec = 2;
      setTimeout(() => { this.slow = true; }, sec * 1000);
      this.$Progress.start();
      this.reset();
    },
    loaded() {
      // this.received = result ? result.length : 0;
      // if (this.received) {
      //     this.contacts = _.union(this.contacts, result);
      // }
      this.offset += this.batch;
      this.amount = this.count;
      this.response = true;
      this.slow = false;
      this.$Progress.finish();
    },

    failed(error) {
      this.error = error;
      this.$Progress.fail();
    },

    bun(index) {
      const item = this.contacts[index];
      console.log('bun', item);
      api.bun.send({
        id: item.message.mess_id,
        tid: item.human_id,
        // text: this.item.message,
        // token: 'super secret token'
      });
      this.remove(index);
    },
    splice(index) {
      this.$store.commit('delete', index);
    },
    // error(error) {
    //   this.response = true;
    //   this.error = true;
    //   console.log(error);
    // },
    dialogOpen(data) {
      this.dialog = data.id;
      this.title = data.title;
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style lang="less">
#contact-section {
  border-top: 1px solid @gray;
}

.contact-section {
  &__item {
    .link_simple;
    padding: @indent-sm @indent-sm;
    font-size: 14px;
  }
}

.contact-list {
  padding: 0 0 @indent-xs;
  &__next {
    text-align: center;
    margin: 10px 0 15px;
  }
}

.message-input {
  min-height: 40px;
  table {
    position: relative;
  }
  margin: 0 @indent-md @indent-md;
}

.message-input__texarea {
  overflow: auto;
  min-height: 36px;
  padding: 10px 5px;
  font-size: 14px;
  margin: 0 0 10px;
  overflow-y: hidden;
  resize: vertical;
  line-height: 1;
}

.message-input__button() {
  position: absolute;
  bottom: 1px;
  display: block;
  width: 36px;
  height: 36px;
  margin: 2px;
  opacity: 0.5;
  cursor: pointer;
}

.message-input__button-account {
  .message-input__button();
  background-image: url("~static/img/icon/account.png");
}

.message-input__button-send {
  .message-input__button();
  background-image: url("~static/img/icon/send.png");
}
</style>
