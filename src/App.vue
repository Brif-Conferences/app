<template>
  <div id="app">
    <h1>Django VueJs Template</h1>
    <div id="nav">
     <router-link :to="{ name: 'home' }">Vue</router-link> |
     <router-link :to="{ name: 'messages' }">Django Rest</router-link>
    </div>
    <router-view/>

    <div class="container">
      <div class="columns" style="margin-top: 100px;">
        <div class="column col-2 centered">
          <g-signin-button
            v-if="isEmpty(user)"
            :params="googleSignInParams"
            @success="onGoogleSignInSuccess"
            @error="onGoogleSignInError"
          >
            <button class="btn btn-block btn-success">
              Google Sign-In
            </button>
          </g-signin-button>
          <user-panel v-else :user="user"></user-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
import axios from 'axios'
import UserPanel from '@/components/UserPanel'
export default {
  name: 'App',
  components: {
    UserPanel
  },
  data () {
    return {
      user: {},
      googleSignInParams: {
        client_id: '680529475337-u3hesd306f504qnucn9quoqhs3n7r3re.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onGoogleSignInSuccess (resp) {
      const token = resp.Zi.access_token
      axios.post('http://localhost:8000/auth/google/', {
        access_token: token
      })
        .then(resp => {
          this.user = resp.data.user
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    onGoogleSignInError (error) {
      console.log('OH NOES', error)
    },
    isEmpty (obj) {
      return Object.keys(obj).length === 0
    }
  }
}
</script>