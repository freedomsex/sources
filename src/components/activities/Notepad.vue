<script>
import ActivityActions from '~activities/ActivityActions';

export default {
  data() {
    return {
      edited: false,
    };
  },
  mounted() {
    this.$store.dispatch('notes/LOAD');
  },
  computed: {
    writes() {
      return this.$store.state.notes.list;
    },
  },
  methods: {
    refresh() {
      this.$store.dispatch('notes/WRITES');
    },
    select(text) {
      this.$store.commit('message/saveFirst', text);
      this.$emit('select', text);
      this.$emit('close');
    },
    remove(id) {
      this.$store.dispatch('notes/DELETE', id);
      this.refresh();
    },
  },
  components: {
    ActivityActions,
  },
};
</script>

<template>
  <ActivityActions @close="$emit('close')">
    <span slot="caption">Блокнот</span>

    <template slot="option">
      <div class="menu-button" @click="edited = (edited !== true)">
        <i class="material-icons" v-if="!edited">&#xE254;</i>
        <i class="material-icons" v-else>&#xE876;</i>
      </div>
    </template>

    <div class="activity-section" v-if="writes && writes.length">
      <div class="list-view">
        <div class="list-item" v-for="item in writes"
         @click="select(item.text)">
         <div class="list-item__body notepad-item">
           {{item.text}}
         </div>
         <div class="notepad-edit" @click.stop="remove(item.id)" v-show="edited">
           <i class="material-icons">&#xE14C;</i>
         </div>
       </div>
      </div>
    </div>
  </ActivityActions>
</template>

<style lang="less">
.notepad-item {
  font-style: italic;
  font-size: 14px;
}

.notepad-edit {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  font-size: 0px;
  color: @gray-dark;
  background: @white;
}

</style>
