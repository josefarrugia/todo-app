<script setup lang="ts">
import TodoList from '@/components/Todo/TodoList.vue';
import TodoAdd from '@/components/Todo/TodoAdd.vue';
</script>

<template>
  <main>
    <div class="container px-4 max-w-screen-sm mx-auto py-4">
      <h1 class="text-3xl mb-8 font-bold">Farrugia – Todo App</h1>
      <TodoAdd />
      <hr class="my-4 bg-blue-500" />
      <TodoList />
    </div>
  </main>
</template>
