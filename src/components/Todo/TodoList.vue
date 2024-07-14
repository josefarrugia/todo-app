<script lang="ts" setup>
import TodoItem from '@/components/Todo/TodoItem.vue';
import { computed, onBeforeMount, ref } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import TodoFilterOptions from '@/components/Todo/TodoFilterOptions.vue';

const storeTodo = useTaskStore();
const { items, getItemsCompleted, getItemsIncomplete } = storeToRefs(storeTodo);

const filterBy = ref('');

const filteredItems = computed(() => {
  switch (filterBy.value) {
    case 'complete':
      return getItemsCompleted.value;

    case 'incomplete':
      return getItemsIncomplete.value;

    case 'all':
    default:
      return items.value;
  }
});

const handleFilterOptions = (option: string) => {
  filterBy.value = option;
};

onBeforeMount(async () => {
  await storeTodo.loadTasksFromAPI();
});
</script>

<template>
  <TodoFilterOptions @change="handleFilterOptions" />
  <ul class="flex flex-col gap-4">
    <TodoItem
      v-for="item in filteredItems"
      :key="item.id"
      :id="item.id"
      :user-id="item.userId"
      v-model:todo="item.todo"
      v-model:completed="item.completed"
    />
  </ul>
</template>
