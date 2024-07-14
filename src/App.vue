<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useToastStore } from '@/stores/toast';
import ToastNotification from '@/components/Toast/ToastNotification.vue';

const storeToast = useToastStore();
</script>

<template>
  <ToastNotification v-if="storeToast.getStatus">
    {{ storeToast.getMessage }}
  </ToastNotification>

  <RouterView />
</template>
