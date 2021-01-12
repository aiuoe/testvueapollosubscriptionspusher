import Vue from 'vue'
import App from './App.vue'
import PusherLink from './apollo'
import Pusher from 'pusher-js'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

Vue.config.productionTip = false

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8000/graphql',
})

const cache = new InMemoryCache()

const pusherLink = new PusherLink({
  pusher: new Pusher("528a43e52a265f4b5f54", {
    cluster: "us2",
    authEndpoint: `http://localhost:8000/graphql/subscriptions/auth`,
    auth: {
      headers: {
        authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYxMDM5NjIxNiwiZXhwIjoxNjEyOTg4MjE2LCJuYmYiOjE2MTAzOTYyMTYsImp0aSI6IlJqbXBZU2NPOWdvRzd1cnkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJyb2xlIjoiYWRtaW4ifQ.0N6nJ-rlViJdQiAPPDgHJjCj6Hyw57Cs3Rc5DMgDr64",
      },
    },
  }),
});

const link = ApolloLink.from([pusherLink, httpLink]);

const apolloClient = new ApolloClient({
  link,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
	apolloProvider,
  render: h => h(App),
}).$mount('#app')
