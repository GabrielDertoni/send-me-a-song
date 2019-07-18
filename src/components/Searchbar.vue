<template>
  <div class="searchbar-wrapper">
    <form class="form" @submit.prevent="submit">
      <input class="searchbar" type="text" v-model="search" :placeholder="placeholder" />
      <img src="../assets/magnifier.svg" @click="submit" />
    </form>
  </div>
</template>
<script>
import { setInterval } from "timers";

export default {
  name: "Searchbar",
  mounted() {
    setInterval(this.toggleDash, 500);
  },
  data() {
    return {
      placeholder_text: "Me recomende uma música",
      dash: true,
      search: ""
    };
  },
  computed: {
    placeholder() {
      return this.dash ? this.placeholder_text + "_" : this.placeholder_text;
    }
  },
  methods: {
    toggleDash() {
      this.dash = !this.dash;
    },
    submit() {
      this.$emit("submit", this.search);
    }
  }
};
</script>
<style lang="scss">
.searchbar-wrapper {
  font-size: 1.4em;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .form {
    width: 50%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin: 16vh 0;
    box-sizing: border-box;

    .searchbar {
      font-size: 1em;
      width: 100%;
      height: 10vh;
      box-sizing: border-box;
      border-radius: 50vh;
      padding: 0.8em 0.7em;
      border: solid 8px #da4c4c;
      font-family: "Roboto Slab", serif;
      color: #353535;

      &::placeholder {
        font-family: "Roboto Slab", serif;
        color: #949494;
        transition: color 200ms;
      }
      &:focus {
        outline: none;

        &::placeholder {
          color: #94949488;
        }
      }
    }
    img {
      margin-left: -2em;
      margin-bottom: -0.1em;
      width: 1em;
      height: auto;
    }
  }

  &.shrink .form {
    background-color: #da4c4c;
    width: 80%;
    border-radius: 50px 50px 0 0;
    padding: 10px;
    margin-bottom: 0;
    animation: "shrink-anim" ease 500ms;

    .searchbar {
      width: 60%;
    }
  }
}
@keyframes shrink-anim {
  from {
    background-color: transparent;
  }
  to {
    background-color: #da4c4c;
  }
}
</style>


