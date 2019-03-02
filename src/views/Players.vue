<template>
  <v-layout class="players view" justify-center>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex v-for="player in players" :key="player.id" xs12 sm6 md4>
          <PlayerCard :player="player" />
        </v-flex>
        <v-flex class="add-new" xs12 sm6 md4>
          <PlayerCard />
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Player } from '@/store/player/types'
import { PLAYER } from '@/store/common/constants'
import { Action, Getter } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import PlayerCard from '@/components/player/PlayerCard.vue'

@Component({
  components: {
    PlayerCard
  }
})
export default class Players extends Vue {

  @Getter('players', {namespace: PLAYER}) private players!: Player[]

  @Action('getPlayers', {namespace: PLAYER}) private getPlayers: any
}
</script>
