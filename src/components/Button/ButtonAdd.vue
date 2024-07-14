<script lang="ts" setup>
import ButtonBase from '@/components/Button/ButtonBase.vue';
import { PlusCircleIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <ButtonBase :has-padding="false">
    <PlusCircleIcon class="w-8 h-8 fill-green-600" />
  </ButtonBase>
</template>
