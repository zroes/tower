<template>
  <div class="bg-img" :style="`background-image: url(${towerEvent?.coverImg})`">
    <div class="glass-bg row m-0">
      <div class="col-5 d-flex">
        <img class="rounded align-self-center m-5 cover-img-page" :src="towerEvent?.coverImg" alt="">
      </div>
      <div class="col-7 d-grid light text-shadow">
        <div class="">

          <div class="row m-4">
            <h2 class="fw-bold col">{{ towerEvent?.name }}</h2>
            <h3 class="col text-end lb">{{ towerEvent?.startDate.toLocaleDateString() }}</h3>
          </div>
          <div class="row m-4">
            <h4 class="col lb">{{ towerEvent?.location }}</h4>
          </div>
          <div class="row m-4">
            <div class="col">
              <h6 class="fw-light description">{{ towerEvent?.description }}</h6>
            </div>
          </div>
        </div>
        <div class="row m-4 align-content-end">
          <div class="col align-content-end d-flex flex-wrap">
            <p class="m-0"><span class="accent">{{ towerEvent?.capacity }}</span> spots left</p>
          </div>
          <div class="col text-end">
            <button v-if="towerEvent?.isCanceled" disabled class="btn btn-danger p-3">Canceled</button>
            <button v-else-if="towerEvent?.capacity == 0" disabled class="btn btn-danger fw-light p-3">At
              Capacity</button>
            <button @click="createTicket()" v-else-if="account.id && !isAttending"
              class="btn btn-warning fw-light p-3">Attend
              <i class="mdi mdi-badge-account"></i></button>
            <button @click="deleteTicket()" v-else-if="account.id" title="Leave this event"
              class="unattend btn btn-secondary fw-light p-3">
              <span>Attending</span></button>
            <button v-else class="btn btn-dark hide p-3">|</button>

          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION Attendees (tickets) -->
  <section class="container mt-4">
    <div class="row">
      <div v-for="ticket in tickets" class="d-flex col-1">
        <img class="attendee-img rounded d-flex" :src="ticket?.profile?.picture" :title=ticket?.profile?.name
          :alt=ticket?.profile?.name>
      </div>
    </div>
  </section>

  <!-- SECTION Comments -->
  <section class="mt-4 row justify-content-center">
    <div class="col-9 bg-secondary rounded p-3 justify-content-center">
      <div class="row justify-content-center">

        <div class="col-8 mt-4 mb--2">
          <form class="" @submit.prevent="postComment()">
            <div class="form-floating">
              <textarea v-model="editable" class="form-control elevation-2" placeholder="Leave a comment here"
                id="floatingTextarea" style="height: 100px"></textarea>
              <label class="fw-light" for="floatingTextarea">Leave a comment</label>
            </div>
            <div class="text-end mt-2">
              <button class="btn btn-warning me-2 elevation-1">Post</button>
            </div>
          </form>
        </div>
      </div>
      <div v-for="c in   comments" class="row justify-content-center">

        <Comment :comment="c" />
      </div>
    </div>

  </section>

  <div v-if="!towerEvent?.isCanceled" class="row justify-content-center mt-5">
    <div class="col-3 text-center">
      <button @click="cancelEvent()" v-if="towerEvent?.creatorId == account.id" class="px-5 btn btn-danger">Cancel
        Event</button>
    </div>
  </div>
</template>

<script>
import Comment from "../components/Comment.vue"
import { onMounted, computed, ref } from "vue"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { towerEventsService } from "../services/TowerEventsService.js"
import { ticketsService } from "../services/TicketsService.js"
import { commentsService } from "../services/CommentsService.js"
import { AppState } from "../AppState.js"

export default {
  setup() {
    // private variables and methods here
    const route = useRoute()
    const eventId = route.params.eventId
    const editable = ref('')

    async function getTowerEvent() {

      try {
        await towerEventsService.getById(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getTicketsforEvent() {
      try {
        await ticketsService.getTickets(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getComments() {
      try {

        await commentsService.getAll(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getTowerEvent()
      getTicketsforEvent()
      getComments()
    })
    return {
      towerEvent: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      editable,
      isAttending: computed(() => {
        const found = AppState.tickets.findIndex(ticket => ticket.accountId == AppState.account.id)
        logger.log(found != -1)
        return found != -1
      }),

      async createTicket() {
        try {
          const ticketData = {}
          ticketData.eventId = route.params.eventId
          await ticketsService.createTicket(ticketData)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async deleteTicket() {
        try {
          const accountTicket = AppState.tickets.find(ticket => ticket.accountId == AppState.account.id)
          await ticketsService.deleteTicket(accountTicket.id)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async cancelEvent() {
        try {
          const eventId = route.params.eventId
          if (await Pop.confirm("Are you sure you want to cancel this event?", "This action can't be undone!"))
            await towerEventsService.cancelEvent(eventId)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async postComment() {
        try {
          await commentsService.postComment(editable.value, eventId)
          editable.value = ''
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
      // public variables and methods here
    }
  },
  components: { Comment }
}
</script>

<style>
.text-shadow {
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.288);
}

.attendee-img {
  max-height: 8vh;
}

.hide {
  opacity: 0;
}


.btn-secondary {
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #bb2d3b;
  --bs-btn-hover-border-color: #b02a37;
  --bs-btn-focus-shadow-rgb: 225, 83, 97;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #b02a37;
  --bs-btn-active-border-color: #a52834;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}


.unattend:hover span {
  display: none;
}


.unattend:hover:before {
  content: "Leave Event";
}


.bg-img {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.description {
  line-height: 32px;
}

.glass-bg {
  min-height: 55vh;
  background-color: #214e624e;
  backdrop-filter: blur(25px);
}

.cover-img-page {
  height: 40vh;
  max-width: 60vh;
  object-fit: cover;
  box-shadow: 0px 8px 10px #18181a7c;
}
</style>