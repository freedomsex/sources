<script>
import QuickDialog from './QuickDialog';

export default {
  extends: QuickDialog,
  computed: {
    reply: () => false,
  },
  methods: {
    action() {
      if (!this.user.city) {
        this.$router.push('wizard/city');
      } else if (!this.user.age) {
        this.$router.push('settings/account');
      }
    },
    information() {
      let result = '';
      const {human} = this.$store.state;
      const who = {2: 'парни', 1: 'девушки'};
      if (human.sex && human.sex == this.user.sex) {
        result = `Мне интересны только ${who[human.sex]}`;
      } else if (human.sex) {
        const {age} = this.user;
        if (human.up && age && human.up > age) {
          result = `Мне интересны ${who[human.sex]} в возрасте от ${human.up} лет `;
        }
        if (human.to && age && human.to < age) {
          result = `Мне интересны ${who[human.sex]} в возрасте до ${human.to} лет `;
        }
      }
      if ((human.up || human.to) && !this.user.age) {
        result = 'Укажите ваш возраст в анкете, для меня это важно';
      }
      if (human.close && this.user.city && this.user.city != human.city) {
        result = 'Мне интересно общение только в моём городе';
      }
      if (human.close && !this.user.city) {
        result = 'Укажите ваш город в анкете, для меня это важно';
      }
      return result;
    },
  },
};
</script>
