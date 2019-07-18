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
    <Results v-if="results.length > 0" :results="results" @result-selected="handleVideoSelected"></Results>
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
    /*
    loadSearchResults() {
      let response = {
        kind: "youtube#searchListResponse",
        etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/7XMSAVwHvebUTVfV1Vwl2kMh3k4"',
        nextPageToken: "CAUQAA",
        regionCode: "BR",
        pageInfo: {
          totalResults: 1000000,
          resultsPerPage: 5
        },
        items: [
          {
            kind: "youtube#searchResult",
            etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/xOqXxuP1xKgZr5bkxgtO9DwpSQ8"',
            id: {
              kind: "youtube#video",
              videoId: "_i03tjOsJ90"
            },
            snippet: {
              publishedAt: "2019-04-26T14:00:10.000Z",
              channelId: "UCttUlwTvqWQXRAaTcxeG9Zg",
              title: "Projota, Vitão - Sei Lá",
              description:
                "Clique aqui e ouça o álbum: https://umusicbrazil.lnk.to/TributoAosSonhadoresIYD SIGA PROJOTA: https://www.facebook.com/projota/ ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/_i03tjOsJ90/default.jpg",
                  width: 120,
                  height: 90
                },
                medium: {
                  url: "https://i.ytimg.com/vi/_i03tjOsJ90/mqdefault.jpg",
                  width: 320,
                  height: 180
                },
                high: {
                  url: "https://i.ytimg.com/vi/_i03tjOsJ90/hqdefault.jpg",
                  width: 480,
                  height: 360
                }
              },
              channelTitle: "ProjVEVO",
              liveBroadcastContent: "none"
            }
          },
          {
            kind: "youtube#searchResult",
            etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/xA-Cx0QNWSdJjoddezYa3PqfFjg"',
            id: {
              kind: "youtube#video",
              videoId: "C3WJ0Bv_jPY"
            },
            snippet: {
              publishedAt: "2019-05-22T22:00:53.000Z",
              channelId: "UCQrMFHy4Tk-e2vu4OSq1GYQ",
              title:
                "&quot;Sei Lá&quot; Projota part. Vitão | (cover) Elana Dara",
              description:
                "se inscreve e e e espero q gostem, me sigam tb no insta: @elana.dara.",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/C3WJ0Bv_jPY/default.jpg",
                  width: 120,
                  height: 90
                },
                medium: {
                  url: "https://i.ytimg.com/vi/C3WJ0Bv_jPY/mqdefault.jpg",
                  width: 320,
                  height: 180
                },
                high: {
                  url: "https://i.ytimg.com/vi/C3WJ0Bv_jPY/hqdefault.jpg",
                  width: 480,
                  height: 360
                }
              },
              channelTitle: "Elana Dara",
              liveBroadcastContent: "none"
            }
          },
          {
            kind: "youtube#searchResult",
            etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/IEgU7ufZx5YHPHSXhAk4e1NkPyE"',
            id: {
              kind: "youtube#video",
              videoId: "cplbrMIL2Rk"
            },
            snippet: {
              publishedAt: "2017-10-27T01:12:09.000Z",
              channelId: "UCNUQK9mQoqi4yNXw2_Rj6SA",
              title: "MC Livinho - Azul Piscina (GR6 Filmes)",
              description:
                "Inscreva-se no canal GR6 MUSIC e fique por dentro dos lançamentos do Funk: http://bit.ly/2oPPsHP Baixe a Musica: http://bit.ly/2gFWklJ Artista: MC Livinho ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/cplbrMIL2Rk/default.jpg",
                  width: 120,
                  height: 90
                },
                medium: {
                  url: "https://i.ytimg.com/vi/cplbrMIL2Rk/mqdefault.jpg",
                  width: 320,
                  height: 180
                },
                high: {
                  url: "https://i.ytimg.com/vi/cplbrMIL2Rk/hqdefault.jpg",
                  width: 480,
                  height: 360
                }
              },
              channelTitle: "GR6 EXPLODE",
              liveBroadcastContent: "none"
            }
          },
          {
            kind: "youtube#searchResult",
            etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/dRJ7Ekduit7s8rY-xSFQ23V-_MI"',
            id: {
              kind: "youtube#video",
              videoId: "hi3i8wPOy2U"
            },
            snippet: {
              publishedAt: "2019-04-26T07:45:03.000Z",
              channelId: "UCaQP0AZWD6pVzgDU6lGG3ZA",
              title: "Sei Lá - Projota Feat. VITÃO ( Letra )",
              description: "SeiLá #Projota #Vitão #Diilovely.",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/hi3i8wPOy2U/default.jpg",
                  width: 120,
                  height: 90
                },
                medium: {
                  url: "https://i.ytimg.com/vi/hi3i8wPOy2U/mqdefault.jpg",
                  width: 320,
                  height: 180
                },
                high: {
                  url: "https://i.ytimg.com/vi/hi3i8wPOy2U/hqdefault.jpg",
                  width: 480,
                  height: 360
                }
              },
              channelTitle: "Diamante Ribeiro",
              liveBroadcastContent: "none"
            }
          },
          {
            kind: "youtube#searchResult",
            etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/VKeFdmHgfppmDhP6_MHyZwGsRKI"',
            id: {
              kind: "youtube#video",
              videoId: "PCLd9q4P8Po"
            },
            snippet: {
              publishedAt: "2015-07-22T20:08:40.000Z",
              channelId: "UC2U57RGDN0xZQ5dX8bS1xpw",
              title: "seila ue",
              description:
                "Darude sandstorm! poar meu código vem upar no warface da uma ajuda lá :D : 6O77883II1 Página do Facebook ...",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/PCLd9q4P8Po/default.jpg",
                  width: 120,
                  height: 90
                },
                medium: {
                  url: "https://i.ytimg.com/vi/PCLd9q4P8Po/mqdefault.jpg",
                  width: 320,
                  height: 180
                },
                high: {
                  url: "https://i.ytimg.com/vi/PCLd9q4P8Po/hqdefault.jpg",
                  width: 480,
                  height: 360
                }
              },
              channelTitle: "Alan Teles",
              liveBroadcastContent: "none"
            }
          }
        ]
      };
      this.parseResponse(response);
    }*/
    loadSearchResults: async function(search) {
      this.loading = true;
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${this.api_key}`
      )
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
