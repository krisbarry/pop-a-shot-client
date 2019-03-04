<template>
  <v-layout class="players view" justify-center>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex v-for="p in players" :key="p.id" xs12 sm6 md4>
          <PlayerCard :player="p" :on-player-edit="showPlayerDetails" />
        </v-flex>
        <v-flex class="add-new" xs12 sm6 md4>
          <PlayerCard :on-player-edit="showPlayerDetails" />
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="showPlayerDialog" persistent max-width="600px">
      <v-card class="player dialog">
        <v-card-title>
          <span class="headline" v-if="player">Player Profile</span>
          <span class="headline" v-else>Add New Player</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex class="icon-wrapper" xs12>
                <input type="file" ref="teamIcon" class="icon-file" accept="image/*" @change="onIconSelection">
                <img :src="icon.url || icon.fileName" class="icon" @click="chooseIcon()" @enter="chooseIcon()" v-if="icon && icon.url || icon.fileName"/>
                <v-icon class="icon" @click="chooseIcon()" @ente="chooseIcon()" v-else>account_circle</v-icon>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="*First Name" v-model="player.firstName" ref="firstName" :rules="rules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="*Last Name" v-model="player.lastName" ref="lastName" :rules="rules" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="*Team Name" v-model="player.teamName" ref="teamName" :rules="rules" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="*User Name" v-model="player.userName" ref="userName" :rules="rules" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field :append-icon="showPassword ? 'visibility_off' : 'visibility'" hint="At least 8 characters"
                    :rules="[() => player.password.length >= 8 || 'Min 8 characters']" counter
                        v-model="player.password" ref="password" :type="showPassword ? 'text' : 'password'" label="*Password"
                            @click:append="showPassword = !showPassword" v-if="isNewPlayer"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <small>*indicates required field</small>
          <v-spacer />
          <v-btn @click="closePlayerDetails()" @enter="closePlayerDetails()" flat>Close</v-btn>
          <v-btn @click="save()" @enter="save()" flat>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { PLAYER } from '@/store/common/constants'
import { Icon, Player } from '@/store/player/types'
import { Action, Getter } from 'vuex-class'
import { Component, Vue, Watch } from 'vue-property-decorator'
import PlayerCard from '@/components/player/PlayerCard.vue'

@Component({
  components: {
    PlayerCard
  }
})
export default class Players extends Vue {
  private icon: Icon = {} as Icon
  private isNewPlayer: boolean = false
  private showPassword: boolean = false
  private showPlayerDialog: boolean = false

  private readonly rules: any = [(val: string) => !!val || 'This field is required']

  @Getter('player', {namespace: PLAYER}) private player!: Player
  @Getter('players', {namespace: PLAYER}) private players!: Player[]

  @Action('getPlayers', {namespace: PLAYER}) private getPlayers: any
  @Action('savePlayer', {namespace: PLAYER}) private savePlayer: any
  @Action('resetPlayer', {namespace: PLAYER}) private resetPlayer: any

  @Watch('player')
  private playerChanged() {
    console.log('playerChanged(), player.userName: ' + this.player.userName)
  }

  private closePlayerDetails() {
    this.resetPlayer()
    this.resetPlayerForm()
    this.showPlayerDialog = false
  }

  private showPlayerDetails(isNewPlayer: boolean) {
    console.log('isNewPlayer: ' + isNewPlayer)
    this.isNewPlayer = isNewPlayer
    this.showPlayerDialog = true
    if (!isNewPlayer) {
      this.icon = {
        url: this.player.teamIcon.url
      }
    }
  }

  private chooseIcon() {
    const iconElement: any = this.$refs.teamIcon
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
        this.player.teamIcon = {
          file: files[0],
          fileName: files[0].name
        } as Icon
      })
    } else {
      this.icon = {}
      this.player.teamIcon = {} as Icon
    }
  }

  private resetPlayerForm() {
    this.icon = {}
    Object.keys(this.player).forEach( (attr) => {
      const element: any = this.$refs[attr]
      if (element) {
        try {
          element.reset()
        } catch (e) {  // catch the exception while attempting to reset the team icon / file input
          element.value = ''
        }
      }
    })
  }

  private save() {
    let canSave = true
    Object.keys(this.player).forEach( (attr) => {
      const attrVal = (this.player as any)[attr]
      if (typeof attrVal === 'string' && !attrVal.length) {
        console.log('something wrong with attr ' + attr)
        canSave = false
      }
      const element: any = this.$refs[attr]
      try { element.validate(true) } catch (e) { /* catch exception attempting to validate the icon / file input */ }
    })
    if (canSave) {
      this.savePlayer(this.player)
      this.closePlayerDetails()
    }
  }
}
</script>
