<template>
  <div id="app">
    <div class="title">
      <h1>SEND ME A SONG</h1>
      <P>by Gabriel Dertoni</P>
    </div>
    <Searchbar
      class="searchbar"
      :class="{ shrink: results.length > 0 }"
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

export default {
  name: "app",
  components: {
    Searchbar,
    Results,
    Loading
  },
  data() {
    return {
      loading: false,
      results: []
    };
  },
  methods: {
    handleVideoSelected(video) {
      const url = `https://us-central1-send-me-a-song-38668.cloudfunctions.net/postVideo`;
      // const url = `http://localhost:5000/send-me-a-song-38668/us-central1/postVideo`;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          link: `https://www.youtube.com/watch?v=${video.id}`,
          ...video
        })
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response.success) {
            confirm("Obrigado por sua recomendação!");
          } else if (response.message === "Data already exists in database.") {
            confirm("Alguem já fez essa sugestão, tente fazer outra.");
          } else {
            confirm(
              "Ocorreu um erro ao acessar o banco de dados... Tente novamente mais tarde."
            );
          }
          document.location.reload();
        })
        .catch(error => {
          console.error(error);
          confirm("Ocorreu um erro... Tente novamente mais tarde.");
        });
    },
    parseResponse(response) {
      this.results = response.videos;
      this.loading = false;
    },
    loadSearchResults: async function(search) {
      // If search is empty
      if (!search) {
        this.results = [];
        return;
      }

      this.loading = true;
      const url = `https://us-central1-send-me-a-song-38668.cloudfunctions.net/getYouTubeSearchResults?search=${search}&maxResults=4`;
      // const url = `http://localhost:5000/send-me-a-song-38668/us-central1/getYouTubeSearchResults?search=${search}&maxResults=4`;
      fetch(url)
        .then(response => response.json())
        .then(this.parseResponse);
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
