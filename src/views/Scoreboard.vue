<template>
  <v-container class="scoreboard" fluid>
    <v-layout align-end row class="teams">
      <v-flex xs4 offset-xs1 class="team-name odd">
        Team 1
      </v-flex>
      <v-flex xs2 class="spacer clock"></v-flex>
      <v-flex xs4 class="team-name even">
        Team 2
      </v-flex>
    </v-layout>
    <v-layout align-center justify-space-around row fill-height class="scores">
      <!-- v-flex xs2 class="icon">
        <v-img src="" class="home" />
      </v-flex -->
      <v-flex xs4 offset-xs1 class="score home">
        <v-card dark color="secondary">
          <v-card-text>
            0
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2 class="clock">
          <v-card>
            <v-card-text>
              <div class="subtitle">Clock</div>
              <div class="time">
                  <span class="seconds full">{{ fullSeconds > 0 ? fullSeconds : 0 }}</span>
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
      <!-- v-flex xs2 class="icon">
        <v-img src="" class="away" />
      </v-flex -->
      <v-flex xs1 class="spacer"></v-flex>
    </v-layout>
    <v-layout align-center justify-space-around row class="controls">
      <v-flex xs2 offset-xs-5 class="reset">
        <v-btn color="primary" dark @click="newGame()">
          {{ gameButtonText }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const DEFAULT_GAME_TIME = 30  // seconds

@Component({
  components: {}
})
export default class Scoreboard extends Vue {
  private fullSeconds: number = 0
  private tenthSeconds: number = 0
  private gamePaused: boolean = false
  private gameInProgress: boolean = false
  private gameButtonText: string = 'New Game'
  private fullSecondsInterval!: any
  private tenthSecondsInterval!: any

  private startClock() {
    setTimeout( () => {
      this.fullSeconds--
      this.fullSecondsInterval = setInterval(() => {
        this.fullSeconds--
        if (this.fullSeconds === -1) {
          clearInterval(this.fullSecondsInterval)
        }
      }, 1000)
    }, (this.tenthSeconds * 100))
    this.tenthSecondsInterval = setInterval(() => {
      if (this.tenthSeconds === 0) {
        if (this.fullSeconds >= 0) {
          this.tenthSeconds = 9
        } else {
          this.gameOver()
          clearInterval(this.tenthSecondsInterval)
        }
      } else {
        this.tenthSeconds--
      }
    }, 100)
  }

  private gameOver() {
    console.log('GAME OVER!')
    this.gameInProgress = false
    this.gameButtonText = 'New Game'
  }

  private newGame() {
    if (this.gamePaused ) {
        this.gamePaused = false
        this.gameButtonText = 'Pause Game'
        this.startClock()
    } else if (this.gameInProgress) {
      this.gamePaused = true
      this.gameButtonText = 'Resume Game'
      clearInterval(this.fullSecondsInterval)
      clearInterval(this.tenthSecondsInterval)
    } else {
      this.fullSeconds = DEFAULT_GAME_TIME
      this.tenthSeconds = 0
      this.gameInProgress = true
      this.gameButtonText = 'Pause Game'
      this.startClock()
    }
  }
}
</script>
