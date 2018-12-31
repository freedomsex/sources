
<script>
export default {
  data() {
    return {
      enabled: true,
      iframe: true,
      width: 0,
      rotation: {
        desktop: [0, 1],
      },
    };
  },
  mounted() {
    this.width = this.$el.offsetWidth;
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - (min + 1))) + min;
    },
  },
  computed: {
    regular() {
      const {uid, vip} = this.$store.state.user;
      return !uid || vip.status < 1;
    },
    desktop() {
      return true; // this.width >= 700;
    },
    banner() {
      return `ad-sc-${this.random(0, 2)}.gif`;
    },
    source() {
      return `/static/img/ad/${this.banner}`;
    },
  },
};
</script>

<template>
  <div v-if="enabled && regular">
  <!-- build:remove:dev -->
  <!-- hidden-xs -->
    <div class="container" v-if="desktop">
      <div class="row top-style" v-if="random(0, 1)">
        <iframe scrolling="no" frameborder="0" height="90" style="width:100%;min-width:70px;" src="https://promo-bc.com/promo.php?c=568424&type=dynamic_banner&new_banner=0&db%5Bwidth%5D=750&db%5Bheight%5D=90&db%5Btype%5D=live&db%5Bmodel_zone%5D=free&db%5Bheader%5D=0&db%5Bfooter%5D=none&db%5Bmlang%5D=0&db%5Bfullscreen%5D=&db%5Bmname%5D=1&db%5Bmlink%5D=0&db%5Bmstatus%5D=1&db%5Bmsize%5D=auto&db%5Bmpad%5D=2&db%5Bmwidth%5D=64&db%5Bcolor_scheme%5D=default&db%5Bmborder%5D=solid&db%5Bmborder_color%5D=%23ffffff&db%5Bmborder_over_color%5D=%23a02239&db%5Bmshadow%5D=0&db%5Bmodels_by_geo%5D=0&db%5Bautoupdate%5D=1&db%5Btopmodels%5D=1&db%5Blanding%5D=chat&db%5Blogo_color%5D=default&db%5Bbg_color%5D=%23c800ff&db%5Bfont_family%5D=Arial&db%5Btext_align%5D=center&db%5Btext_color%5D=%23000000&db%5Blink_color%5D=%23a02239&db%5Beffect%5D=auto&db%5Beffect_speed%5D=optimal&db%5Bmode%5D=mode1&db%5Badaptive%5D=1"></iframe>
      </div>
      <div class="row bottom-style" v-else>
        <a href="//spygasm.com/track?c=615554" rel="nofollow" target="_blank" >
          <img :src="source" style="width: 100%;">
        </a>
      </div>
    </div>
    <div class="container visible-xs-block" v-else-if="width">

    </div>
  <!-- /build -->
  </div>
</template>

<style lang="less" scoped>
.top-style {
  border-bottom: 2px solid #e5e5e5;
  text-align: center;
  line-height: 0;
}
.bottom-style {
  border-bottom: 2px solid #e5e5e5;
}
</style>
