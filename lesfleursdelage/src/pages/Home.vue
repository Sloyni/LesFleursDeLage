<template>
  <q-page class="column bg-brown-1">
    <div class="flex flex-center" v-if="classroomsLoading">
      <q-circular-progress
      indeterminate
      size="30px"
      color="blue"
      class="q-ma-md"
      />
    </div>
    <q-list class="bg-white mt-5 bordered">
      <template v-for="classroom in classrooms">
        <div :key="classroom.id">
          <q-item v-ripple :to="'/classroom/'+classroom.id">
            <q-item-section avatar>
              <q-icon name="apps"></q-icon>
            </q-item-section>
            <q-item-section>
              {{ classroom.name }}
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
  computed: {
    classrooms () {
      return this.$store.getters.getClassrooms;
    },
    classroomsLoading () {
      return this.$store.getters.getClassroomsLoading;
    },
  },
  name: 'PageIndex'
}
</script>
