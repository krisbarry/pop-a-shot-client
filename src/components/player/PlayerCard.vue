<template>
    <v-card class="player component" v :class="{'new': !player, 'disabled': disabled}">
        <v-card-actions class="core" v-if="player">
            <v-btn class="edit" @click="showPlayerDetails()" @enter="showPlayerDetails()" icon>
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn class="delete" @click="deletePlayerDialog()" @enter="deletePlayerDialog()" icon>
                <v-icon>delete</v-icon>
            </v-btn>
        </v-card-actions>
        <v-img :src="player.teamIcon.url" class="icon" aspect-ratio="1" v-if="player && player.teamIcon && player.teamIcon.url"></v-img>
        <v-icon class="icon" v-else-if="player && (!player.teamIcon || !player.teamIcon.url)">account_circle</v-icon>
        <v-icon class="icon add" @click="showPlayerDetails()" @enter="showPlayerDetails()" v-else>add</v-icon>
        <v-card-title>
          <div class="player-details">
            <div class="team-name" v-if="player">{{ player.teamName }}</div>
            <div class="team-name" @click="showPlayerDetails()" @enter="showPlayerDetails()" v-else>
                {{ addPlayerText }}
            </div>
            <div class="name" v-if="player">{{ player.firstName }} {{ player.lastName }}</div>
          </div>
        </v-card-title>
        <v-dialog v-model="showDeleteDialog" persistent max-width="40%">
            <v-card class="player delete dialog" v-if="player">
                <v-card-title>
                <span class="headline">Delete {{ player.teamName }}?</span>
                </v-card-title>
                <v-card-text>
                    Are you sure you want to delete {{ player.teamName }}? This operation is irreverisble.
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
    @Prop() private disabled!: boolean
    @Prop() private addPlayerText!: string
    @Prop() private onPlayerEdit!: any
    @Prop() private onPlayerDelete!: any

    private showPlayerDetails() {
        if (!this.disabled && this.onPlayerEdit) {
            this.onPlayerEdit(this.player)
        }
    }

    private deletePlayerDialog() {
        this.showDeleteDialog = true
    }

    private confirmDelete(deleteFlag: boolean) {
        this.showDeleteDialog = false
        if (deleteFlag && this.onPlayerDelete) {
            this.onPlayerDelete(this.player)
        }
    }
}
</script>