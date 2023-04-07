<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <h3 class="px-4">Events You're Attending:</h3>
  <div class="row m-3">
    <div v-for="ticket in tickets" class="col m-3 bg-darkish p-2 rounded elevation-5">
      <EventCard :towerEvent="ticket.event" />
    </div>
  </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Pop from "../utils/Pop.js"
import { logger } from "../utils/Logger.js"
import { ticketsService } from "../services/TicketsService.js"
import { towerEventsService } from "../services/TowerEventsService.js"

export default {
  setup() {

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    onMounted(() => {
      getMyTickets()
    })

    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      towerEvents: computed(() => AppState.towerEvents)
    }
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.bg-darkish {
  background-color: #252b35;
}
</style>
