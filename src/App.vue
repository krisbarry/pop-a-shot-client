<template>
  <v-app id="pop-a-shot">
    <v-toolbar color="primary" dark>
      <v-spacer />
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="sideNav" absolute temporary right>
      <v-list dense>
        <v-list-tile @click="sideNav = !sideNav">
          <v-list-tile-action>
            <v-icon color="secondary">close</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="(route, i) in $router.options.routes" :key="i" @click="go(route.name)">
          <v-list-tile-action>
            <v-icon color="secondary" medium>{{ route.name }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ route.name }}</v-list-tile-title>
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