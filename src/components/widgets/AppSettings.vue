<script>
export default {
  props: [],
  data: () => ({
    open: false,
  }),
  methods: {
    toggle() {
      this.$root.redirectHome();
      // this.open = this.open != true;
    },
  },
};
</script>

<template>
  <div class="menu-user__logo" @click="toggle">
    <div id="home_page" class="dropdown open">
      <img src="~static/img/logo.png"
        style="width: 27px; height: 20px; border-width: 0;"
        border="0" >
        <ul class="dropdown-menu" v-show="open">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
    </div>
  </div>
</template>

<style lang="less">
.menu-user__logo {
  cursor: pointer;
}
// .dropdown-menu {
//   display: inline-block;
//   > li > a {
//     padding-left: 12px;
//   }
// }
</style>
