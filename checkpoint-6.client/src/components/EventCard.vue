<template>
  <router-link v-if="towerEvent?.id" :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">
    <div class="cover-img rounded align-content-end" :style="`background-image: url(${towerEvent?.coverImg})`">
      <div class="px-1 glass-card rounded-bottom">

        <h4 class="light my-0 px-2 mt-2">{{ towerEvent?.name }}</h4>
        <p class="my-0 px-2 lb">{{ towerEvent?.location }}</p>
        <p class="my-0 px-2 lb">{{ towerEvent?.startDate.toLocaleString() }}</p>
        <p v-if="towerEvent?.isCanceled" class="my-1 text-center bg-bad rounded">Canceled</p>
        <p v-else-if="towerEvent?.capacity == 0" class="my-1 text-center bg-bad rounded">At Capacity</p>
        <p v-else class="light text-end my-0 px-2  lb mb-2"><span class="accent">{{ towerEvent?.capacity }}</span> spots
          left</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { TowerEvent } from "../models/TowerEvent.js"

export default {
  props: {
    towerEvent: { type: TowerEvent, required: true }
  },
  setup() {
    // private variables and methods here
    return {
      // public variables and methods here
    }
  },
}
</script>

<style>
.cover-img {
  display: flex;
  flex-wrap: wrap;
  height: 27vh;
  min-width: 28vh;
  width: 100%;
  background-position: center;
  background-size: cover;
  /* object-fit: cover; */
}

.lb {
  color: #ccf3fd;
}

.accent {
  color: #88fcfc;
}

.light {
  color: #eff8f8
}

.glass-card {
  background-color: #29292970;
  border: 1px solid #c9f1f879;
  /* border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px; */
  backdrop-filter: blur(7px);
  width: 100%;
  white-space: nowrap;
}

.bg-bad {
  background-color: #dc3545;
  color: #eff8f8;
}
</style>