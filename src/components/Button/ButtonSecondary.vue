<script lang="ts" setup>
import ButtonBase from '@/components/Button/ButtonBase.vue';
</script>

<template>
  <ButtonBase class="hover:bg-red-500 hover:text-white">
    <slot />
  </ButtonBase>
</template>
