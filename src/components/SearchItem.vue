<script>
import api from '~config/api';
import SocialIcons from './SocialIcons';

export default {
  props: ['human', 'visited', 'gold', 'compact'],
  computed: {
    search() {
      let result = 'парня ';
      if (this.human.sex) {
        result = this.human.sex == 2 ? 'парня ' : 'девушку ';
      }
      if (this.human.who) {
        result = this.human.who == 1 ? 'парня ' : 'девушку ';
      }
      result = `Ищет ${result}`;
      if (this.human.up || this.human.to) {
        // result += ' в возрасте ';
        result += this.human.up ? ` от ${this.human.up}` : '';
        result += this.human.to ? ` до ${this.human.to}` : '';
        result += ' лет ';
      }
      return result;
    },
    name() {
      const sex = this.human.sex == 1 ? 'Парень' : 'Девушка';
      return this.human.name ? this.human.name : sex;
    },
    tagsCount() {
      return this.human.tags.length;
    },
    tagsList() {
      return this.human.tags.join(', ');
    },
    online() {
      return this.human.last < 777;
    },
    differ() {
      let result = false;
      const {sex} = this.$store.state.user;
      if (sex && this.human.who && this.human.who != sex) {
        result = true;
      }
      return result;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    quick() {
      this.$router.push({
        name: 'quickWrite',
        params: {humanId: this.human.id},
      });
    },
    load() {
      api.search.load(null).then((response) => {
        this.users = response.data.users;
      });
    },
  },
  components: {
    SocialIcons,
  },
};
</script>

<template>
  <div class="search-item" :class="{visited: visited, gold: gold && !visited}" @click="quick()">
    <div class="search-item__content" :class="{visited: visited}">
      <div class="search-item__name" :class="{differ: differ}">
        {{name}}
      </div>
      <div class="search-item__age" :class="{differ: differ}" v-if="human.age">
        {{human.age}}
      </div>
      <div class="search-item__city"
        :class="{differ: differ}"
        v-if="human.city && !compact">
        {{human.city}}
      </div>
      <a class="search-item__search"
        v-if="search" :href="'/' + human.id"
        @click.prevent>
        {{search}}
      </a>
    </div>
    <div class="search-item__option" :class="{visited: visited}">
      <social-icons :human="human"/>
      <div class="search-item__virt"
        v-if="human.virt" title="Виртуальный секс">вирт</div>
      <div class="search-item__real"
        v-if="human.close" title="Реальные знакомства">реал</div>
      <div class="search-item__desires"
        v-if="tagsCount" :title="tagsList">{{tagsCount}}</div>
      <div class="search-item__online" v-if="online">онлайн</div>
    </div>
  </div>
</template>

<style lang="less">
.search-item {
  &:last-child {
    border-bottom-width: 0px;
  }
  margin: 0;
  padding: @indent-md @indent-md;
  border-bottom: 1px solid @light;
  position: relative;
  background: @white;
  font-size: 14px;
  color: @dark;
  display: flex;
  justify-content: space-between;
  &.visited {
    background: @light;
  }
  &.gold {
    background: #fcf8e3;
  }
  &__content {
    .link;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    min-width: 0;
    &.visited {
      opacity: 0.7;
    }
  }
  &__option {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: none;
    text-align: right;
    margin-left: @indent-xs;
    &.visited {
      opacity: 0.5;
    }
  }

  &__name {
    margin-right: @indent-xs;
    flex: none;
    &.differ {
      color: @dark-light;
    }
  }
  &__age {
    color: @red-dark;
    margin-right: @indent-xs;
    flex: none;
    &.differ {
      color: @dark-light;
    }
  }
  &__city {
    border-bottom: 0px dashed @link-color;
    color: @link-color;
    margin-right: @indent-xs;
    flex: 0 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.differ {
      color: @dark-light;
    }
  }

  &__search {
    color: @gray-dark;
    font-size: 12px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    flex: 0 5 auto;
    text-overflow: ellipsis;
    &:hover {
      color: @dark-light;
      text-decoration: none;
    }
  }

  &__desires {
    margin-left: @indent-xs;
    font-size: 11px;
    //margin: 0 @indent-xs;
    padding: 4px 7px 3px;
    border-radius: @radius-xs;
    color: @dark-light;
    background: #e8e5ff;
    cursor: pointer;
  }
  &__virt {
    color: @green;
    font-size: 11px;
    margin-left: @indent-xs;
  }
  &__real {
    color: @pink-dark;
    font-size: 11px;
    margin-left: @indent-xs;
  }
  &__online {
    background: #ffffff;
    border-radius: 3px;
    border: 1px solid #ff9900;
    color: #ff9900;
    display: inline-block;
    font-size: 11px;
    margin-right: 5px;
    padding: 0px 3px 1px;
    margin-left: @indent-xs;
  }
}

</style>
