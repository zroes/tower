<template>
  <div class="cover-img rounded align-content-end" :style="`background-image: url(${towerEvent.coverImg})`">
    <!-- <img class=" cover-img" :src="towerEvent.coverImg" :title="towerEvent.name"> -->
    <div class="px-1 glass-card rounded-bottom">

      <h4 class="light my-0 px-2 mt-2">{{ towerEvent.name }}</h4>
      <p class="my-0 px-2">{{ towerEvent.location }}</p>
      <p class="my-0 px-2">{{ towerEvent.startDate.toLocaleString() }}</p>
      <p class="light text-end my-0 px-2 mb-2"><span class="accent">{{ towerEvent.capacity }}</span> spots left</p>
    </div>
  </div>
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

p {
  color: #c9f1f8;
}

.accent {
  color: #7cfffd;
}

.light {
  color: #e2f3f3
}

.glass-card {
  background-color: #29292970;
  border: 1px solid #c9f1f879;
  /* border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px; */
  backdrop-filter: blur(7px);
  width: 100%;
}
</style>