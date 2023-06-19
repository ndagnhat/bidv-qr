<script setup lang="ts">
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'

const { hasSidebar, hasAside, leftAside } = useSidebar()

</script>

<template>
  <div class="VPPage" :class="{ 'has-sidebar': hasSidebar }">
    <slot name="page-top" />
    <div class="page-main">
      <Content class="vp-page" />
    </div>
    <slot name="page-bottom" />
  </div>
</template>

<style scoped>

.VPPage {
  width: 100%;
}

.VPPage:not(.has-sidebar) .page-main {
  margin: 0 auto;
  max-width: calc(var(--vp-layout-max-width) - 64px);
}
</style>