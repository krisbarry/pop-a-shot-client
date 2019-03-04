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
        <v-dialog v-model="showDeleteDialog" persistent max-width="600px">
            <v-card class="player delete dialog" v-if="player">
                <v-card-title>
                <span class="headline">Delete {{ player.firstName }} {{ player.lastName }}?</span>
                </v-card-title>
                <v-card-text>
                    Are you sure you want to delete {{ player.firstName }} {{ player.lastName }}? This operation is irreverisble.
                </v-card-text>
                <v-card-actions v-if="player">
                    <v-spacer />
                    <v-btn @click="confirmDelete(false)" @enter="confirmDelete(false)" flat>No</v-btn>
                    <v-btn @click="confirmDelete(true)" @enter="confirmDelete(true)" flat>Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>        
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
    private showDeleteDialog: boolean = false

    @Prop() private player!: Player
    @Prop() private onPlayerEdit!: any

    @Action('setPlayer', {namespace: PLAYER}) private setPlayer: any
    @Action('resetPlayer', {namespace: PLAYER}) private resetPlayer: any
    @Action('deletePlayer', {namespace: PLAYER}) private deletePlayer: any

    private showPlayerDetails() {
        if (this.player) {
            this.setPlayer(this.player)
        }
        if (this.onPlayerEdit) {
            this.onPlayerEdit()
        }
    }

    private deletePlayerDialog() {
        this.showDeleteDialog = true
    }

    private confirmDelete(deleteFlag: boolean) {
        if (deleteFlag) {
            this.deletePlayer(this.player)
        }
        this.showDeleteDialog = false
    }
}
</script>