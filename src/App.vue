<template>
  <div id="app">
    <div class="title">
      <h1>SEND ME A SONG</h1>
      <P>by Gabriel Dertoni</P>
    </div>
    <Searchbar
      class="searchbar"
      :class="{ 'shrink': results.length > 0 }"
      @submit="loadSearchResults"
    ></Searchbar>
    <Loading v-if="loading"></Loading>
    <Results
      v-if="results.length > 0 && !loading"
      :results="results"
      @result-selected="handleVideoSelected"
    ></Results>
    <div class="footer">
      <p>powered by</p>
      <img src="./assets/youtube.svg" />
    </div>
  </div>
</template>

<script>
import Searchbar from "./components/Searchbar.vue";
import Results from "./components/Results.vue";
import Loading from "./components/Loading.vue";

import { async } from "q";

export default {
  name: "app",
  components: {
    Searchbar,
    Results,
    Loading
  },
  beforeCreate() {
    const firebaseConfig = {
      apiKey: "AIzaSyCRSLTOfFPEoW4nzi801Z2v7zTKb4zFpI4",
      authDomain: "send-me-a-song-38668.firebaseapp.com",
      databaseURL: "https://send-me-a-song-38668.firebaseio.com",
      projectId: "send-me-a-song-38668",
      storageBucket: "",
      messagingSenderId: "720129918335",
      appId: "1:720129918335:web:89758e8c1fa07713"
    };
    firebase.initializeApp(firebaseConfig);
  },
  mounted() {
    this.database = firebase.database();
    this.ref = this.database.ref("songs");
  },
  data() {
    return {
      api_key: "AIzaSyBSyWKyufN3lnDpFpNddiTOLLfRYol-w-s",
      loading: false,
      results: [],
      database: undefined,
      ref: undefined
    };
  },
  methods: {
    checkDuplicated: async function(video) {
      let stored = (await this.ref.once("value")).val();
      for (let id in stored) {
        if (stored[id].id === video.id) {
          return true;
        }
      }
      return false;
    },
    handleVideoSelected(video) {
      this.checkDuplicated(video).then(r => {
        if (!r) {
          this.ref.push({
            link: `https://www.youtube.com/watch?v=${video.id}`,
            ...video
          });
          confirm("Obrigado por sua recomendação!");
        } else {
          confirm("Alguém já deu essa sugestão, tente sugerir outra coisa.");
        }

        document.location.reload();
      });
    },
    parseResponse(response) {
      let videos = [];
      for (let item of response.items) {
        videos.push({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnails: item.snippet.thumbnails
        });
      }
      this.results = videos;
      this.loading = false;
    },
    loadSearchResults: async function(search) {
      // If search is empty
      if (!search) {
        this.results = [];
        return;
      }

      this.loading = true;
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${this.api_key}&maxResults=4`
      )
        .then(response => response.json())
        .then(this.parseResponse);
    },
    loadDeezerSearchResults: async function(search) {
      this.loading = true;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap");
#app {
  display: block;
  text-align: center;
  font-family: "Roboto Slab", serif;
  font-size: 30px;
  height: 100%;
  padding: 11vh 0;

  .title {
    color: #f15050;
    @media screen and(max-width: 550px) {
      font-size: 0.7em;
    }
    @media screen and(max-width: 400px) {
      font-size: 0.6em;
    }
    h1 {
      font-size: 2em;
      margin: 0;
    }
    p {
      font-size: 0.8em;
      margin: 0.2em 0;
      color: #8c8c8c;
    }
  }

  .footer {
    // position: absolute;
    // bottom: 0;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: center;

    p {
      margin: 0.2em;
      color: #8c8c8c;
    }
    img {
      width: 48px;
      height: auto;
    }
  }
}
</style>
