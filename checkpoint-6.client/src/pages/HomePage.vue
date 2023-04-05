<template>
  <div class="row justify-content-center m-0">
    <div class="col-7">
      <div class="row justify-content-between m-3">
        <div class="col text-center">
          <button @click="changeFilter('')" class="btn btn-light px-4">all</button>
        </div>
        <div v-for="t in types" class="col text-center">
          <button @click="changeFilter(t)" class="btn btn-light px-4">{{ t }}</button>
        </div>
      </div>
    </div>

  </div>
  <div class="row m-3">
    <div v-for="towerEvent in towerEvents" class="col m-3 bg-darkish p-2 rounded">
      <EventCard :towerEvent="towerEvent" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { towerEventsService } from "../services/TowerEventsService.js"
import { AppState } from "../AppState.js"

export default {
  setup() {

    const filterCatergory = ref('')
    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getTowerEvents()
    })
    return {
      types: ['concert', 'convention', 'sport', 'digital'],
      towerEvents: computed(() => {
        if (!filterCatergory.value)
          return AppState.towerEvents
        return AppState.towerEvents.filter(ev => ev.type == filterCatergory.value)
      }),
      // towerEvents: computed(() => {
      //   AppState.towerEvents
      // }),

      changeFilter(catergory) {
        filterCatergory.value = catergory
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bg-darkish {
  background-color: #252b35;
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .img-fluid {
    height: 20vh !important;
  }
}
</style>
