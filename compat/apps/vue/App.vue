<template>
  <pre id="status">{{ status }}</pre>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { runSmoke } from "./smoke.mjs";

const status = ref("running");
onMounted(async () => {
  const results = await runSmoke();
  window.__SMOKE_RESULTS__ = results;
  status.value = JSON.stringify(results);
});
</script>
