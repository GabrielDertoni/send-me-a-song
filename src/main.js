import Vue from "vue";
import App from "./App.vue";

import VueApollo, { ApolloProvider } from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.config.productionTip = false;

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/send-me-a-song-38668/us-central1/graphql'
});
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
});

new Vue({
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount("#app");
