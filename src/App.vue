<template>
<div id="app">
  <el-container>
    <el-header v-show="$store.getters.isLoggedIn"><Header @show-history="toggleHistory" /></el-header>
    <el-container>
      <el-aside width="300px" v-if="showAside"><History @hide-history="toggleHistory" :history="history" /></el-aside>
      <el-container>
        <el-main><router-view @show-history="showHistory"></router-view></el-main>
        <el-footer v-if="false">Подвал</el-footer>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
import Header from './components/Header'
import History from './components/History'
import { fbApp } from './main'

export default {
  components: {Header, History},
  data() {
    return {
      showAside: false,
      history: []
    }
  },
  created(){
    this.listenHistory()
    console.log(this.$route)
  },
  methods: {
    showHistory(){
      this.showAside = true
    },
    toggleHistory(){
      this.showAside = !this.showAside
    },
    listenHistory(){
      fbApp.database().ref('History').on('value', (snapshot) => {
        this.history = []
        // let iter = snapshot.numChildren()
        let iter = 1
        snapshot.forEach((doc) => {
          const id = doc.key
          let info = doc.val()
          this.history.push({id, Num: iter, ...info})
          iter += 1
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900);
html, body, html * {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  // background-color: #d3dce6;
  color: #1a1a1a;
  // border-right: 1px solid rgba(0,0,0,0.6);
  box-shadow: 10px 0px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  line-height: 20px;
}

.el-main {
  // background-color: #e9eef3;
  // color: #333;
  text-align: center;
  line-height: normal;
  height: calc(100vh - 60px);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
