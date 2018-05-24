<script>
import QuickDialog from './QuickDialog';

export default {
  extends: QuickDialog,
  computed: {
    reply: () => false,
    information() {
      let result = '';
      const who = {2: 'парни', 1: 'девушки'};
      if (this.human.sex && this.human.sex == this.user.sex) {
        result = `Мне интересны только ${who[this.human.sex]}`;
      } else if (this.human.sex) {
        const {age} = this.user;
        if (this.human.up && age && this.human.up > age) {
          result = `Мне интересны ${who[this.human.sex]} в возрасте от ${this.human.up} лет `;
        }
        if (this.human.to && age && this.human.to < age) {
          result = `Мне интересны ${who[this.human.sex]} в возрасте до ${this.human.to} лет `;
        }
      }
      if ((this.human.up || this.human.to) && !this.user.age) {
        result = 'Укажите ваш возраст в анкете, для меня это важно';
      }
      if (this.human.close && this.user.city && this.user.city != this.human.city) {
        result = 'Мне интересно общение только в моём городе';
      }
      if (this.human.close && !this.user.city) {
        result = 'Укажите ваш город в анкете, для меня это важно';
      }
      return result;
    },
  },
  methods: {
    action() {
      if (!this.user.city) {
        this.$router.push('wizard/city');
      } else if (!this.user.age) {
        this.$router.push('settings/account');
      }
    },
    proxy() {
      if (this.added) {
        this.addition = true;
      } else if (this.information && !this.interests.ignore) {
        this.interests.show = true;
      } else if (this.isDirt() && !this.dirt.ignore) {
        this.dirt.show = true;
      } else if (this.isSpam() && !this.spam.ignore) {
        this.spam.show = true;
      } else {
        this.send();
      }
    },
  },
};
</script>
