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
  <ul class="list-group">
    <li
      v-for="tester in testers"
      :key="tester.id"
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <div>
        <h5 class="mb-1">Nom : {{ tester.name }}</h5>
        <p class="mb-1 text-muted">Email : {{ tester.email }}</p>
        <span class="badge bg-secondary">Rôle : {{ tester.role }}</span>
      </div>
      <button
        class="btn btn-danger"
        @click="removeTester(tester.id)"
      >
        Supprimer
      </button>
    </li>
  </ul>
</template>