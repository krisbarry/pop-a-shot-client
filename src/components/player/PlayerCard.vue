<template>
    <v-card class="player component" v :class="{'new': !player}">
        <v-img :src="player.teamIcon.url" class="icon" aspect-ratio="1" v-if="player && player.teamIcon.url"></v-img>
        <v-icon class="icon" v-else-if="player && !player.teamIcon.url">account_circle</v-icon>
        <v-icon class="icon add" @click="showPlayerDetails()" @enter="showPlayerDetails()" v-else>add</v-icon>
        <v-card-title>
          <div class="player-details">
            <div class="team-name" v-if="player">{{ player.teamName }}</div>
            <div class="team-name" @click="showPlayerDetails()" @enter="showPlayerDetails()" v-else>Add New Player</div>
            <div class="user-name"></div>
            <div class="first-name"></div>
            <div class="last-name"></div>
          </div>
        </v-card-title>
        <v-card-actions v-if="player">
            <v-spacer></v-spacer>
            <v-btn @click="showPlayerDetails()" @enter="showPlayerDetails()" icon>
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn @click="deletePlayerDialog()" @enter="deletePlayerDialog()" icon>
                <v-icon>delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { PLAYER } from '@/store/common/constants'
import { Icon, Player } from '@/store/player/types'
import { Action, Getter } from 'vuex-class'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class PlayerCard extends Vue {
    @Prop() private player!: Player
    @Prop() private onPlayerEdit!: any

    @Action('setPlayer', {namespace: PLAYER}) private setPlayer: any
    @Action('deletePlayer', {namespace: PLAYER}) private deletePlayer: any

    private showPlayerDetails() {
        console.log('showing player details, this.player: ' + this.player)
        if (this.player) {
            console.log('setting player...')
            this.setPlayer(this.player)
        }
        if (this.onPlayerEdit) {
            this.onPlayerEdit(!this.player)
        }
    }

    private deletePlayerDialog() {
        if (true) {
            this.deletePlayer()
        }
    }
}
</script>