<script lang="ts">
import { ref } from 'vue'
// import { Home } from 'vue2-package-demo'

// import { Vue2InVue3 } from "@efox/emp-vuett"
// Pass in Vue2 component and empty element id to Vue2InVue3
// const ContentInVue3 = Vue2InVue3(Home, "vue2");

// defineProps<{ msg: string }>()

const count = ref(0)

export default {
  name: "App",
  components: {
    // Mount the converted Vue2 component
    // "conent-in-vue3": ContentInVue3,
  },
  props: {
    msg: String
  },
  data() {
    return {
      // component: Home,
    };
  },
  methods: {},
  setup() {},
  mounted() {},
};
</script>

<template>
  <div id="vue2"></div>
  <conent-in-vue3 />

  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
