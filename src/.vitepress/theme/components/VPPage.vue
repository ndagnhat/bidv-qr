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
  padding: 24px;
}

.VPPage:not(.has-sidebar) .page-main {
  margin: 0 auto;
  max-width: 1125px;
}

@media (min-width: 768px) {
  .VPPage {
    padding: 32px;
  }
}
</style>