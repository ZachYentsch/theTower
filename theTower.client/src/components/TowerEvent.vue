<template>
  <div class="details">
    <router-link
      :to="{ name: 'EventDetails', params: { id: towerEvent.id } }"
      :title="towerEvent.name"
    >
      <div class="card selectable text-light">
        <div class="position-relative w-100">
          <div class="gradient">
            <div class="position-absolute clip-text col-12">
              <p class="text-white bg-dark">
                {{ towerEvent.name }}
                {{ new Date(towerEvent.startDate).toLocaleString() }}
              </p>
              <div class="bg-dark d-flex justify-content-between">
                <p>
                  {{ towerEvent.location }}
                </p>
                <p>Tickets Left:{{ towerEvent.capacity }}</p>
              </div>
            </div>
            <img
              v-if="towerEvent.isCanceled == false || towerEvent.capacity == 0"
              :src="towerEvent.coverImg"
              class="rounded img-fluid"
            />
            <div v-else>
              <img
              :src="towerEvent.coverImg"
              class="rounded img-fluid"
              style="filter: grayscale(1)"
              aria-labelledby="Event Cancelled"
              />
              <p class="bg-light text-danger"
              style="z-index: 1;">Event Canceled</p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
export default {
  props: {
    towerEvent: { type: Object, required: true }
  },
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
.gradient:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    hsla(0, 0, 0, 0),
    hsla(0, 0, 0, 0),
    hsla(0, 0, 0, 0.5),
    hsla(0, 0, 0, 1)
  );
}
</style>