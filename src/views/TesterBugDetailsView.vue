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
    <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Détails du bug</h1>
        <div class="flex flex-col gap-2">
        <p class="text-lg font-semibold">Titre : {{ bug.title }}</p>
        <p class="text-lg font-semibold">Description : {{ bug.description }}</p>
        <p class="text-lg font-semibold">Démarches de récréation du bug : {{ bug.stepsToReproduce }}</p>
        <p class="text-lg font-semibold">Priorité : {{ bug.priority }}</p>
        <p class="text-lg font-semibold">catégorie : {{ bug.category }}</p>
        </div>
    </div>
</template>