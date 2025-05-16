<script setup lang="ts">
import type { Bug } from '@/types/Bug';
import { ref } from 'vue';

//TODO : Afficher le component bug SAM

const bug = ref<Bug>({
    title: '',
    description: '',
    stepsToReproduce: '',
    priority: '',
    category: '',
    visibility: '',
    userId: 0 
});

// A TESTER 
fetchBug();
async function fetchBug() {
    const response = await fetch('http://localhost:3000/bug/1'); // faire en sorte de prendre l'id du bug dans l'url
    if (!response.ok) {
        throw new Error('Error when bug fetched');
    }
    const data = await response.json();
    bug.value = data;
}

</script>
<template>
    <div class="container mt-4">
    <h1 class="text-center mb-4">Détails du bug</h1>
    <div class="card">
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
        <p class="card-text">
          <strong>Visibilité :</strong> {{ bug.visibility }}
        </p>
        </div>
        </div>
    </div>
</template>
