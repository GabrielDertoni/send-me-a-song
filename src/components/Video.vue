<template>
  <div class="video" @click="click">
    <div class="thumbnail-wrapper">
      <img
        class="thumbnail"
        :src="thumbnails.default.url"
        :srcset="`${thumbnails.medium.url} 1000w, ${thumbnails.high.url} 2000w`"
      />
    </div>
    <h3 class="title">{{ title }}</h3>
    <!-- <p class="description">{{ description }}</p> -->
  </div>
</template>
<script>
export default {
  name: "Video",
  props: {
    thumbnails: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    click() {
      this.$emit("video-clicked", {
        id: this.id,
        title: this.title,
        thumbnails: this.thumbnails
      });
    }
  }
};
</script>
<style lang="scss">
.video {
  display: block;
  position: relative;
  border-radius: 20px;

  .thumbnail-wrapper {
    position: relative;
    height: 400px;

    @media screen and(max-width: 1000px) {
      height: 220px;
    }
    @media screen and(max-width: 800px) {
      height: 400px;
    }
    @media screen and(max-width: 700px) {
      height: 300px;
    }
    @media screen and(max-width: 500px) {
      height: 200px;
    }

    .thumbnail {
      z-index: 0;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      opacity: 0.7;
      background-color: gray;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      object-fit: cover;
      transition: opacity 200ms;

      &:hover {
        opacity: 1;
      }
    }
  }
  .title {
    z-index: 1;
    text-align: left;
    font-size: 0.7em;
    // margin: -1em;
    position: absolute;
    bottom: 0.1em;
    left: 0.5em;
    color: white !important;
    text-shadow: 0 0 4px black;
  }
}
</style>
