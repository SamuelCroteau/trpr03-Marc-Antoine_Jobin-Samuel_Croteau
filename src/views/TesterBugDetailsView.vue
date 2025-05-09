<script setup lang="ts">
import type { Bug } from '@/types/Bug';
//TODO : Afficher le component bug SAM

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