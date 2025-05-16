<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import bcrypt from 'bcryptjs';

const emits = defineEmits(['testerAdded']);

const newTesterName = ref('');
const newTesterEmail = ref('');
const newTesterPassword = ref('');
const newTesterRole = ref('tester');
const errorMessage = ref('');

async function addTester() {
  try {
    const hashedPassword = await bcrypt.hash(newTesterPassword.value, 10);

    const newTester = {
      name: newTesterName.value,
      email: newTesterEmail.value,
      password: hashedPassword,
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

    const responseData = await response.json();
    console.log('Created tester:', responseData);

    const createdTester = responseData.user;

    emits('testerAdded', createdTester);

    // reset form
    newTesterName.value = '';
    newTesterEmail.value = '';
    newTesterPassword.value = '';
    newTesterRole.value = 'tester';
    errorMessage.value = '';
  } catch (error) {
    console.error('Error adding tester:', error);
    errorMessage.value = 'Erreur lors de l’ajout du testeur. Veuillez réessayer.';
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
        required
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
        required
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
        required
      />
    </div>
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <button type="submit" class="btn btn-primary w-100">Ajouter un testeur</button>
  </form>
</template>