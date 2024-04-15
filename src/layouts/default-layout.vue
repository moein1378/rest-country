<script lang="ts" setup>
import { useQuasar } from "quasar";
import { reactive, ref } from "vue";

// SHARED
const $q = useQuasar();

// THEME MODE
const themeModeSwitch = reactive({
  icon: "o_light_mode",
  label: "light mode",
});

// THEME CONTROL
const isDarkMode = ref(false);
function triggerTheme(value: boolean) {
  if (value) {
    themeModeSwitch.icon = "o_dark_mode";
    themeModeSwitch.label = "dark mode";
  } else {
    themeModeSwitch.icon = "o_light_mode";
    themeModeSwitch.label = "light mode";
  }
  $q.dark.set(value);
}
function onSwitchThemeMode() {
  isDarkMode.value = !isDarkMode.value;
  triggerTheme(isDarkMode.value);
}
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <header class="q-pa-md shadow-3">
      <div class="row items-center justify-between q-pa-none">
        <div class="text-capitalize text-bold text-h6">where in the world?</div>
        <q-btn
          class="text-capitalize"
          flat
          :icon="themeModeSwitch.icon"
          :label="themeModeSwitch.label"
          @click="onSwitchThemeMode"
        />
      </div>
    </header>
    <q-page-container>
      <div class="q-pa-md">
        <slot />
      </div>
    </q-page-container>
  </q-layout>
</template>
