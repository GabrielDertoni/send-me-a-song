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
      @result-selected="handleVideoSelectedGraphQL"
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

import { PostVideoMutation } from "./graphql/PostVideo.js";
import { GetYouTubeSearchResults } from "./graphql/YouTubeSearch.js";
// import gql from 'graphql-tag';
// import { post } from 'axios';

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
    handleVideoSelectedGraphQL(video) {
      this.loding = true;
      this.postVideo(video.id, video.title);
    },
    async postVideo(videoId, title) {
      this.loading = true;
      try {
        const response = await this.$apollo.mutate({
          mutation: PostVideoMutation,
          variables: {
            videoId,
            title
          }
        });
        this.loading = false;
        const data = response.data.postVideo;
        if (data.success) confirm("Obrigado por sua recomendação!");
        else if (data.message == "Data already exists in database.")
          confirm("Alguem já fez essa sugestão, tente fazer outra.");
        else
          confirm(
            "Ocorreu um erro ao acessar o banco de dados... Tente novamente mais tarde."
          );
        
        location.reload();
      } catch (error) {
        this.loading = false;

        console.error(error);
        confirm("Sorry, an error has occurred, try again later.");
      }
    },
    async loadSearchResults(search) {
      if (!search) {
        this.results = [];
        return;
      }

      this.search = search;
      this.loading = true;
      try {
        const response = await this.$apollo.query({
          query: GetYouTubeSearchResults,
          variables: {
            search,
            maxResults: 4
          }
        });
        this.loading = false;
        this.results = response.data.result.videos;
      } catch (error) {
        console.error(error);
      }
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
