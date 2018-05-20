<script>
export default {
  data() {
    return {
      slide: 1,
    };
  },
};
</script>

<style lang="less">
.slider-footer {
  color: @dark-light;
  background: @white;
  margin-top: @indent-md;
  margin-bottom: @indent-md;
  &__item {
    padding-top: @indent-lg;
  }
  &__pages {
    text-align: center;
    padding-top: @indent-md;
    padding-bottom: @indent-md;
  }
  &__link {
    cursor: pointer;
    display: inline-block;
    font-size: @font-sm;
    line-height: 1;
    border-radius: 3px;
    padding: 5px 10px;
    background: @gray-dark;
    color: @white;
    &:hover {
      background: @gray-dark;
    }
    &.active {
      background: @dark;
    }
  }
}
</style>
