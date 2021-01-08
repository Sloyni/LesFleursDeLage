<template>
  <q-layout view="lHh Lpr lFf" class="bg-brown-1">

    <q-header elevated class="bg-blue bordered">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-toolbar-title class="text-h7">
          {{ title }}
        </q-toolbar-title>
        <div>
          <q-btn round flat icon="settings" aria-label="settings" v-if="isAdmin">
            <q-menu :offset="[0, 5]">
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>Administration</q-item-section>
                  </q-item>
                </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>
        <q-item v-ripple exact to="/">
            <q-item-section avatar>
              <q-icon name="home"></q-icon>
            </q-item-section>
            <q-item-section>
              Accueil
            </q-item-section>
          </q-item>
        <q-separator></q-separator>
        <div class="flex flex-center" v-if="classroomsLoading">
          <q-circular-progress
          indeterminate
          size="30px"
          color="blue"
          class="q-ma-md"
          />
        </div>
        <template v-for="classroom in classrooms">
          <q-item :key="classroom.id" v-ripple exact :to="'/classroom/'+classroom.id">
            <q-item-section avatar>
              <q-icon name="apps"></q-icon>
            </q-item-section>
            <q-item-section>
              {{ classroom.name }}
            </q-item-section>
          </q-item>
        </template>
        <q-separator></q-separator>
        <q-item v-ripple exact to="/user/logout">
            <q-item-section avatar>
              <q-icon name="logout"></q-icon>
            </q-item-section>
            <q-item-section>
              Se déconnecter
            </q-item-section>
          </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    name: 'MainLayout',
    mounted() {
      this.$store.commit('setClassrooms',null);
      this.$store.commit('setClassroomsLoading',true);
      this.$store.dispatch('getClassrooms').then(()=>{
        this.$store.commit('setClassroomsLoading',false);
      });
    },
    computed: {
      classrooms () {
        return this.$store.getters.getClassrooms;
      },
      classroomsLoading () {
        return this.$store.getters.getClassroomsLoading;
      },
      title (){
        return this.$store.getters.getTitle;
      }
    },
    data () {
      return {
        isAdmin: this.$store.getters.isAdmin,
        leftDrawerOpen: false,
      }
    }
  }
</script>
