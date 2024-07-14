<script lang="ts" setup>
import type { FormCheckbox } from '@/types/form';

const props = defineProps<FormCheckbox>();

const inputCheckbox = defineModel('inputCheckbox');
</script>

<template>
  <label class="flex items-center" :for="props.id">
    <input
      type="checkbox"
      :name="props.name"
      :id="props.id"
      class="w-5 h-5"
      v-model="inputCheckbox"
    />
    <span class="sr-only">{{ props.label }}</span>
  </label>
</template>
