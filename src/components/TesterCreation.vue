<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';

const emits = defineEmits(['testerAdded']);

const newTesterName = ref('');
const newTesterEmail = ref('');
const newTesterPassword = ref('');
const newTesterRole = ref('tester');

async function addTester() {
  try {
    const newTester = {
      name: newTesterName.value,
      email: newTesterEmail.value,
      password: newTesterPassword.value,
      role: newTesterRole.value,
    };

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTester),
    });

    if (!response.ok) {
      throw new Error('Failed to add tester');
    }

    const createdTester = await response.json();

    emits('testerAdded', createdTester);

    newTesterName.value = '';
    newTesterEmail.value = '';
    newTesterPassword.value = '';
    newTesterRole.value = 'tester';
  } catch (error) {
    console.error('Error adding tester:', error);
  }
}

</script>
<template>
  <form @submit.prevent="addTester" class="card p-4 shadow-sm">
    <div class="mb-3">
      <label for="testerName" class="form-label">Nom du testeur</label>
      <input
        type="text"
        id="testerName"
        class="form-control"
        placeholder="Nom du testeur"
        v-model="newTesterName"
      />
    </div>
    <div class="mb-3">
      <label for="testerEmail" class="form-label">Email du testeur</label>
      <input
        type="email"
        id="testerEmail"
        class="form-control"
        placeholder="Email du testeur"
        v-model="newTesterEmail"
      />
    </div>
    <div class="mb-3">
      <label for="testerPassword" class="form-label">Mot de passe</label>
      <input
        type="password"
        id="testerPassword"
        class="form-control"
        placeholder="Mot de passe"
        v-model="newTesterPassword"
      />
    </div>
    <button type="submit" class="btn btn-primary w-100">Ajouter un testeur</button>
  </form>
</template>