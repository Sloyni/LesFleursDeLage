<template>
  <q-page class="column bg-brown-1">
    <q-footer class="bg-transparent p-3 px-1">
      <q-toolbar>
        <q-toolbar-title>
        </q-toolbar-title>
        <q-btn color="black" size="17px" round icon="arrow_back" class="mx-2" @click="back"/>
      </q-toolbar>
    </q-footer>
    <div>
    </div>
    <div class="flex flex-center" v-if="mattersLoading">
      <q-circular-progress
      indeterminate
      size="30px"
      color="blue"
      class="q-ma-md"
      />
    </div>
    <q-list class="bg-white mt-5 bordered">
      <template v-for="matter in matters">
        <div :key="matter.id">
          <q-item v-ripple :to="'/classroom/'+$route.params.id+'/matter/'+matter.id">
            <q-item-section avatar>
              <q-icon name="public"></q-icon>
            </q-item-section>
            <q-item-section>
              {{ matter.name }}
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div>
      </template>
    </q-list>
  </q-page>
</template>

<script>
export default {
  methods: {
    back(){
      this.$router.go(-1)
    }
  },
  mounted() {
    this.$store.commit('setMatters',null);
    this.$store.commit('setMattersLoading',true);
    this.$store.dispatch('getMatters',this.$route.params.id).then(()=>{
      this.$store.commit('setMattersLoading',false);
    });
  },
  watch: {
     $route(to, from) {
      this.$store.commit('setMatters',null);
      this.$store.commit('setMattersLoading',true);
      this.$store.dispatch('getMatters',this.$route.params.id).then(()=>{
        this.$store.commit('setMattersLoading',false);
      });
    }
  },
  computed: {
    matters () {
      return this.$store.getters.getMatters;
    },
    mattersLoading () {
      return this.$store.getters.getMattersLoading;
    },
  },
  name: 'PageMatters'
}
</script>
