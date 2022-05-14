<template>
  <div id="app" data-server-rendered="true">
    <v-app id="app">
      <v-app-bar app color="primary" dark>
        <v-app-bar-title class="text-no-wrap">Compara fipe</v-app-bar-title>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
      <v-footer>
        Desenvolvido por
        <v-btn icon target="_blank" tag="i" href="https://github.com/isaquevoss" size="24px"
          ><v-icon>mdi-github</v-icon>
        </v-btn>
        isaquevoss
      </v-footer>
    </v-app>
  </div>
</template>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1565680081169870"
     crossorigin="anonymous"></script>
<style lang="scss">

.v-app-bar-title__content{
  width: 200px !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
