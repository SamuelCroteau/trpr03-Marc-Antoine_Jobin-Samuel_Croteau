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
    <form @submit.prevent="addTester">
      <div>
        <input type="text" placeholder="Nom du testeur" v-model="newTesterName" />
      </div>
      <div>
        <input type="email" placeholder="Email du testeur" v-model="newTesterEmail" />
      </div>
      <div>
        <input type="password" placeholder="Mot de passe du testeur" v-model="newTesterPassword" />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Ajouter un testeur</button>
    </form>
  </template>