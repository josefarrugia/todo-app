<script lang="ts" setup>
interface ButtonBaseProps {
  hasPadding?: boolean;
}

const props = withDefaults(defineProps<ButtonBaseProps>(), {
  hasPadding: true
});
</script>

<template>
  <button
    type="button"
    class="font-bold rounded-full border transition-all"
    :class="{ 'p-2': props.hasPadding }"
  >
    <slot />
  </button>
</template>
