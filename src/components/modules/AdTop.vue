
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
    console.log('cc', [this.desktop, this.width]);
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * ((max - min) + 1)) + min;
    },
  },
  computed: {
    desktop() {
      return this.width >= 700;
    },
    banner() {
      return `ad-hm-${this.random(0, 2)}.gif`;
    },
    source() {
      return `/static/img/ad/${this.banner}`;
    },
  },
};
</script>

<template>
  <div v-if="enabled">
  <!-- build:remove:dev -->
    <div class="container hidden-xs" v-if="desktop">
      <div class="row top-style" v-if="iframe">
        <iframe scrolling="no" frameborder="0" height="90" style="width:100%;min-width:70px;" src="http://tools.bongacams.com/promo.php?c=568424&type=dynamic_banner&pt=http&new_banner=0&db%5Bnew_tpl%5D=1&db%5Bwidth%5D=160&db%5Bheight%5D=90&db%5Btype%5D=live&db%5Bmodel_zone%5D=free&db%5Bheader%5D=1&db%5Bfooter%5D=footer_text_1&db%5Bmlang%5D=0&db%5Bfullscreen%5D=&db%5Bmname%5D=1&db%5Bmlink%5D=1&db%5Bmstatus%5D=1&db%5Bmsize%5D=auto&db%5Bmpad%5D=12&db%5Bmwidth%5D=60&db%5Bcolor_scheme%5D=default&db%5Bmborder%5D=solid&db%5Bmborder_color%5D=%23ffffff&db%5Bmborder_over_color%5D=%23a02239&db%5Bmshadow%5D=0&db%5Bmodels_by_geo%5D=0&db%5Bautoupdate%5D=1&db%5Btopmodels%5D=1&db%5Blanding%5D=chat&db%5Blogo_color%5D=default&db%5Bbg_color%5D=%23ff00ff&db%5Bfont_family%5D=Arial&db%5Btext_align%5D=center&db%5Btext_color%5D=%23000000&db%5Blink_color%5D=%23a02239&db%5Beffect%5D=auto&db%5Beffect_speed%5D=optimal&db%5Bmode%5D=mode1&db%5Badaptive%5D=1"></iframe>
      </div>
      <div class="row bottom-style" v-else>
        <!-- if `iframe` == false -->
      </div>
    </div>
    <div class="container visible-xs-block" v-else-if="width">
      <div class="row">
        <iframe scrolling="no" frameborder="0" height="90" style="width:100%;min-width:70px;" src="http://tools.bongacams.com/promo.php?c=568424&type=dynamic_banner&pt=http&new_banner=0&db%5Bnew_tpl%5D=1&db%5Bwidth%5D=160&db%5Bheight%5D=90&db%5Btype%5D=live&db%5Bmodel_zone%5D=free&db%5Bheader%5D=1&db%5Bfooter%5D=footer_text_1&db%5Bmlang%5D=0&db%5Bfullscreen%5D=&db%5Bmname%5D=1&db%5Bmlink%5D=1&db%5Bmstatus%5D=1&db%5Bmsize%5D=auto&db%5Bmpad%5D=12&db%5Bmwidth%5D=60&db%5Bcolor_scheme%5D=default&db%5Bmborder%5D=solid&db%5Bmborder_color%5D=%23ffffff&db%5Bmborder_over_color%5D=%23a02239&db%5Bmshadow%5D=0&db%5Bmodels_by_geo%5D=0&db%5Bautoupdate%5D=1&db%5Btopmodels%5D=1&db%5Blanding%5D=chat&db%5Blogo_color%5D=default&db%5Bbg_color%5D=%23ff00ff&db%5Bfont_family%5D=Arial&db%5Btext_align%5D=center&db%5Btext_color%5D=%23000000&db%5Blink_color%5D=%23a02239&db%5Beffect%5D=auto&db%5Beffect_speed%5D=optimal&db%5Bmode%5D=mode1&db%5Badaptive%5D=1"></iframe>
      </div>
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
