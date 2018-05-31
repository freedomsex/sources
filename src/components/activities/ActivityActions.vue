<script>
export default {
  props: ['type'],
  beforeRouteLeave(to, from, next) {
    console.log('Leave:', [to, from]);
    next();
  },
  computed: {
    closed() {
      return this.type === 'closed';
    },
    content() {
      const type = ['content', 'closed'];
      return type.indexOf(this.type) >= 0;
    },
    style() {
      if (this.type === 'closed') {
        return 'closed-activity';
      }
      if (this.type === 'content') {
        return 'content-activity';
      }
      return 'default-activity';
    },
  },
};
</script>

<template>
  <div>
    <div class="activity__mask" @click.self="$emit('close')"></div>
    <div :class="style"
     @click.self="$emit('close')">
      <div class="activity__wrapper">
        <nav id="menu-user" class="navbar navbar-inverse">
          <div class="menu-user">
            <div class="menu-user__wrapper">
              <div class="menu-user__logo" v-if="!closed">
                <span style="padding: 10px 0px;" @click="$emit('close')">
                  <img src="~static/img/icon/arrow_back.png"
                   width="30" height="30"
                   alt="" border="0" >
                </span>
              </div>
              <div class="menu-user__navbar" >
                <div class="navbar-title" @click="$emit('close')">
                  <slot name="caption"></slot>
                </div>
              </div>
              <slot name="option"></slot>
              <div class="menu-user__navbar-right"
               v-if="closed"
               @click="$emit('close')">
                <i class="btn-close material-icons">&#xE14C;</i>
              </div>
            </div>
          </div>
        </nav>
        <div class="activity__container">
          <div :class="{'activity__content': content}">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.activity {
  &__mask {
    .fixed-dialog-mask;
  }
  &__title {
    font-weight: bolder;
    line-height: 20px;
  }
  &__wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: @activity-width;
    max-height: @activity-height;
    background: @white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  &__container {
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1 1 auto;
    overflow-y: auto;
    border: 1px solid @gray;
    border-width: 0px 1px 1px 1px;
  }
  &__content {
    padding: @indent-md @indent-lg @indent-md;
  }
  &__loader {
    color: @gray-dark;
  }
  &__splitter {
    height: @indent-sm;
  }
}

.activity-mixin() {
  max-width: @document-width;
  position: fixed;
  top: 0px;
  bottom: 0;
  right: 0;
  left: 0;

  margin-right: auto;
  margin-left: auto;
  overflow: hidden;
  z-index: 1;

  .menu-closed {
    margin-left: auto;
    margin-right: 0;
  }
  .menu-user {
    margin-left: 0;
    margin-right: auto;
  }
}

.default-activity {
  .activity-mixin;
}

.closed-activity {
  .activity-mixin;

  .btn-close {
    color: @white;
    padding: 10px 0;
    font-size: 30px;
    cursor: pointer;
  }

  .activity {
    &__wrapper {
      right: 0;
    }
  }
}

.content-activity {
  .activity-mixin;

  .activity {
    &__wrapper {
      max-width: 100%;
      max-height: 100%;
    }
    &__container {
      height: calc(~'100% - 50px');
    }
    &__content {
      padding-bottom: @indent-xl;
      h1 {
        margin-top: @indent-xs;
      }
    }
  }
}

.hint-info {
  background: @light;
  //border: 1px solid @gray-light;
  color: @dark;
  margin-bottom: 10px;
  padding: 10px 15px;
}

.activity-section {
  margin-bottom: @indent-lg;
  &__title {
    margin-bottom: @indent-sm;
    font-size: @font-lg;
  }
  &__tile {
    margin-bottom: @indent-xs;
  }
  &__link {
    display: inline-block;
    padding: @indent-xs 0;
    .link_simple;
  }
}

// .activity-loader {
//   text-align: center;
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: @indent-xs;
//
//   .circle-label() {
//     padding: 2px;
//     margin-top: 1px;
//     font-size: 12px;
//     border-radius: 10px;
//     width: 22px;
//     height: 22px;
//     border: 1px solid @gray;
//     box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
//     display: inline-block;
//     background-color: @white;
//     background-position: center center;
//     background-repeat: no-repeat;
//     position: relative;
//     z-index: 1000;
//   }
//
//   &__label {
//     .circle-label;
//     background-image: url('~static/img/loader.gif');
//   }
//   &__alert {
//     .circle-label;
//     border: 0px solid @gray;
//     background-image: url('~static/img/icon/error-outline.png');
//   }
// }
</style>
