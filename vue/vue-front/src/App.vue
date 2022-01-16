<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/login" v-if="!accessToken">Login</router-link>
      <router-link to="#" v-else v-on:click.native="logout()">Logout</router-link>
      <router-link to="#" v-show="accessToken" v-on:click.native="unlink()"> | Kakao Unlink</router-link>
    </div>

    <router-view />
  </div>
</template>

<script>
import router from "./router";
export default {
  data: function () {
    return {
      accessToken: window.Kakao.Auth.getAccessToken(),
    };
  },
  methods: {
    logout(type) { // 카카오 로그아웃
      window.Kakao.Auth.logout(function () {
        if (type) { // "unlink"
          alert("Unlinked Kakao Account!");
        } else {
          alert("Logout Account!");
        }
        router.push("login");
      });
    },
    unlink() {  // 카카오 계정 연결끊기
      let logout = this.logout;
      window.Kakao.API.request({
        url: "/v1/user/unlink",
        success: function (response) {
          console.log(response);
          logout("unlink");
        },
        fail: function (error) {
          console.log(error);
          alert(error);
          return;
        },
      });
    },
  },
  watch: {
    accessToken: function () { // 토큰이 변경 확인
      console.log(this.accessToken);
    },
    $route(to) { // 라우트 변경 될때 마다 확인하여 (로그인체크)
      this.accessToken = window.Kakao.Auth.getAccessToken();
      if (to.name != "Login" && to.name != "AuthKakaoCallback") {
        if (!this.accessToken) {
          console.log("Not logged in.");
          location.href = "/login";
        }
      }
    },
  },
  beforeMount() { // 최초 한번만 호출
    console.log(router.currentRoute);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
