<script setup lang="ts">
import type { Bug } from '@/types/Bug';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const bug = ref<Bug | null>(null);

async function fetchBug() {
  const bugId = route.params.id;
  if (!bugId) return;

  const response = await fetch(`http://localhost:3000/bugs/${bugId}`);
  if (!response.ok) {
    throw new Error('Error fetching bug details');
  }
  bug.value = await response.json();
}

onMounted(() => {
  fetchBug();
});
</script>
<template>
    <div v-if="bug" class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold">Détails du bug</h1>
      <div class="flex flex-col gap-2">
        <p class="text-lg font-semibold">Titre : {{ bug.title }}</p>
        <p class="text-lg font-semibold">Description : {{ bug.description }}</p>
        <p class="text-lg font-semibold">Démarches de récréation du bug : {{ bug.stepsToReproduce }}</p>
        <p class="text-lg font-semibold">Priorité : {{ bug.priority }}</p>
        <p class="text-lg font-semibold">Catégorie : {{ bug.category }}</p>
      </div>
    </div>
  </template>