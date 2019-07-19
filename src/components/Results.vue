<template>
  <div class="results-wrapper">
    <div class="search-results">
      <Video
        v-for="video in results"
        :thumbnails="video.thumbnails"
        :title="video.title"
        :description="video.description"
        :id="video.id"
        :key="video.id"
        @video-clicked="handleVideoClicked"
      ></Video>
    </div>
  </div>
</template>
<script>
import Video from "./Video.vue";

export default {
  name: "Results",
  components: {
    Video
  },
  props: {
    results: {
      type: Array,
      required: true
    },
    rows: {
      type: Number,
      required: false,
      default: 2
    }
  },
  methods: {
    handleVideoClicked(video) {
      this.$emit("result-selected", video);
    }
  }
};
</script>
<style lang="scss">
.results-wrapper {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-bottom: 40px;

  .search-results {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    padding: 25px;
    border-radius: 0 0 50px 50px;
    background-color: #e9cbcb;
    box-sizing: border-box;
    animation: appear-anim 0.5s ease both;
    animation-delay: 200ms;

    @media screen and(max-width: 800px) {
      grid-template-columns: repeat(1, 1fr);
      width: 640px;
    }
    @media screen and(max-width: 700px) {
      border-radius: 0;
      width: 100%;
    }
  }
}
@keyframes appear-anim {
  from {
    transform: scale(1, 0);
    transform-origin: 50% 0%;
  }
  to {
    transform: scale(1, 1);
    transform-origin: 50% 0%;
  }
}
</style>


