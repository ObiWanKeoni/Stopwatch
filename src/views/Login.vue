<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Email" autocomplete="username email" v-model="loginUser.email" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="current-password" v-model="loginUser.password" />
                  </b-input-group>
                  <b-row class="mb-3">
                    <b-col cols="12">
                      <b-button type="submit" variant="primary" class="w-100">Login</b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-button variant="success" class="w-100">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary p-4">
              <b-card-body>
                <b-form @submit.prevent="register">
                  <h1>Register</h1>
                  <p class="text-muted">Join the dark side</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Email" v-model="registerUser.email" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Password" v-model="registerUser.password" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Confirm Password" v-model="registerUser.confirm" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12">
                      <b-button type="submit" variant="success" class="w-100">Register</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
      return {
        loginUser: {
          email: '',
          password: ''
        },
        registerUser: {
          email: '',
          password: '',
          confirm: ''
        }
      }
  },
  mounted () {
      this.logout();
  },
  methods: {
      logout() {
          this.$store.dispatch('logout');
      },
      login() {
        this.$store.dispatch('signUserIn', this.loginUser)
          .then(() => {
            this.$router.push({name:'dashboard'});
          })
          .catch(() => {

          });
      },
      register() {
        if (this.comparePasswords() !== true){
          return
        }
        this.$store.dispatch('signUserUp', { email: this.registerUser.email, password: this.registerUser.password })
          .then(() => {
            this.$router.push({name:'dashboard'});
          })
          .catch(() => {

          });
      }
  },
  computed: {
      comparePasswords () {
          return this.password === this.confirm ? true : 'Passwords don\'t match'
      },
      error () {
          return this.$store.state.error;
      },
      loading () {
          return this.$store.state.loading;
      }
  },
  watch: {
      error (value) {
          if (value) {
              this.alert = true;
          }
      },
      alert (value) {
          if (!value) {
              this.$store.commit('setError', null);
          }
      }
  }
}
</script>
