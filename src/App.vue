<template>
  <main>
    <component :is="layout || 'div'">
      <router-view />
    </component>
  </main>
</template>
<script lang="ts" setup>
import { shallowRef } from "vue";
import type { ComponentInternalInstance } from "vue";
import { router } from "./router";
import { layouts } from "@/layouts/layouts";
import type { LayoutName } from "@/layouts/layouts.type";

const layout = shallowRef<Partial<ComponentInternalInstance | "div">>();

router.afterEach((to) => {
  const pageLayout: LayoutName = to.meta.layout as LayoutName;
  if (pageLayout) layout.value = layouts[pageLayout] || "div";
  else layout.value = layouts["defaultLayout"] || "div";
});
</script>
