<script setup lang="ts">
import TodoList from '@/components/Todo/TodoList.vue';
import TodoAdd from '@/components/Todo/TodoAdd.vue';
</script>

<template>
  <main>
    <div class="container px-4 max-w-screen-sm mx-auto">
      <TodoAdd />

      <TodoList />
    </div>
  </main>
</template>
