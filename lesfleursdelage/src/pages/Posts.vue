<template>
  <q-page class="column bg-brown-1">
    <q-footer class="bg-transparent p-3 px-1">
      <q-toolbar>
        <q-toolbar-title>
        </q-toolbar-title>
        <q-btn color="black" size="17px" round icon="arrow_back" class="mx-2" @click="back"/>
        <div v-if="isTeacher">
          <q-btn round color="blue" class="relative" size="17px" icon="add" aria-label="add">
            <input type="file" class="absolute opacity-0 left-0 top-0" @change="uploadFile">
          </q-btn>
        </div>
      </q-toolbar>
    </q-footer>
    <div>
    </div>
    <div class="flex flex-center" v-if="postsLoading">
      <q-circular-progress
      indeterminate
      size="30px"
      color="blue"
      class="q-ma-md"
      />
    </div>
    <q-list class="bg-white mt-5 bordered">
      <template v-for="post in posts">
        <div :key="post.id">
          <q-img
            class="block mx-auto my-3"
            :src="'http://192.168.1.112/lesfleursdelage/public'+post.file"
            width="150px"
          />
          <q-item v-ripple>
            <q-item-section avatar>
              <q-icon name="link"></q-icon>
            </q-item-section>
            <q-item-section>
              {{ post.description }}
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
  data () {
    return {
      isTeacher: this.$store.getters.isTeacher,
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    uploadFile (e) {
      let file = e.target.files[0]
      let fd = new FormData()

      fd.append('file', file)
      fd.append('description','test')
      fd.append('classroom', this.$route.params.classroom_id)
      fd.append('matter',this.$route.params.matter_id)
      fd.append('authorisation',localStorage.getItem('accessToken'))

      this.$store.dispatch('addPost',fd).then(()=>{
        this.$store.commit('setPosts',null);
        this.$store.commit('setPostsLoading',true);
        this.$store.dispatch('getPosts',{classroom:this.$route.params.classroom_id,matter:this.$route.params.matter_id}).then(()=>{
          this.$store.commit('setPostsLoading',false);
        });
      });
    }
  },
  mounted() {
    this.$store.commit('setPosts',null);
    this.$store.commit('setPostsLoading',true);
    this.$store.dispatch('getPosts',{classroom:this.$route.params.classroom_id,matter:this.$route.params.matter_id}).then(()=>{
      this.$store.commit('setPostsLoading',false);
    });
  },
  computed: {
    posts () {
      return this.$store.getters.getPosts;
    },
    postsLoading () {
      return this.$store.getters.getPostsLoading;
    },
  },
  name: 'PagePosts'
}
</script>
