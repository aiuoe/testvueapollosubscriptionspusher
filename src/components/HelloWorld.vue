<template>
  <div class="hello">
    <h1>{{ name }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  name: string = ''

  async created()
  {
    // await this.$apollo.query({
    //   query: gql(`query {
    //     users
    //     {
    //       data
    //       {
    //         id
    //         name
    //         email
    //       }
    //     }
    //   }`)
    // })
    // .then((res: any) => console.log(res))

    const obs = this.$apollo.subscribe({
      query: gql(`subscription
        UserUpdated
        {
          userUpdated
          {
            id
            name
            email
          }
        }`)})
    obs.subscribe({
      next: (data: any) => { this.name = data.data.userUpdated.name },
      error: (error: any) => console.log(error)
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
