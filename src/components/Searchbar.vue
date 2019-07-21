<template>
  <div class="searchbar-wrapper">
    <div class="inner-wrapper">
      <form class="form" @submit.prevent="submit">
        <input
          class="searchbar"
          type="text"
          v-model="search"
          :placeholder="placeholder"
        />
        <img src="../assets/magnifier.svg" @click="submit" />
      </form>
    </div>
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

  .inner-wrapper {
    width: 50%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin: 150px 0;
    box-shadow: border-box;

    @media screen and(max-width: 1400px) {
      width: 700px;
    }
    @media screen and(max-width: 850px) {
      width: 80%;
    }

    .form {
      width: 100%;
      box-sizing: border-box;
      position: relative;

      @media screen and(max-width: 850px) {
        font-size: 0.8em;
      }
      @media screen and(max-width: 700px) {
        font-size: 0.6em;
      }
      @media screen and(max-width: 550px) {
        font-size: 0.5em;
      }
      @media screen and(max-width: 450px) {
        font-size: 0.4em;
      }

      .searchbar {
        font-size: 1em;
        width: 100%;
        box-sizing: border-box;
        border-radius: 50vh;
        padding: 0.2em 0.7em;
        border: solid 8px #da4c4c;
        font-family: "Roboto Slab", serif;
        color: #353535;

        @media screen and(max-width: 700px) {
          border-width: 5px;
        }

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
        position: absolute;
        right: 5%;
        top: 25%;
        width: 1em;
        height: auto;

        @media screen and(max-width: 700px) {
          width: 1.1em;
        }

        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }
  }

  &.shrink .inner-wrapper {
    background-color: #da4c4c;
    border-radius: 50px 50px 0 0;
    padding: 10px 0;
    margin-bottom: 0;
    width: 80%;
    animation: grow-anim 500ms ease;

    @media screen and(max-width: 800px) {
      width: 640px;
    }
    @media screen and(max-width: 700px) {
      width: 100%;
      border-radius: 0;
      margin-top: 40px;
    }

    .form {
      width: 700px;
      animation: shrink-anim 500ms ease;

      @media screen and(max-width: 1200px) {
        width: 75%;
        font-size: 0.7em;
      }
      @media screen and(max-width: 850px) {
        width: 510px;
      }
      @media screen and(max-width: 700px) {
        width: 90%;
        font-size: 0.5em;
      }
    }
  }
}
@keyframes grow-anim {
  from {
    width: 50%;
    background-color: transparent;
  }
  to {
    width: 80%;
    background-color: #da4c4c;
  }
}
@keyframes shrink-anim {
  from {
    width: 100%;
  }
  to {
    width: 700px;
  }
}
@media screen and(max-width: 1200px) {
  @keyframes shrink-anim {
    from {
      width: 100%;
    }
    to {
      width: 75%;
    }
  }
}
@media screen and(max-width: 850px) {
  @keyframes shrink-anim {
    from {
      width: 100%;
    }
    to {
      width: 510px;
    }
  }
  @keyframes grow-anim {
    from {
      width: 50%;
      background-color: transparent;
    }
    to {
      width: 80%;
      background-color: #da4c4c;
    }
  }
}
@media screen and(max-width: 800px) {
  @keyframes grow-anim {
    from {
      width: 50%;
      background-color: transparent;
    }
    to {
      width: 640px;
      background-color: #da4c4c;
    }
  }
}
@media screen and(max-width: 700px) {
  @keyframes shrink-anim {
    from {
      width: 100%;
    }
    to {
      width: 90%;
    }
  }
  @keyframes grow-anim {
    from {
      width: 50%;
      background-color: transparent;
    }
    to {
      width: 100%;
      background-color: #da4c4c;
    }
  }
}
</style>
