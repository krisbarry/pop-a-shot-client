<template>
    <v-dialog v-model="show" persistent max-width="45%">
        <v-card class="game-summary dialog" v-if="show">
            <v-card-title>
                <span class="headline">Game Summary</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-layout>
                        <v-flex xs12>
                            Congratulations {{ getWinner() }}!
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="onClose()" @enter="onClose()" flat>Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Game } from '@/store/game/types'
import { GAME } from '@/store/common/constants'
import { Getter } from 'vuex-class'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class GameSummary extends Vue {

    @Prop() private show!: boolean
    @Prop() private onClose!: any

    @Getter('game', {namespace: GAME}) private game!: Game

    private getWinner() {
        if (this.game.player1.score > this.game.player2.score) {
            return this.game.player1.player.teamName
        } else {
            return this.game.player2.player.teamName
        }
    }
}
</script>