<template>
  <div class="hello d-block">
<!-- Page Content -->
    <div class="container">

      <div class="row">
       
        <!-- Blog Entries Column -->
        <div class="col-md-8">
           
          <h1 class="my-4">Ask Here!
            <small>and you're gonna get the answer!</small>
          </h1>

          <!-- Blog Post -->
          <div class="card mb-4" v-for="(post, i) in postTemp" :key="{i}">
            <!-- {{ postTemp }} -->
            <div class="card-body text-justify">
              <h2 class="card-title">{{ post.title }}</h2>
              <hr>
              <p><b>{{ post.user.email }}</b></p>
              <p class="card-text">{{ post.question }}</p>
              <p>
                <button class="btn-success" @click="upvoteQ(post)"><i class="fa fa-arrow-up"></i></button> {{ upQ }} <button class="btn-danger" @click="downvoteQ(post)"><i class="fa fa-arrow-down"></i></button> {{ downQ }}
              </p>
            </div>
            <div class="d-flex flex-column justify-content-start m-3 bg-light text-justify p-1">
              <label for="answerArea">Answer:</label>
              <textarea rows="3" v-model="urAnswer" id="answerArea"></textarea>
              <input type="button" class="btn btn-sm btn-primary" value="Answer" @click="postAnswer(post)">
              <h5 class="border-bottom border-dark">Answers</h5>
              <div class="d-flex flex-column justify-content-start m-3 bg-light text-justify p-1" v-for="(answer, j) in post.answers" :key="{j}">
                <div>
                  <p><b>{{ answer.user.email }}</b></p>
                  <p>{{ answer.answer }}</p>
                  <p>
                    <button class="btn-success"><i class="fa fa-arrow-up" @click="upvoteA(answer)"></i></button> {{ upA }} <button class="btn-danger" @click="downvoteA(answer)"><i class="fa fa-arrow-down"></i></button> {{ downA }}
                  </p>
                  <div class="dropdown">
                    <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Comment
                    </button>
                    <div class="dropdown-menu">
                      <form class="px-4 py-3">
                        <div class="form-group">
                          <label for="commentArea">Comment:</label>
                          <textarea class="form-control" rows="3" v-model="urComment" id="commentArea"></textarea>
                        </div>
                        <input type="button" class="btn btn-sm btn-primary" value="Comment" @click="postComment(answer)">
                      </form>
                    </div>
                  </div>
                  <hr>
                </div>
                <h5 class="border-bottom border-dark">Comments</h5>
                <div class="d-flex flex-column justify-content-start m-3 bg-light text-justify p-1" v-for="(com, k) in answer.comments" :key="{k}">
                  <div>
                    <p><b>{{ com.user.email }}</b></p>
                    <span>{{ com.comment }}</span>
                    <hr>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer text-muted">
              Posted by
              <a href="#">NL</a>
            </div>
          </div>

          <!-- Pagination -->
          <ul class="pagination justify-content-center mb-4">
            <li class="page-item">
              <a class="page-link" href="#">&larr; Older</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#">Newer &rarr;</a>
            </li>
          </ul>

        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <!-- Search Widget -->
          <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for...">
                <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>

          <!-- Categories Widget -->
          <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <a href="#">HTML</a>
                    </li>
                    <li>
                      <a href="#">Freebies</a>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#">JavaScript</a>
                    </li>
                    <li>
                      <a href="#">CSS</a>
                    </li>
                    <li>
                      <a href="#">Tutorials</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Side Widget -->
          <div class="card my-4">
            <h5 class="card-header">Side Widget</h5>
            <div class="card-body">
              You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
            </div>
          </div>

        </div>

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->

    <!-- Footer -->
    <footer class="py-5">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Your Website 2018</p>
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      urComment: '',
      urAnswer: '',
      upQ: 0,
      downQ: 0,
      upA:0,
      downA: 0
    }
  },
  methods: {
    ...mapActions([
      'getAllPost'
    ]),
    postAnswer(post) {
      console.log(post)
      Axios
        .post("http://localhost:3000/posts/addA", {
          id: post._id,
          answer: this.urAnswer
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          alert('Thankyou for answering this question')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    postComment(answer) {
      console.log(answer._id)
      Axios
        .post("http://localhost:3000/posts/addC", {
          id: answer._id,
          comment: this.urComment
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          alert('Comment posted')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    upvoteQ(post) {
      console.log(post)
      if (post.user._id == localStorage.getItem("id")) {
        console.log("ga boleh")
        alert("You can't vote your own post")
      } else {
        console.log("boleh")
        Axios
        .get(`http://localhost:3000/posts/upvote/${post._id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.upQ++
        })
        .catch(err => {
          console.log(err)
        })
      }
      
    },
    downvoteQ(post) {
      console.log(post)
      if (post.user._id == localStorage.getItem("id")) {
        console.log("ga boleh")
        alert("You can't vote your own post")
      } else {
        Axios
        .get(`http://localhost:3000/posts/downvote/${post._id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.downQ++
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    upvoteA(answer) {
      console.log(answer)
      if (answer.user._id == localStorage.getItem("id")) {
        alert("You can't vote your own post")
      } else {
        Axios
        .get(`http://localhost:3000/answers/upvote/${answer._id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.upQ++
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    downvoteA(answer) {
      console.log(answer)
      if (answer.user._id == localStorage.getItem("id")) {
        alert("You can't vote your own post")
      } else {
        Axios
          .get(`http://localhost:3000/answers/downvote/${answer._id}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(response => {
            console.log(response)
            this.downQ++
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    ...mapState([
      'postTemp'
    ])
  },
  mounted() {
    this.getAllPost()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.card-header {
  background-color: #9AABB9;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

footer {
  background-color: #193446;
}

</style>
