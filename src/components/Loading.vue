<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>
<script>
export default {
  name: "Loading"
};
</script>
<style lang="scss">
.loader-wrapper {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 2em 0;

  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #da4c4c; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
