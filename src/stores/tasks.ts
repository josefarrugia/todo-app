import { defineStore } from 'pinia';
import type { Task } from '@/types/task';
import { useToastStore } from '@/stores/toast';

const url: string = 'https://dummyjson.com/todos';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    items: [] as Array<Task>
  }),

  getters: {
    getItemsCompleted: (state) => state.items.filter((item) => item.completed),

    getItemsIncomplete: (state) => state.items.filter((item) => !item.completed)
  },

  actions: {
    async loadTasksFromAPI(): Promise<void> {
      const storeToast = useToastStore();

      try {
        const response = await fetch(url);

        if (!response.ok) {
          storeToast.showToast(`Response status: ${response.status}`);

          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        this.items = json.todos;
      } catch (error: any) {
        console.error(error.message);
      }
    },

    async addTask(todo: string): Promise<void> {
      const storeToast = useToastStore();

      try {
        const response = await fetch(`${url}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            todo: todo,
            userId: Math.floor(Math.random() * 100) // randomly generate userID so that API would accept request
          })
        });

        if (!response.ok) {
          storeToast.showToast(`Response status: ${response.status}`);

          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        this.items.unshift(json);
        storeToast.showToast('Task has been added');
      } catch (error: any) {
        storeToast.showToast(error.message);
        console.error(error.message);
      }
    },

    async updateTask(task, id: number): Promise<void> {
      const storeToast = useToastStore();

      try {
        const response = await fetch(`${url}/${id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            todo: task.todo,
            completed: task.completed
          })
        });

        if (!response.ok) {
          storeToast.showToast(`Response status: ${response.status}`);

          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        console.log(json);
        storeToast.showToast('Task has been updated');
      } catch (error: any) {
        storeToast.showToast(error.message);
        console.error(error.message);
      }
    },

    async deleteTask(id: number): Promise<void> {
      const storeToast = useToastStore();

      try {
        const response = await fetch(`${url}/${id}/`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          storeToast.showToast(`Response status: ${response.status}`);

          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        const { isDeleted } = json;

        if (isDeleted) {
          const indexOfDeletedTask = this.items.findIndex((item) => item.id === id);

          this.items.splice(indexOfDeletedTask, 1);
          storeToast.showToast('Task has been deleted');
        }
      } catch (error: any) {
        storeToast.showToast(error.message);
        console.error(error.message);
      }
    }
  }
});
