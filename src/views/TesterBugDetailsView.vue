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
  <div class="container mt-4">
    <h1 class="text-center mb-4">Détails du bug</h1>
    <div v-if="bug" class="card">
      <div class="card-body">
        <h5 class="card-title">Titre : {{ bug.title }}</h5>
        <p class="card-text">
          <strong>Description :</strong> {{ bug.description }}
        </p>
        <p class="card-text">
          <strong>Démarches de récréation :</strong> {{ bug.stepsToReproduce }}
        </p>
        <p class="card-text">
          <strong>Priorité :</strong>
          <span
            :class="{
              'badge bg-danger': bug.priority === 'High',
              'badge bg-warning text-dark': bug.priority === 'Medium',
              'badge bg-success': bug.priority === 'Low',
            }"
          >
            {{ bug.priority }}
          </span>
        </p>
        <p class="card-text">
          <strong>Catégorie :</strong>
          <span class="badge bg-secondary">{{ bug.category }}</span>
        </p>
      </div>
    </div>
  </div>
</template>