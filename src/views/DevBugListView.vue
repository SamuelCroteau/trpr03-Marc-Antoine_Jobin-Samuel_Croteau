<script setup lang="ts">
//TODO    -	Voir la liste des bogues (testeur, description, catégorie, etc.)
//        -	Ajouter un bogue Bouton vers la page d'ajout de bogue
//        -	Bouton sur chaques bugs pour le detail (detail view)
//        -	Supprimer un bogue (indiquer comme résolu + isCritical en bd a false)

//        -	Si leadDev
//        -	Bouton pour bloquer la saisie de bogues pour tout le monde
//        -	Bouton (sur chanque bogue) pour notifier la team d'un bug critique (modal) (isCritical en bd a true)

// ICI VISIBILITY LEAD DEV

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Bug } from '@/types/Bug';

const router = useRouter();
const bugs = ref<Bug[]>([]);

async function fetchBugs() {
    const response = await fetch('http://localhost:3000/bugs');
    if (!response.ok) {
        throw new Error('Error fetching bugs');
    }
    bugs.value = await response.json();
}

function goToAddBugPage() {
    router.push('/testerBugCreation');
}

function goToBugDetails(bugId: number) {
    router.push(`/bugs/${bugId}`);
}

onMounted(() => {
    fetchBugs();
});

</script>
<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Liste des bugs</h1>
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded"
            @click="goToAddBugPage"
        >
            Ajouter un bug
        </button>
        <ul class="flex flex-col gap-2">
            <li
                v-for="(bug, index) in bugs"
                :key="index"
                class="p-4 border rounded flex justify-between items-center"
            >
                <div>
                    <p class="font-semibold">Titre : {{ bug.title }}</p>
                    <p>Description : {{ bug.description }}</p>
                    <p>Catégorie : {{ bug.category }}</p>
                </div>
                <button
                    class="px-4 py-2 bg-green-500 text-white rounded"
                    @click="goToBugDetails(index)" <!-- Pass the index instead of id -->
                >
                    Voir les détails
                </button>
            </li>
        </ul>
    </div>
</template>