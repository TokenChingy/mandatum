<template>
  <div>
    <div class="row">
      <div class="column _25">
        <telemetry id="telemetry"/>
      </div>
      <div class="column _75">
        <workspace id="workspace"/>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <console id="console"/>
      </div>
    </div>
  </div>
</template>

<script>
import Console from "@/components/Console.vue";
import Telemetry from "@/components/Telemetry.vue";
import Workspace from "@/components/Workspace.vue";

export default {
  name: "dashboard",
  components: {
    Console,
    Telemetry,
    Workspace
  }
};
</script>

<style scoped>
#console {
  height: 33.3vh;
}

#telemetry {
  height: 66.6vh;
}

#workspace {
  height: 66.6vh;
}
</style>
