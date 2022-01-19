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
test
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
