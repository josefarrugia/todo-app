<script lang="ts" setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import ButtonAdd from '@/components/Button/ButtonAdd.vue';
import FormInputText from '@/components/Form/FormInputText.vue';
import { useToastStore } from '@/stores/toast';

const storeTask = useTaskStore();
const storeToast = useToastStore();

const todo = ref('');

const handleAddTask = async () => {
  if (todo.value.length > 3) {
    await storeTask.addTask(todo.value);
  } else {
    storeToast.showToast('Please write a longer task description');
  }

  todo.value = '';
};
</script>

<template>
  <h2 class="text-blue-500 text-lg font-bold">Add new task</h2>
  <form class="flex py-2 gap-2" action="" @submit.prevent="handleAddTask">
    <FormInputText
      class="flex-1"
      name="todo-add"
      id="todo-add"
      label="Add new task"
      v-model:input-value="todo"
      placeholder="Add new task here..."
    />
    <ButtonAdd type="submit" class="border-none" />
  </form>
</template>
