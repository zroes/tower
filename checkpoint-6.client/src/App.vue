<template>
  <div class="row m-0">
    <div class="col-11 px-0">
      <header>
        <Navbar />
      </header>
      <main class="bg-dark">


        <router-view />

      </main>
      <footer class="bg-dark text-light">
      </footer>
    </div>
    <div class="col-1 px-0">
      <Sidebar />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'


export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Sidebar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

body {
  background-color: #111927;
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
