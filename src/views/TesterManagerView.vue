<script setup lang="ts">


// TODO WORK IN PROGRESS

// FORMULAIREE AJOUT DE TESTEURS ET REMOVE TESTERS


import { ref, onMounted } from 'vue';

const testers = ref([]); // List of testers
 // Currently selected tester
const bugs = ref([]); // Bugs for the selected tester
const error = ref<string | null>(null); // Error message

// Fetch bugs for a specific tester
async function fetchBugsForTester(testerId: number) {
    try {
        const response = await fetch(`http://localhost:3000/bugs?userId=${testerId}`); // Fetch bugs by userId
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des bogues pour ce testeur.');
        }
        bugs.value = await response.json();
    } catch (err) {
        error.value = (err as Error).message;
    }
}

async function removeTester(testerId: number) {
    try {
        const response = await fetch(`http://localhost:3000/users/${testerId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du testeur.');
        }
        // Update the testers list and reset selected tester if necessary
        testers.value = testers.value.filter((tester: any) => tester.id !== testerId);
        if (selectedTester.value?.id === testerId) {
            selectedTester.value = null;
            bugs.value = [];
        }
    } catch (err) {
        error.value = (err as Error).message;
    }
}

// Fetch testers on component mount
onMounted(() => {
    fetchTesters();
});
</script>

<template>
 
</template>