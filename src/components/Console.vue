<template>
  <div>
    <div class="row _command">
      <div class="column _prompt">
        <label>Ryze-Tello:~ {{getUserName}}$</label>
        <input type="text" autofocus="true" autocomplete="off">
      </div>
    </div>
    <div class="row _responses">
      <ul>
        <li class="column" v-for="(response, index) in telloResponses" :key="index">
          <span>[{{response.ts}}] Ryze-Tello: {{response.msg}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Dgram from "dgram";

function constructRCCommand(rc) {
  const command = `rc ${rc[0]} ${rc[1]} ${rc[2]} ${rc[3]}`;
  return [command, command.length];
}

export default {
  name: "console",
  computed: {
    ...mapGetters(["getUserName"])
  },
  data: function() {
    return {
      telloSocket: Dgram.createSocket("udp4", {
        reuseAddr: true
      }).bind(8889),
      telloResponses: [],
      history: {
        commands: [],
        commandCount: 0,
        keyCount: 0
      }
    };
  },
  mounted: function() {
    const commandPrompt = document.querySelector("._command ._prompt input");

    Controller.search();

    window.addEventListener("gc.controller.found", found => {
      const rc = [0, 0, 0, 0];

      window.addEventListener("gc.analog.hold", event => {
        const stick = event.detail;

        switch (stick.name) {
          case "LEFT_ANALOG_STICK":
            rc[0] = Math.floor(stick.position.x * 100);
            rc[1] = Math.floor(stick.position.y * 100) * -1;
            break;
          case "RIGHT_ANALOG_STICK":
            rc[2] = Math.floor(stick.position.y * 100) * -1;
            rc[3] = Math.floor(stick.position.x * 100);
            break;
          default:
            break;
        }

        let command = constructRCCommand(rc);

        this.telloSocket.send(
          command[0],
          0,
          command[1],
          8889,
          "192.168.10.1",
          error => {
            if (error) throw error;
          }
        );
      });

      window.addEventListener("gc.analog.end", event => {
        const stick = event.detail;

        switch (stick.name) {
          case "LEFT_ANALOG_STICK":
            rc[0] = Math.floor(stick.position.x * 100);
            rc[1] = Math.floor(stick.position.y * 100);
            break;
          case "RIGHT_ANALOG_STICK":
            rc[2] = Math.floor(stick.position.y * 100);
            rc[3] = Math.floor(stick.position.x * 100);
            break;
          default:
            break;
        }

        let command = constructRCCommand(rc);

        this.telloSocket.send(
          command[0],
          0,
          command[1],
          8889,
          "192.168.10.1",
          error => {
            if (error) throw error;
          }
        );
      });

      window.addEventListener("gc.button.press", event => {
        const button = event.detail;
        console.log(button);
      });
    });

    commandPrompt.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 13:
          if (commandPrompt.value !== "") {
            const command = _.toLower(commandPrompt.value);

            this.history.commandCount++;
            this.history.keyCount = 0;
            this.history.commands[this.history.commandCount] = command;

            switch (command) {
              case "clear":
                const responsesElement = document.querySelector(
                  "._responses ul"
                );
                while (responsesElement.firstChild) {
                  responsesElement.removeChild(responsesElement.firstChild);
                }

                this.telloResponses.length = 0;
                break;
              default:
                this.telloSocket.send(
                  command,
                  0,
                  command.length,
                  8889,
                  "192.168.10.1",
                  error => {
                    if (error) throw error;
                  }
                );

                break;
            }

            commandPrompt.value = "";
          }
          break;
        case 38:
          if (this.history.keyCount < this.history.commands.length)
            this.history.keyCount += 1;

          if (
            typeof this.history.commands[
              this.history.commands.length - this.history.keyCount
            ] !== "undefined"
          )
            commandPrompt.value = this.history.commands[
              this.history.commands.length - this.history.keyCount
            ];
          break;
        case 40:
          if (this.history.keyCount > 0) this.history.keyCount -= 1;

          if (
            typeof this.history.commands[
              this.history.commands.length - this.history.keyCount
            ] !== "undefined"
          )
            commandPrompt.value = this.history.commands[
              this.history.commands.length - this.history.keyCount
            ];
          break;
        default:
          break;
      }
    });

    this.telloSocket.on("message", bytes => {
      this.telloResponses.unshift({
        ts: new Date().toLocaleTimeString(),
        msg: bytes.toString()
      });
    });
  }
};
</script>

<style scoped>
._command ._prompt {
  display: flex;
  padding: 0 1rem;
}

._command ._prompt label {
  padding: 0.25rem 0;
}

._command ._prompt input {
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

._command ._prompt input:focus {
  background-color: var(--light);
  caret-color: var(--secondary);
}

._responses {
  height: calc(100% - 4.625rem);
  padding: 1rem 1rem 2rem 1rem;
  overflow-y: scroll;
}

._responses ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
._responses ul li {
  padding: 0.125rem 0;
  color: var(--primary);
}

._responses ul li:last-child {
  padding-bottom: 1rem;
}
</style>
