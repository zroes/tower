<template>
  <div class="sidebar position-fixed ps-3  py-4 ">

    <div class="text-center">
      <Login />
    </div>

    <div class="my-4">
      <button data-bs-toggle="modal" data-bs-target="#newEvent" v-if="account.id !== undefined"
        class="p-2 btn btn-success text-dark">new event</button>
    </div>
  </div>
  <div class="modal fade" id="newEvent" tabindex="-1" aria-labelledby="create new event" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create New Event</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit="createEvent()">
          <div class="modal-body">
            <div class="form-floating mb-3">
              <input v-model="editable.name" type="text" class="form-control" id="floatingInput" placeholder="placeholder"
                required="true">
              <label for="floatingInput">Name</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="editable.coverImg" type="text" class="form-control" id="floatingInput"
                placeholder="placeholder">
              <label for="floatingInput">Image URL</label>
            </div>
            <div class="row">
              <div class="col-6">
                <div class=" form-floating mb-3">
                  <input v-model="editable.location" type="text" class="form-control" id="floatingInput"
                    placeholder="placeholder">
                  <label for="floatingInput">Location</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-floating mb-3">
                  <input v-model="editable.capacity" type="number" class="form-control" id="floatingInput"
                    placeholder="placeholder">
                  <label for="floatingInput">Capacity</label>
                </div>
              </div>
              <div class="col-6">

                <div class="form-floating mb-3">
                  <input v-model="editable.startDate" type="date" class="form-control" id="floatingInput"
                    placeholder="placeholder" required="true">
                  <label for="floatingInput">Start Date</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-floating">
                  <select v-model="editable.type" class="form-select form-control mb-3" id="floatingSelect"
                    aria-label="Event type">
                    <option selected value="concert">Concert</option>
                    <option value="convention">Convention</option>
                    <option value="sport">Sport</option>
                    <option value="digital">Digital</option>
                  </select>
                  <label for="floatingSelect">Event Type</label>
                </div>
              </div>

            </div>

            <div class="form-floating">
              <textarea v-model="editable.description" class="form-control" placeholder="desc" id="floatingTextarea"
                style="height: 100px"></textarea>
              <label for="floatingTextarea">Description</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Post Event</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>


import Login from './Login.vue'
import { AppState } from "../AppState.js"
import { computed, ref } from "vue"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { towerEventsService } from "../services/TowerEventsService.js"
import { router } from "../router.js"
export default {
  setup() {
    const editable = ref({})
    const today = new Date().toLocaleDateString('en-CA')
    editable.value.startDate = today
    return {
      editable,
      account: computed(() => AppState.account),

      async createEvent() {
        try {
          const towerEventData = editable.value
          const newTowerEvent = await towerEventsService.createEvent(towerEventData)
          logger.log(newTowerEvent)
          editable.value = {}
          router.push({ path: '/event/' + newTowerEvent.id })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  },
  components: { Login }
}
</script>

<style>
.sidebar {
  height: 100vh;
  background-color: #111927;
}

.btn-success {
  --bs-btn-bg: #24d683 !important;
  --bs-btn-border-color: #24d683 !important;
  --bs-btn-hover-color: #fff !important;
  --bs-btn-hover-bg: #20c377 !important;
  --bs-btn-hover-border-color: #1db971 !important;
}
</style>