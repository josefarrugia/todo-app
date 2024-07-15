<script lang="ts" setup>
import { computed, ref } from 'vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';
import {
  FILTER_OPTION_ALL,
  FILTER_OPTION_COMPLETE,
  FILTER_OPTION_INCOMPLETE
} from '@/constants/filterOptions';

const filterBy = ref(FILTER_OPTION_ALL);

const filterOptions = computed(() => [
  FILTER_OPTION_ALL,
  FILTER_OPTION_COMPLETE,
  FILTER_OPTION_INCOMPLETE
]);

const emit = defineEmits(['change']);

const handleFilter = (option: string) => {
  filterBy.value = option;

  emit('change', filterBy.value);
};
</script>

<template>
  <section class="flex flex-col gap-2 lg:items-center">
    <h3 class="font-bold text-lg">Filter by:</h3>
    <div class="flex gap-2">
      <ButtonPrimary
        v-for="option in filterOptions"
        :key="option"
        class="capitalize min-w-16 lg:min-w-28"
        :class="{ 'bg-green-500 text-white': filterBy === option }"
        @click="handleFilter(option)"
        >{{ option }}</ButtonPrimary
      >
    </div>
  </section>
</template>
