<template>
  <v-app>
    <v-navigation-drawer class="d-flex d-sm-none" app v-model="drawer">
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white" light>
      <v-app-bar-nav-icon
        class="d-flex d-sm-none"
        color="black"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-img
        class="mx-2"
        :src="require('./assets/logo.png')"
        max-height="40px"
        max-width="90px"
      ></v-img>
      <v-btn plain color="black" to="/"> Home </v-btn>
      <v-btn plain color="black" to="/about"> About </v-btn>
      <v-spacer></v-spacer>
      <v-btn plain color="black" to="/login"> login </v-btn>
      <v-btn plain color="black" to="/signup"> signup </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main id="app-body" >
      <!-- Provides the application the proper gutter -->
      <v-container id="scroll-target" class="px-0 pt-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
};
</script>
<style scoped>
#app-body{
  background: #EFEFEF;
}
</style>


