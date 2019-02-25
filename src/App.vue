<template>
  <v-app id="pop-a-shot">
    <v-toolbar color="primary" dark>
      <v-spacer></v-spacer>
      <!-- v-toolbar-title>Application</v-toolbar-title -->
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="sideNav" absolute temporary right>
      <v-list dense>
        <v-list-tile @click="sideNav = !sideNav">
          <v-list-tile-action>
            <v-icon>close</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile @click="go('home')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('scoreboard')">
          <v-list-tile-action>
            <v-icon>score</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Scoreboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
    <!-- v-footer color="primary" app></v-footer -->
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class App extends Vue {
  private sideNav: boolean = false

  private created() {
    this.$vuetify.theme.primary = '#b00203'
    this.$vuetify.theme.secondary = '#000'
  }

  private go(name: string) {
    this.sideNav = false
    this.$router.push({
      name
    })
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>