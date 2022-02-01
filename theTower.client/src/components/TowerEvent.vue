<template>
  <div class="details">
    <router-link
      :to="{ name: 'EventDetails', params: { id: towerEvent.id } }"
      :title="towerEvent.name"
    >
      <div class="card selectable text-light">
        <div class="position-relative w-100">
          <div class="gradient">
            <div class="position-absolute clip-text">
              <b class="text-white f-20">
                {{ towerEvent.name }} {{ towerEvent.startDate }}
                {{ towerEvent.location }}
              </b>
            </div>
            <img
              :src="towerEvent.coverImg"
              alt="Event Image"
              class="rounded w-100"
            />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent'
export default {
  props: {
    towerEvent: { type: TowerEvent, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.gradient:after {
  content: "";
  position: absolute;
  background: linear-gradient(
    180deg,
    hsla(0, 0, 0, 0),
    hsla(0, 0, 0, 0),
    hsla(0, 0, 0, 0.5),
    hsla(0, 0, 0, 1)
  );
}
</style>