<script>
import Vuex from 'vuex';

export default {
  data() {
    return {
      //
    };
  },
  computed: Vuex.mapState({
    range(state) {
      const {up} = state.user;
      const {to} = state.user;
      let range = '';
      if (up && to) {
        range = `${up} - ${to}`;
      } else if (up && !to) {
        range = ` от ${up}`;
      } else if (!up && to) {
        range = ` до ${to}`;
      }
      return range ? ` в возрасте ${range} лет ` : '';
    },
    who(state) {
      const {sex} = state.user;
      let who = ' знакомства с кем угодно ';
      if (sex) {
        who = sex == 2 ? ' знакомства с парнем ' : ' знакомства с девушкой ';
      }
      return who;
    },
    say(state) {
      const where = state.user.city ? '' : ', из любого города ';
      return this.who + this.range + where;
    },
    desires() {
      const count = this.$store.state.desires.list.length;
      return count || 0;
    },
  }),
  mounted() {},
};
</script>

<style lang="less">
#search-wizard {
  padding: @indent-sm @indent-md;
  text-align: center;
  margin-top: 0px;
  .material-icons {
    vertical-align: middle;
    position: relative;
    top: -3px;
  }
  color: @dark-light;
  min-height: 30px;
  border-bottom: 2px solid @gray-light;

  .clearfix {
    margin-bottom: @indent-xs;
  }
}
</style>
