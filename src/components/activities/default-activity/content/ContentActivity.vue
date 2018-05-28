<script>
import axios from 'axios';
import ReviewList from '~modules/ReviewList';
import PhotoSend from '~modules/PhotoSend';
import ActivityActions from '../../ActivityActions';

export default {
  extends: ActivityActions,
  props: ['link', 'locale'],
  data() {
    return {
      title: '',
      text: '',
      file: '',
      more: null,
      edit: null,
      loader: true,
      error: false,
      galery: [],
      preview: null,

      enableReview: false,
    };
  },
  computed: {
    ready() {
      return !this.loader && !this.error;
    },
    reviewsUrl() {
      return null;
    },
  },
  methods: {
    load(url) {
      axios
        .get(url)
        .then(({data}) => {
          this.loaded(data);
        })
        .catch((e) => {
          this.failed(e);
        });
    },
    loaded(data) {
      this.loader = false;
      if (!data.content) {
        this.failed();
      } else {
        this.text = data.content;
        this.file = data.file;
        this.more = data.more || null;
        this.edit = data.edit || null;
        this.galery = data.galery || [];
      }
    },
    failed() {
      this.error = true;
    },
    show(index) {
      this.preview = this.galery[index];
    },
  },
  components: {
    ReviewList,
    PhotoSend,
  },
};
</script>

<template>
  <div class="content-activity" @click.self="close">
    <nav id="menu-user" class="navbar navbar-inverse">
      <div class="menu-user">
        <div class="menu-user__wrapper">
          <div class="menu-user__logo">
            <span id="home_page" class="" style="padding: 10px 0px;" @click="close">
              <img src="~static/img/icon/arrow_back.png" width="30" height="30" alt="" border="0" >
            </span>
          </div>
          <div class="menu-user__navbar" >
            <div class="navbar-title" @click="$emit('close')">
              <slot name="caption">{{title}}</slot>
            </div>
          </div>
          <slot name="option"></slot>
        </div>
      </div>
    </nav>
    <div class="activity__container">
      <div class="activity__content">
        <div class="activity__loader" v-show="loader && !error">Загружаю...</div>
        <div v-html="text"></div>

        <div>
          <div class="image-galery" v-if="galery.length">
            <span class="image-galery__item"
             :style="{backgroundImage: 'url(' + item + ')'}"
             v-for="(item, index) in galery"
             @click="show(index)"></span>

            <PhotoSend v-if="preview"
             :photo="{photo: preview}"
             @close="preview = null"/>
          </div>
        </div>

        <div v-if="ready">
          <a class="btn btn-primary" :href="more" target="_blank" v-show="more">
            <span aria-hidden="true" class="glyphicon glyphicon-file"></span>
            Основной текст
          </a>
          <a class="btn btn-default" :href="edit" target="_blank" v-show="edit">
            <span aria-hidden="true" class="glyphicon glyphicon-pencil"></span>
            Редактировать
          </a>
        </div>

        <ReviewList :link="reviewsUrl" v-if="ready && enableReview"/>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.content-activity {
  position: fixed;
  background: @white;

  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;

  top: 0px;
  bottom: 0;
  max-width: 750px;
  max-height: 100%;
  overflow: hidden;
  z-index: 1;

  .activity__container {
    height: calc(~'100% - 50px');
  }
  .activity__content {
    padding-bottom: @indent-xl;
    h1 {
      margin-top: @indent-xs;
    }
  }

  .image-galery {
    margin: 20px 0px 20px;
    font-size: 0;
    &__item {
      width: 170px;
      height: 170px;
      // 20*2 от края, 2*4 между, 2 костыль
      @media (max-width: 500px) {
        @indent: (20 * 2 + 2 * 4 + 2) / 3;
        width: ~'calc(33.33vmin - @{indent}px)';
        height: ~'calc(33.33vmin - @{indent}px)';
      }
      @media (max-width: 700px) and (min-width: 500px) {
        @indent: (20 * 2 + 2 * 4 + 2) / 4;
        width: ~'calc(25vmin - @{indent}px)';
        height: ~'calc(25vmin - @{indent}px)';
      }
      border: 5px solid @white;
      position: relative;
      display: inline-block;
      background-size: cover;
      background-position: center;
      box-shadow: 0 0 5px @gray;
      margin: 0 2px 2px 0;
    }
  }
}
</style>
