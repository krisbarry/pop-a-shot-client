<template>
  <v-container class="scoreboard view" fluid>
    <v-layout align-end row class="players">
      <v-flex xs4 offset-xs1 class="player home">
        <div class="player-wrapper">
          Player 1
          <!-- v-img src="" class="icon" / -->
        </div>
      </v-flex>
      <v-flex xs2 class="spacer clock"></v-flex>
      <v-flex xs4 class="player away">
        <div class="player-wrapper">
          Player 2
          <!-- v-img src="" class="icon" / -->
        </div>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-space-around row fill-height class="scores">
      <v-flex xs4 offset-xs1 class="score home">
        <v-card dark color="secondary">
          <v-card-text>
            0
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2 class="clock" :class="{'running': gameInProgress && !gamePaused, 'paused': gamePaused}">
          <v-card>
            <v-card-text>
              <div class="subtitle">Clock</div>
              <div class="time">
                  <span class="seconds ten" v-if="tensSeconds > 0">{{ tensSeconds }}</span>
                  <span class="seconds single" :class="{'zero': fullSeconds < 1}">
                    <span class="full">{{ onesSeconds }}</span>
                    <span class="placeholder">{{ onesSeconds  }}</span>
                  </span>
                  <span class="dot hidden-sm-and-down">.</span>
                  <span class="seconds tenths hidden-sm-and-down">{{ tenthSeconds }}</span>                  
              </div>
            </v-card-text>
          </v-card>
      </v-flex>
      <v-flex xs4 class="score away">
        <v-card dark color="secondary">
          <v-card-text>
            0
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs1 class="spacer"></v-flex>
    </v-layout>
    <v-layout align-center justify-center row class="buttons">
      <v-flex xs4 md3 lg2>
        <v-btn color="primary" class="first" dark @click="newGame()">
          {{ gameButtonText }}
        </v-btn>
      </v-flex>
      <v-flex xs4 md3 lg2>
        <v-btn color="primary" class="second" dark @click="newGame()">
          Button 2
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const PAUSE_GAME: string = 'Pause Game'
const RESUME_GAME: string = 'Resume Game'
const START_NEW_GAME: string = 'Start A New Game'
const DEFAULT_GAME_TIME: number = 30  // game time in seconds

@Component({
  components: {}
})
export default class Scoreboard extends Vue {
  private tensSeconds: number = 0
  private onesSeconds: number = 0
  private fullSeconds: number = 0
  private tenthSeconds: number = 0
  private gamePaused: boolean = false
  private gameInProgress: boolean = false
  private gameButtonText: string = START_NEW_GAME
  private fullSecondsIntervalId!: number
  private tenthSecondsIntervalId!: number

  private created() {
    this.fullSeconds = DEFAULT_GAME_TIME
    this.updateSecondsVars(true)
  }

  private destroyed() {
    clearInterval(this.fullSecondsIntervalId)
    clearInterval(this.tenthSecondsIntervalId)
  }

  private startClock() {
    const fullSecondsTimeoutId = setTimeout( () => {
      this.updateSecondsVars(false)
      this.fullSecondsIntervalId = window.setInterval(() => {
        this.updateSecondsVars(false)
        if (this.fullSeconds < 0) {
          clearInterval(this.fullSecondsIntervalId)
        }
      }, 1000)
      window.clearTimeout(fullSecondsTimeoutId)
    }, (this.tenthSeconds * 100))
    this.tenthSecondsIntervalId = window.setInterval(() => {
      if (this.tenthSeconds === 0) {
        if (this.fullSeconds >= 0) {
          this.tenthSeconds = 9
        } else {
          this.gameOver()
          clearInterval(this.tenthSecondsIntervalId)
        }
      } else {
        this.tenthSeconds--
      }
    }, 100)
  }

  private updateSecondsVars(init: boolean) {
    if (!init) {
      this.fullSeconds--
    }
    this.tensSeconds = Math.floor(this.fullSeconds / 10)
    this.onesSeconds = this.fullSeconds > 0 ? this.fullSeconds % 10 : 0
  }

  private gameOver() {
    this.gameInProgress = false
    this.gameButtonText = START_NEW_GAME
  }

  private newGame() {
    if (this.gamePaused) {
      this.gamePaused = false
      this.gameButtonText = PAUSE_GAME
      this.startClock()
    } else if (this.gameInProgress) {
      this.gamePaused = true
      this.gameButtonText = RESUME_GAME
      clearInterval(this.fullSecondsIntervalId)
      clearInterval(this.tenthSecondsIntervalId)
    } else {
      this.fullSeconds = DEFAULT_GAME_TIME
      this.tenthSeconds = 0
      this.gameInProgress = true
      this.gameButtonText = PAUSE_GAME
      this.startClock()
    }
  }
}
</script>
