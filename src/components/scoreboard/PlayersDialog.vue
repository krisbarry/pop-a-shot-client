<template>
    <v-dialog v-model="show" persistent max-width="45%">
        <v-card class="players dialog" v-if="show">
        <v-card-title :class="{'back': showAllPlayersSelection}">
            <v-btn @click="goBack()">
            <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-spacer />
            <span class="headline">Add Game Players</span>
        </v-card-title>
        <v-card-text>
            <v-container :class="{'slide': showAllPlayersSelection}">
            <v-layout class="left">
                <v-flex xs6>
                <PlayerCard :player="gamePlayers.length ? gamePlayers[0] : null" :on-player-delete="deleteGamePlayer"
                    :on-player-edit="showAllPlayers" add-player-text="Add Player 1" :disabled="false" />
                </v-flex>
                <v-flex xs6>
                <PlayerCard :player="gamePlayers.length > 1 ? gamePlayers[1] : null" :on-player-delete="deleteGamePlayer"
                    :on-player-edit="showAllPlayers" add-player-text="Add Player 2" :disabled="!gamePlayers.length" />
                </v-flex>
            </v-layout>
            <v-layout class="right">
                <v-list>
                <v-list-tile v-for="p in players" :key="p.id" @click="addGamePlayer(p)">
                    <v-list-tile-avatar>
                    <img :src="p.avatar" v-if="p.teamIcon && p.teamIcon.url">
                    <v-icon v-else>account_circle</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                    <v-list-tile-title v-text="p.teamName"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                </v-list>
            </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn @click="closePlayersDialog()" @enter="closePlayersDialog()" flat>Close</v-btn>
            <v-btn @click="savePlayers()" @enter="savePlayers()" flat :disabled="gamePlayers.length !== 2 || gamePlayers[0].id === gamePlayers[1].id">Save Players</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Game } from '@/store/game/types'
import { Player } from '@/store/player/types'
import { GAME, PLAYER } from '@/store/common/constants'
import { Action, Getter } from 'vuex-class'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import PlayerCard from '@/components/player/PlayerCard.vue'

@Component({
  components: {
    PlayerCard
  }
})
export default class PlayersDialog extends Vue {
    private gamePlayers: Player[] = []
    private gamePlayerIndex: number = -1
    private showAllPlayersSelection: boolean = false

    @Prop() private show!: boolean
    @Prop() private onClose!: any

    @Getter('game', {namespace: GAME}) private game!: Game
    @Getter('players', {namespace: PLAYER}) private players!: Player[]

    @Action('getAllPlayers', {namespace: PLAYER}) private getPlayers: any
    @Action('addGamePlayers', {namespace: GAME}) private addGamePlayers: any

    @Watch('show')
    private showChanged() {
        if (this.show) {
            this.gamePlayers = []
            if (this.game.player1.player) {
                this.gamePlayers.push(this.game.player1.player)
                if (this.game.player2.player) {
                    this.gamePlayers.push(this.game.player2.player)
                }
            }
        }
    }

    private closePlayersDialog() {
        this.gamePlayerIndex = -1
        if (this.onClose) {
            this.onClose()
        }
    }

    private addGamePlayer(player: Player) {
        if (this.gamePlayerIndex === -1) {
            this.gamePlayers.push(player)
        } else {
            this.gamePlayers[this.gamePlayerIndex] = player
        }
        this.goBack()
    }

    private deleteGamePlayer(playerToDelete: Player) {
        const playerIndex = this.gamePlayers.findIndex( (player) => player.id === playerToDelete.id)
        this.gamePlayers.splice(playerIndex, 1)
    }

    private goBack() {
        this.gamePlayerIndex = -1
        this.showAllPlayersSelection = false
    }

    private savePlayers() {
        this.closePlayersDialog()
        this.addGamePlayers(this.gamePlayers)
    }

    private showAllPlayers(player: Player) {
        this.getPlayers()
        this.showAllPlayersSelection = true
        if (player) {
            this.gamePlayerIndex = this.gamePlayers.findIndex( (p) => p.id === player.id)
        }
    }
}
</script>