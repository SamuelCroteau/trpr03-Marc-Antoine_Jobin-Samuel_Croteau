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
    router.push('/devBugCreation');
}

function goToBugDetails(bugId: number) {
    router.push(`/bugs/${bugId}`);
}

onMounted(() => {
    fetchBugs();
});

</script>
<template>
    <div class="container mt-4">
        <h1 class="text-center mb-4">Liste des bugs</h1>
        <div class="d-flex justify-content-end mb-3">
            <button
                class="btn btn-primary"
                @click="goToAddBugPage"
            >
                Ajouter un bug
            </button>
        </div>
        <ul class="list-group">
            <li
                v-for="(bug, index) in bugs"
                :key="index"
                class="list-group-item d-flex justify-content-between align-items-center"
            >
                <div>
                    <h5 class="mb-1">{{ bug.title }}</h5>
                    <p class="mb-1 text-muted">{{ bug.description }}</p>
                    <span class="badge bg-secondary">{{ bug.category }}</span>
                </div>
                <button
                    class="btn btn-success"
                    @click="goToBugDetails(index)"
                >
                    Voir les détails
                </button>
            </li>
        </ul>
    </div>
</template>