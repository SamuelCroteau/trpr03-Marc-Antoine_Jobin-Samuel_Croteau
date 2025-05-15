<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  testers: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(['testerRemoved']);
async function removeTester(id: number) {
  try {
    console.log(`Attempting to remove tester with ID: ${id}`);
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove tester');
    }

    console.log(`Tester with ID: ${id} removed successfully`); 
    emits('testerRemoved', id);
  } catch (error) {
    console.error('Error removing tester:', error);
  }
}
</script>

<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="tester in testers"
      :key="tester.id"
      class="p-4 border rounded flex justify-between items-center"
    >
      <div>
        <p class="font-semibold">Nom : {{ tester.name }}</p>
        <p>Email : {{ tester.email }}</p>
        <p>Rôle : {{ tester.role }}</p>
      </div>
      <button
        class="px-4 py-2 bg-red-500 text-white rounded"
        @click="removeTester(tester.id)"
      >
        Supprimer
      </button>
    </li>
  </ul>
</template>