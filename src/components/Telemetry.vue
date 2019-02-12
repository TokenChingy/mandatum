<template>
  <div>
    <div class="row _title">
      <div class="column _text">Telemetry</div>
    </div>
    <div class="row _data">
      <div class="row _datum" v-for="(state, property) in telloState" :key="property">
        <div class="column left _50" :title="toStartCase(state.humanName)">{{property}}</div>
        <div class="column right _25">
          <mark>{{state.value || 'null'}}</mark>
        </div>
        <div class="column right _25">{{state.unit}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Dgram from "dgram";
import _ from "lodash";

export default {
  name: "telemetry",
  methods: {
    toStartCase: function(text) {
      return _.startCase(text);
    }
  },
  data: function() {
    return {
      telloSocket: Dgram.createSocket("udp4", {
        reuseAddr: true
      }).bind(8890),
      telloState: {
        pitch: {
          humanName: "pitch",
          value: null,
          unit: "deg"
        },
        roll: {
          humanName: "roll",
          value: null,
          unit: "deg"
        },
        yaw: {
          humanName: "yaw",
          value: null,
          unit: "deg"
        },
        vgx: {
          humanName: "x axis speed",
          value: null,
          unit: "cm/s"
        },
        vgy: {
          humanName: "y axis speed",
          value: null,
          unit: "cm/s"
        },
        vgz: {
          humanName: "z axis speed",
          value: null,
          unit: "cm/s"
        },
        templ: {
          humanName: "lowest temperature",
          value: null,
          unit: "°C"
        },
        temph: {
          humanName: "highest temperature",
          value: null,
          unit: "°C"
        },
        tof: {
          humanName: "time of flight distance",
          value: null,
          unit: "cm"
        },
        h: {
          humanName: "height",
          value: null,
          unit: "cm"
        },
        bat: {
          humanName: "battery",
          value: null,
          unit: "%"
        },
        baro: {
          humanName: "barometer",
          value: null,
          unit: "cm"
        },
        time: {
          humanName: "motor run time",
          value: null,
          unit: "s"
        },
        agx: {
          humanName: "x axis acceleration",
          value: null,
          unit: "cm/s"
        },
        agy: {
          humanName: "y axis acceleration",
          value: null,
          unit: "cm/s"
        },
        agz: {
          humanName: "z axis acceleration",
          value: null,
          unit: "cm/s"
        }
      }
    };
  },
  mounted: function() {
    this.telloSocket.on("message", bytes => {
      const telloStateArray = bytes.toString().split(";");

      for (let i = 0; i < telloStateArray.length; i++) {
        let keyValuePair = telloStateArray[i].split(":");

        if (this.telloState[keyValuePair[0]]) {
          this.telloState[keyValuePair[0]].value = keyValuePair[1];
        }
      }
    });
  }
};
</script>

<style scoped>
._title {
  text-align: center;
}

._title ._text {
  padding: 0.5rem;
}

._data {
  height: calc(100% - 5.125rem);
  padding: 1rem;
  overflow-y: scroll;
}

._datum {
  flex-basis: 100%;
  padding: 0.125rem 0;
}
</style>
