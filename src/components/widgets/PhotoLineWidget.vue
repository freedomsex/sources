<script>
import CONFIG from '~config/';
import ConfirmDialog from '~dialogs/ConfirmDialog';

export default {
  props: [],
  data: () => ({
    selected: null,
    nofile: false,
    confirm: false,
    accept: false,
    timer: null,
    list: [],
  }),
  mounted() {
    this.fill([]);
    this.load();
    this.timer = setInterval(this.load, 3 * 60 * 1000);
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    hidden() {
      const {age} = this.user;
      return (age < 18 && !this.accept) || this.$store.state.hideLine;
    },
  },
  methods: {
    show(show) {
      this.accept = true;
      this.$store.commit('showLine', show);
    },
    source(src) {
      return src ? `${CONFIG.API_PHOTO}${src}` : '';
    },
    async load() {
      const {data} = await this.$api.res('contact_photolines', 'initials').load();
      if (data && data.length) {
        this.fill(data);
        this.$refs.photoline.scrollLeft = 0;
      }
    },
    fill(list) {
      this.list = [];
      const result = list;
      for (let i = list.length; i < 30; i++) {
        result.push({id: null, item: null, source: null});
      }
      this.list = result;
    },
    quick(uid) {
      this.$router.push({name: 'quickWrite', params: {humanId: uid, initial: true}});
    },

    image(item) {
      return {backgroundImage: `url(${this.source(item.source)})`};
    },
  },
  components: {
    ConfirmDialog,
  },
};
</script>

<template>
  <div class="photo-line-widget">
    <div class="photo-line__container">
      <div class="photo-line__items" ref="photoline">
        <div class="photo-line__item" v-for="item in list" :key="item.id" :style="image(item)">
          <div
            class="photo-line__item-blured"
            :style="image(item)"
            @click="quick(item.userId)"
          ></div>
        </div>
      </div>
    </div>
    <div class="photo-line__options">
      <button class="btn btn-default btn-sm" @click="$router.push('/hotphoto')">
        <i class="glyphicon glyphicon-th-large"></i>
        Смотреть все
      </button>
      <button class="btn btn-default btn-sm" @click="show()">
        <i class="glyphicon glyphicon-eye-close"></i>
        Скрыть ленту
      </button>
    </div>
    <div class="photo-line__front" v-if="hidden">
      <div style="font-size: 16px; padding: 10px;">
        Горячие парни (18+)
      </div>
      <button class="btn btn-default btn-sm" @click="show(true)">
        <i class="glyphicon glyphicon-eye-open"></i>
        Показать ленту
      </button>
    </div>
  </div>
</template>

<style lang="less">
.photo-line {
  @size: 80px;

  &-widget {
    border-bottom: 1px solid @gray-light;
    background-color: #272727;
    padding: @indent-md 0;
    position: relative;
  }

  &__container {
    padding-top: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__options {
    padding-top: @indent-sm;
    text-align: center;
    button i {
      margin-right: 4px;
    }
  }

  &__front {
    position: absolute;
    top: 0;
    bottom: 0;
    // width: 100%;
    left: 0;
    right: 0;
    background-color: rgba(#fff, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: @indent-sm;
  }

  &__items {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .photo-line-item() {
    background-size: cover;
    background-position: center;
    border-radius: 2px;
    cursor: pointer;
  }

  &__item {
    .photo-line-item();
    min-width: @size;
    min-height: @size;
    margin-right: 3px;
    background-color: @dark-light;
    position: relative;
  }

  &__item-blured {
    .photo-line-item();
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    filter: blur(1px);
  }

  &__line-options {
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  &__button {
    min-height: @size;
    min-width: @size / 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: @white;
    background-color: @menu-color;
    overflow: hidden;
    cursor: pointer;
    &.icon-add-button {
      background-color: @menu-color;
      margin-right: 2px;
    }
    &.icon-more-button {
      margin-left: 2px;
    }
    .material-icons {
      font-size: 32px;
    }
  }
}
</style>
