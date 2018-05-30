<script>
import ActivityActions from '../ActivityActions';

export default {
  extends: ActivityActions,
};
</script>

<template>
  <div>
    <div class="activity__mask" @click.self="close"></div>
    <div class="closed-activity" @click.self="close">
      <div class="activity__wrapper">
        <nav id="menu-user" class="navbar navbar-inverse">
          <div class="menu-user">
            <div class="menu-user__wrapper">
              <div class="menu-user__navbar">
                <div class="navbar-title">
                  <slot name="caption"></slot>
                </div>
              </div>
              <div class="menu-user__navbar-right" @click="close">
                <i class="btn-close material-icons">&#xE14C;</i>
              </div>
            </div>
          </div>
        </nav>
        <div class="activity__container">
          <div class="activity__content">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.closed-activity {
  max-width: @document-width;
  position: fixed;
  top: 0px;
  bottom: 0;
  right: 0;
  left: 0;

  overflow: hidden;
  z-index: 1;

  margin-right: auto;
  margin-left: auto;

  .menu-closed {
    max-width: @activity-width;
    margin-left: auto;
    margin-right: 0;
  }

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
</style>
