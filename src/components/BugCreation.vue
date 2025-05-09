<script setup lang="ts">
import { ref } from 'vue';

// TODO MARC
</script>

<template>
    <div class="bug-creation">
        <h1>Bug Creation</h1>
        <p>TODO: MARC</p>
    </div>
    <div class="bug-creation-form">
        <form @submit.prevent="submitBug">
            <label for="title">Titre:</label>
            <input type="text" id="title" v-model="bug.title" required />

            <label for="description">Description:</label>
            <textarea id="description" placeholder="Description de votre bug ici" v-model="bug.description" required></textarea>

            <label for="stepsToReproduce">Steps to Reproduce:</label>
            <textarea id="stepsToReproduce" v-model="bug.stepsToReproduce" required></textarea>

            <label for="priority">Priorité:</label>
            <select id="priority" v-model="bug.priority" required>
                <option value="low">Faible</option>
                <option value="medium">Médium</option>
                <option value="high">Haute</option>
            </select>

            <label for="category">Catégorie:</label>
            <select id="category" v-model="bug.category" required>
                <option value="visual">Visuel</option>
                <option value="functional">Fonctionnel</option>
                <option value="performance">Performance</option>
                <option value="other">Autre</option>
            </select>

            <label for="visibility">Visibilité:</label>
            <select id="visibility" v-model="bug.visibility" required>
                <option value="public">Tous</option>
                <option value="private">Lead dev</option> <!-- A voir dans l'enonce -->
            </select>

            <button type="submit">Créer Bug</button>
        </form>
    </div>

</template>

