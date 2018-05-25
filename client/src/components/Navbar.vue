<template>
<!-- <div class="nav"> -->
  <!-- Navigation -->
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" href="#">Hacktiv Overflow</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#regisModal" v-if="isLogin === false">Register</a>
              <div class="modal fade" id="regisModal">
                <div class="modal-dialog">
                  <div class="modal-content">
              
                    <div class="modal-header">
                      <h4 class="modal-title">Register</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
              
                    <div class="modal-body">
                      <form accept-charset="UTF-8">
                        <div class="form-group">
                          <label for="email">Email address:</label>
                          <input type="email" class="form-control" id="email" v-model="register.email">
                        </div>
                        <div class="form-group">
                          <label for="pwd">Password:</label>
                          <input type="password" class="form-control" id="pwd" v-model="register.password">
                        </div>
                        <button type="submit" class="btn btn-success"  data-dismiss="modal" @click="registerUser">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#loginMod" v-if="isLogin === false">Login</a>
              <!-- The Modal -->
              <div class="modal fade" id="loginMod">
                <div class="modal-dialog">
                  <div class="modal-content">
              
                    <!-- Modal Header -->
                    <div class="modal-header">
                      <h4 class="modal-title">Login</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
              
                    <!-- Modal body -->
                    <div class="modal-body">
                      <form>
                        <div class="form-group">
                          <label for="email">Email address:</label>
                          <input type="email" class="form-control" id="emailLogin" v-model="login.email">
                        </div>
                        <div class="form-group">
                          <label for="pwd">Password:</label>
                          <input type="password" class="form-control" id="pwdLogin" v-model="login.password">
                        </div>
                        <input type="button" class="btn btn-success" @click="loginUser" data-dismiss="modal" value="Login">
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="loginFb" v-if="isLogin === false">Login Facebook</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#newMod" v-if="isLogin === true">
                <i class="fa fa-plus"></i> New Question
              </a>
              <div class="modal" id="newMod">
                <div class="modal-dialog">
                  <div class="modal-content">
              
                    <!-- Modal Header -->
                    <div class="modal-header">
                      <h4 class="modal-title">What's your question?</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
              
                    <!-- Modal body -->
                    <div class="modal-body text-justify">
                      <form>
                        <div class="form-group">
                          <label for="newTitle">Title:</label>
                          <input type="text" class="form-control" id="newTitle" v-model="newQuestion.title">
                        </div>
                        <div class="form-group">
                          <label for="newQ">Question:</label>
                          <textarea class="form-control" id="newQ" v-model="newQuestion.question"></textarea>
                        </div>
                        <div class="form-group">
                          <label for="newTag">Tag:</label>
                          <input type="text" class="form-control" id="newTag" v-model="newQuestion.tag">
                        </div>
                        <input type="button" class="btn btn-success"  data-dismiss="modal" value="Ask" @click="addQuestion()">
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logoutUser" v-if="isLogin === true">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
<!-- </div> -->
</template>

<script>
import axios from 'axios'

export default {
  name: 'Navbar',
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      register: {
        email: '',
        password: ''
      },
      newQuestion: {
        title: '',
        question: '',
        tag: ''
      },
      isLogin: false,
      isAdmin: false
    }
  },
  methods: {
    loginUser: function () {
      console.log(this.login)
      axios
        .post('https://hacktivoverflow.herokuapp.com/users/signin', {
          email: this.login.email,
          password: this.login.password
        })
        .then(response => {
          console.log("masuk", response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', response.data.nowLogin.role)
            localStorage.setItem('id', response.data.nowLogin._id)
            localStorage.setItem('status', this.isLogin)
            const loginRole = localStorage.getItem('role')
            console.log(response.data.nowLogin)
            if (loginRole === 'admin') {
              this.isAdmin = true
            }
            this.isLogin = true
            this.$router.push('/')
            alert('Welcome!')
        })
        .catch(err => {
          console.log("ini", err)
        })
    },
    registerUser: function () {
      console.log(this.register)
      axios
        .post('https://hacktivoverflow.herokuapp.com/users/signup', {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        })
        .then(response => {
          console.log(response)
          alert('Register Success')
        })
        .catch(err => {
          console.log(err)
        })
    },
    logoutUser: function () {
      localStorage.removeItem('token')
      this.isLogin = false
      this.login.email = ''
      this.login.password = ''
      this.$router.push('/')
    },
    addQuestion: function () {
      if (this.isLogin === true) {
        console.log('masuk kalo login')
        const { title, question, tag } = this.newQuestion
          axios
            .post('https://hacktivoverflow.herokuapp.com/posts/addQ', {
              user: localStorage.getItem('id'),
              title,
              question,
              tag
            }, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(response => {
              console.log(response)
              alert('Your question has been posted')
              this.$router.push('/')
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      loginFb() {
      window.FB.login((response) => {
        console.log('statusChangeCallback')
        console.log(response)
        if (response.status === 'connected') {
          console.log('masuk ke if di login fb')
          localStorage.setItem('fb_access_token', response.authResponse.accessToken)
          this.testAPI()
        } else {
          alert('login first')
        }
      })
    },
    testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      axios.get('https://hacktivoverflow.herokuapp.com/loginFb', {
        headers: { 
          fb_access_token: localStorage.getItem('fb_access_token') 
        }
      })
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          this.$router.push('/todo')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
body {
  background-color: #C4D4E0;
}

nav {
  background-color: #193446;
}

a {
  color: white;
}
</style>
