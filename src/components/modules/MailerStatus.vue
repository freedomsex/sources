<script>
import Snackbar from '~widgets/Snackbar';

export default {
  props: [],
  data() {
    return {
      attempt: 0,
      snacbar: {
        message: false,
        contact: false,
      },
    };
  },
  mounted() {
    this.loadStatus();
  },
  computed: {
    message() {
      const {status} = this.$store.state.intimates;
      return status == false || status < 8;
    },
    contact() {
      const {status} = this.$store.state.initials;
      return status == false || status < 8;
    },
    needed() {
      return !this.message || !this.contact;
    },
  },
  methods: {
    check() {
      if (this.needed && this.$store.state.authorized) {
        this.$api.res('mailer/status', 'raw').load().then(({data}) => {
          this.handle(data);
        }).catch(() => {
          this.attempt += 1;
        });
      }
    },
    handle({message, contact}) {
      this.intimate(message);
      this.initial(contact);
      this.attempt = 0;
    },
    loadStatus() {
      const {uid} = this.$store.state.token;
      let delay = !uid ? 2 : 15;
      if (uid) {
        this.check();
      }
      if (this.attempt > 10) {
        delay = 20;
      } else if (this.attempt > 4) {
        delay = 5;
      } else if (this.attempt > 2) {
        delay = 3;
      }
      setTimeout(() => {
        this.loadStatus();
      }, delay * 1000);
    },

    intimate(received) {
      this.$store.commit('intimates/status', received);
      const {status, notified} = this.$store.state.intimates;
      const notify = (!notified || status != received);
      if (received == 1 && notify && this.message) {
        this.$store.commit('intimates/notifi', true);
        this.snacbar.message = true;
      }
      // this.snacbar.message = true;
    },

    initial(received) {
      this.$store.commit('initials/status', received);
      const {status, notified} = this.$store.state.initials;
      const notify = (!notified || status != received);
      if (received == 1 && notify && this.contact && !this.message) {
        this.$store.commit('initials/notifi', true);
        this.snacbar.contact = true;
      }
    },
  },
  components: {
    Snackbar,
  },
};
</script>

<template>
  <div>
    <Snackbar v-if="snacbar.message"
     :button="true" yesText="Смотреть"
     @close="snacbar.message = false"
     @confirm="$router.push({name: 'intimate'})">
      Новое сообщение
    </Snackbar>
    <Snackbar v-if="snacbar.contact"
     :button="true" yesText="Смотреть"
     @close="snacbar.contact = false"
     @confirm="$router.push({name: 'initial'})">
      Новое знакомство
    </Snackbar>
  </div>
</template>
