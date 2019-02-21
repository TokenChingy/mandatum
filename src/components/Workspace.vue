<template>
  <div>
    <div class="row _menu">
      <div
        class="column _link"
        :class="{ 'active' : localState.activeTab === 'stream'}"
        @click="toggleTab('stream')"
      >Stream</div>
      <div
        class="column _link"
        :class="{ 'active' : localState.activeTab === 'settings'}"
        @click="toggleTab('settings')"
      >Settings</div>
    </div>

    <div v-show="localState.activeTab === 'stream'" class="row _content">
      <video id="player" autoplay="true"></video>
    </div>

    <div v-show="localState.activeTab === 'settings'" class="row _content">
      <div class="_settings column">
        <!-- Preferences -->
        <div class="row">
          <mark>Preferences</mark>
          <br>
        </div>
        <div class="row">
          <div class="column _25">
            <label>Username</label>
          </div>
          <div class="column _75">
            <input type="text" :value="getUserName" v-on:blur="changeUserName($event)">
          </div>
        </div>
        <div v-show="this.currentTello === ''" class="row">
          <div class="column _25">
            <label>Connect Tello</label>
          </div>
          <div v-if="this.telloWifi.length === 0" class="column _75">
            <span style="margin-left: 0.5rem;">No Tello's found.</span>
          </div>
          <div v-if="this.telloWifi.length > 0" class="column _25">
            <select id="tellos" v-for="(network, index) in telloWifi" :key="index">
              <option>{{network.ssid}}</option>
            </select>
          </div>
          <div v-if="this.telloWifi.length > 0" class="column _50">
            <input @click="connectToTello()" type="button" value="Connect">
          </div>
        </div>
        <div v-show="this.currentTello !== ''" class="row">
          <div class="column _25">
            <label>Connected Tello</label>
          </div>
          <div class="column _75">
            <span style="margin-left: 0.5rem;">{{currentTello}}</span>
          </div>
        </div>

        <!-- Theme Colours -->
        <div class="row">
          <mark>Theme Colours</mark>
        </div>
        <div class="row">
          <div class="column _25">
            <label>Dark</label>
          </div>
          <div class="column _75">
            <input
              type="text"
              :value="this.getTheme.dark"
              :style="'background-color:' + this.getTheme.dark"
              v-on:blur="changeTheme($event, '--dark')"
            >
          </div>
        </div>
        <div class="row">
          <div class="column _25">
            <label>Mid</label>
          </div>
          <div class="column _75">
            <input
              type="text"
              :value="this.getTheme.mid"
              :style="'background-color:' + this.getTheme.mid"
              v-on:blur="changeTheme($event, '--mid')"
            >
          </div>
        </div>
        <div class="row">
          <div class="column _25">
            <label>Light</label>
          </div>
          <div class="column _75">
            <input
              type="text"
              :value="this.getTheme.light"
              :style="'background-color:' + this.getTheme.light"
              v-on:blur="changeTheme($event, '--light')"
            >
          </div>
        </div>
        <div class="row">
          <div class="column _25">
            <label>Primary</label>
          </div>
          <div class="column _75">
            <input
              type="text"
              :value="this.getTheme.primary"
              :style="'background-color:' + this.getTheme.primary"
              v-on:blur="changeTheme($event, '--primary')"
            >
          </div>
        </div>
        <div class="row">
          <div class="column _25">
            <label>Secondary</label>
          </div>
          <div class="column _75">
            <input
              type="text"
              :value="this.getTheme.secondary"
              :style="'background-color:' + this.getTheme.secondary"
              v-on:blur="changeTheme($event, '--secondary')"
            >
          </div>
        </div>

        <!-- About -->
        <div class="row">
          <mark>About</mark>
        </div>
        <div class="row">
          <div class="column _25">
            <label>Author</label>
          </div>
          <div class="column _75">
            <span>TokenChingy</span>
          </div>
        </div>
        <div class="row">
          <div class="column _25">
            <label>The MIT License (MIT)</label>
          </div>
          <div class="column _75">
            <span>Copyright (c) 2019 TokenChingy</span>
            <br>
            <br>
            <span>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</span>
            <br>
            <br>
            <span>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</span>
            <br>
            <br>
            <span>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { setInterval } from "timers";
import Dgram from "dgram";
import Jmuxer from "jmuxer";
import Wifi from "node-wifi";
import _ from "lodash";

export default {
  name: "workspace",
  computed: {
    ...mapGetters(["getUserName", "getTheme"])
  },
  methods: {
    ...mapMutations(["setUserName", "setTheme"]),
    changeUserName: function(event) {
      this.setUserName(event.target.value);
    },
    changeTheme: function(event, prop) {
      const colour = event.target.value.replace("#", "");

      if (colour !== "" && colour.length === 6) {
        this.setTheme([colour, prop.replace("--", "")]);

        document.documentElement.style.setProperty(prop, `#${colour}`);
      }
    },
    connectToTello: function() {
      const selectedTello = document.querySelector("#tellos").value;

      Wifi.connect(
        {
          ssid: selectedTello,
          password: ""
        },
        error => {
          if (error) console.log(error);
          this.currentTello = selectedTello;
        }
      );
    },
    toggleTab: function(tabName) {
      this.localState.activeTab = tabName;
    }
  },
  data: function() {
    return {
      localState: {
        activeTab: "stream"
      },
      telloSocket: Dgram.createSocket("udp4", {
        reuseAddr: true
      }).bind(11111),
      telloStreamChunks: [],
      telloStreamChunkCount: 0,
      telloWifi: [],
      currentTello: ""
    };
  },
  mounted: function() {
    Wifi.init({
      iface: null
    });

    setInterval(() => {
      Wifi.scan((error, networks) => {
        if (error) throw Error;

        const telloNetworks = [];
        let isTelloStillConnected = false;

        _.forEach(networks, network => {
          if (_.includes(network.ssid, "TELLO")) {
            telloNetworks.push(network);
          }

          if (this.currentTello !== "") {
            if (network.ssid === this.currentTello)
              isTelloStillConnected = true;
          }
        });

        if (telloNetworks.length < 0) {
          this.currentTello = "";
        }

        if (!isTelloStillConnected) this.currentTello = "";

        this.telloWifi = telloNetworks;
      });
    }, 1000);

    const videoPlayer = document.querySelector("#player");

    videoPlayer.addEventListener("click", event => {
      event.preventDefault();
    });

    window.addEventListener("focus", () => {
      if (videoPlayer.buffered.length > 0) {
        videoPlayer.currentTime = videoPlayer.buffered.end(0);
      }
    });

    const JMX = new Jmuxer({
      node: "player",
      mode: "video",
      fps: 30,
      flushingTime: 1
    });

    const maxChunkSize = 3;

    this.telloSocket.on("message", bytes => {
      const index = bytes.indexOf(Buffer.from([0, 0, 0, 1]));

      if (index > -1 && this.telloStreamChunks.length > 0) {
        this.telloStreamChunks.push(bytes.slice(0, index));
        this.telloStreamChunkCount += 1;

        if (this.telloStreamChunkCount === maxChunkSize) {
          JMX.feed({
            video: Uint8Array.from(Buffer.concat(this.telloStreamChunks))
          });

          this.telloStreamChunks.length = 0;
          this.telloStreamChunkCount = 0;
        }

        this.telloStreamChunks.push(bytes.slice(index));
      } else {
        this.telloStreamChunks.push(bytes);
      }
    });
  }
};
</script>

<style scoped>
._menu {
  text-align: center;
}
._menu ._link {
  padding: 0.5rem;
  background-color: var(--mid);
  color: var(--primary);
}

._menu ._link.active {
  background-color: var(--light);
  color: var(--secondary);
}

._content {
  padding: 1rem;
  height: calc(100% - 5.125rem);
  overflow-y: scroll;
}

._content video {
  width: 100%;
}

._content ._settings label {
  padding: 0.25rem 0;
}

._content ._settings input {
  flex: 2;
  margin: 0 0 0 0.5rem;
  padding: 0.25rem 0.5rem;
  background: none;
  outline: none;
  border: none;
  font-size: 1rem;
  background-color: var(--mid);
  color: var(--primary);
}

._content ._settings input:focus {
  background-color: var(--light);
  caret-color: var(--secondary);
}

._content ._settings select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  flex: 2;
  width: 100%;
  margin: 0 0 0 0.5rem;
  padding: 0.25rem 0.5rem;
  background: none;
  outline: none;
  border: none;
  border-radius: 0;
  font-size: 1rem;
  background-color: var(--mid);
  color: var(--primary);
}

._content ._settings .row {
  padding: 0.5rem 0;
}

._content ._settings .row:first-child {
  padding: 0 0 0.5rem 0;
}
</style>
