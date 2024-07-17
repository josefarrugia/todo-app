<script lang="ts" setup>
import { useTaskStore } from '@/stores/tasks';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline';
import FormCheckbox from '@/components/Form/FormCheckbox.vue';
import FormInputText from '@/components/Form/FormInputText.vue';
import { watch } from 'vue';

interface TodoItemProps {
  id: number;
  userId: number;
}

const props = defineProps<TodoItemProps>();

const todo = defineModel<string>('todo', { default: '' });
const completed = defineModel<boolean>('completed', { default: false });

const taskStore = useTaskStore();

const handleUpdateTask = async () => {
  await taskStore.updateTask(
    {
      todo: todo.value,
      completed: completed.value
    },
    props.id
  );
};

const handleDeleteTask = async () => {
  await taskStore.deleteTask(props.id);
};

watch(completed, async () => {
  await handleUpdateTask();
});
</script>

<template>
  <li class="group" :class="{ 'opacity-50': completed }">
    <div class="flex gap-2 lg:relative">
      <div
        class="flex flex-1 gap-2 bg-blue-50 p-2 rounded-2xl shadow-2xl shadow-blue-50 border-2 border-blue-100"
      >
        <div class="pl-2 flex items-center">
          <FormCheckbox
            :id="`todo-completed-status-${props.id}`"
            name="todo-completed-status"
            label="Is task done?"
            v-model:input-checkbox="completed"
          />
        </div>
        <div class="flex-1">
          <FormInputText
            :id="`todo-description-${props.id}`"
            name="todo-description"
            label="Task description"
            :has-strike-through="completed"
            v-model:input-value="todo"
            @keydown.enter="handleUpdateTask"
          />
        </div>
      </div>

      <div
        class="lg:absolute lg:-right-20 lg:h-full flex items-center transition-all lg:opacity-0 group-hover:lg:opacity-100"
      >
        <div class="flex gap-2">
          <ButtonSecondary data-testid="button-edit" @click="handleUpdateTask">
            <PencilIcon class="w-4 h-4" />
          </ButtonSecondary>
          <ButtonSecondary data-testid="button-delete" @click="handleDeleteTask">
            <TrashIcon class="w-4 h-4" />
          </ButtonSecondary>
        </div>
      </div>
    </div>
  </li>
</template>
