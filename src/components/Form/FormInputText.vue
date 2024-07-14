<script lang="ts" setup>
import type { FormInputText } from '@/types/form';

const props = defineProps<FormInputText>();

const inputValue = defineModel<string>('inputValue');
</script>

<template>
  <label :for="props.id">
    <input
      class="appearance-none bg-blue-50 w-full hover:bg-blue-100 px-4 outline-none rounded-lg"
      :class="{ 'line-through': props.hasStrikeThrough }"
      type="text"
      :name="props.name"
      :id="props.id"
      v-model="inputValue"
      autocomplete="off"
    />
    <span class="sr-only">{{ props.label }}</span>
  </label>
</template>
