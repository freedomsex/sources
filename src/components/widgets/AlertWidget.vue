<script>
export default {
  data() {
    return {
      compact: false,
    };
  },
  mounted() {
    // this.compact = true;
  },
};
</script>

<style lang="less">

.alert-widget {
  .widget();
  background: #dc4e41;
  color: @white;
  cursor: pointer;
  &__wrapper {
    &.compact {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 20px;
      .additional {
        margin-top: 15px;
      }
    }
    .additional {
      margin-top: 10px;
      padding: 10px 10px;
      color: @dark;
      background: @white;
      a {
        color: @dark-light;
        font-style: italic;
        text-decoration: underline;
        &:hover {
          color: @gray-dark;
        }
      }
    }
  }
  a {
    color: @light;
    font-style: italic;
    text-decoration: underline;
    &:hover {
      color: @gray-light;
    }
  }
}

</style>
