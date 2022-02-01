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
                {{ towerEvent.name }} {{ towerEvent.startDate }}
                {{ towerEvent.location }}
              </p>
            </div>
            <img
              :src="towerEvent.coverImg"
              alt="Event Image"
              class="rounded img-fluid"
            />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  props: {
    towerEvent: { type: Object, required: true }
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