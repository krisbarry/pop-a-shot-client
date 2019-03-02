<template>
    <v-card class="player component" v :class="{'new': !player}">
        <v-img :src="playerToSave.teamIcon.url" class="icon" aspect-ratio="1" v-if="playerToSave.teamIcon && playerToSave.teamIcon.url"></v-img>
        <v-icon class="icon" v-else-if="player && !player.teamIcon">account_circle</v-icon>
        <v-icon class="icon add" @click="showPlayerDialog(true)" @enter="showPlayerDialog(true)" v-else>add</v-icon>
        <v-card-title>
          <div class="player-details">
            <div class="team-name" v-if="player">{{ player.teamName }}</div>
            <div class="team-name" @click="showPlayerDialog(true)" @enter="showPlayerDialog(true)" v-else>Add New Player</div>
            <div class="user-name"></div>
            <div class="first-name"></div>
            <div class="last-name"></div>
          </div>
        </v-card-title>
        <v-card-actions v-if="player">
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>delete</v-icon>
            </v-btn>
        </v-card-actions>
        <v-dialog v-model="showPlayerProfile" persistent max-width="600px">
            <v-card class="player dialog">
                <v-card-title>
                    <span class="headline" v-if="player">Player Profile</span>
                    <span class="headline" v-else>Add New Player</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex class="icon-wrapper" xs12>
            					<input type="file" ref="icon" class="icon-file" accept="image/*" @change="onIconSelection">
                                <img :src="icon.url || icon.fileName" class="icon" ref="teamIcon" @click="chooseIcon()" @enter="chooseIcon()" v-if="icon && icon.url || icon.fileName"/>
                                <v-icon class="icon" @click="chooseIcon()" @ente="chooseIcon()" v-else>account_circle</v-icon>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="*First Name" v-model="playerToSave.firstName" ref="firstName" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="*Last Name" v-model="playerToSave.lastName" ref="lastName" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="*Team Name" v-model="playerToSave.teamName" ref="teamName" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="*User Name" v-model="playerToSave.userName" ref="userName" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field :append-icon="showPassword ? 'visibility_off' : 'visibility'" hint="At least 8 characters"
                                    :rules="[() => playerToSave.password && playerToSave.password >= 8 || 'Min 8 characters']" 
                                        v-model="playerToSave.password" ref="password" :type="showPassword ? 'text' : 'password'" label="*Password"
                                            counter @click:append="showPassword = !showPassword" v-if="!player"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <small>*indicates required field</small>
                    <v-spacer />
                    <v-btn @click="showPlayerDialog(false)" @enter="showPlayerDialog(false)" flat>Close</v-btn>
                    <v-btn @click="savePlayer()" @enter="savePlayer()" :diabled="!playerToSaveIsValid()" flat>Save</v-btn>
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
    private icon: Icon = {} as Icon
    private showPassword: boolean = false
    private showPlayerProfile: boolean = false
    // private playerToSaveIsValid: boolean = false

    @Prop() private player!: Player

    @Getter('player', {namespace: PLAYER}) private playerToSave!: Player

    @Action('savePlayer', {namespace: PLAYER}) private savePlayer: any
    @Action('resetPlayer', {namespace: PLAYER}) private resetPlayer: any
    @Action('updatePlayerTeamIcon', {namespace: PLAYER}) private updatePlayerTeamIcon: any

    @Watch('playerToSave')
    private playerToSaveChanged() {
        console.log('playerToSaveChanged()...')
    }

    private created() {
        if (this.player) {
            this.playerToSave.teamName = this.player.teamName
            this.playerToSave.userName = this.player.userName
            this.playerToSave.lastName = this.player.lastName
            this.playerToSave.firstName = this.player.firstName
            this.playerToSave.teamIcon = this.icon = {
                fileName: this.player.teamIcon
            } as Icon
        }
    }

    private showPlayerDialog(flag: boolean) {
        this.showPlayerProfile = flag
        if (!this.showPlayerProfile && !this.player) {
            this.resetPlayer()
        }
    }

    private chooseIcon() {
        const iconElement: any = this.$refs.icon
        iconElement.click()
    }

    private onIconSelection(event: any) {
        const files = event.target.files
        if (files[0]) {
            const fr = new FileReader ()
            fr.readAsDataURL(files[0])
            fr.addEventListener('load', () => {
                this.icon = {
                    url: fr.result,
                    file: files[0],
                    fileName: files[0].name
                }
                this.playerToSave.teamIcon = {
                    file: files[0],
                    fileName: files[0].name
                }
            })
        } else {
            this.icon = {}
            this.playerToSave.teamIcon = {}
        }
    }

    private playerToSaveIsValid() {
        let flag = true
        Object.keys(this.playerToSave).forEach( (attr) => {
            if (!(this.playerToSave as any)[attr]) {
                flag = false
            }
            const element: any = this.$refs[attr]
            element.validate(true)
        })
        console.log('Inside playerToSaveIsValid(), returning ' + flag)
        return flag
    }
}
</script>