<script setup lang="ts">
import type { Bug } from '@/types/Bug';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { priority } from '@/const/priority';
import { visibility } from '@/const/visibility';

// TODO: MARC
const router = useRouter();
const bug = ref<Bug>({
    userId: 1,
    title: 'title',
    description: 'description',
    stepsToReproduce: 'stepsToReproduce',
    priority: 'Low',
    category: 'Display',
    visibility: 'public'
});
const categories = ref([]);
const errorMessage = ref('');
fetch('http://localhost:3000/categories')
    .then(response => response.json())
    .then(data => {
        categories.value = data;
    })

            const createBug = async () => {
                if (bug.value.title.trim() === '') {
                    errorMessage.value = 'Un titre est requis.';
                    return;
                }
                if(bug.value.description.trim() === '') {
                    errorMessage.value = 'Une description du bug est requise.';
                    return;
                }
                if(bug.value.stepsToReproduce.trim() === '') {
                    errorMessage.value = 'Les étapes de reproduction sont requises.';
                    return;
                }
                errorMessage.value = '';
                //TODO envoyer tout ca dans la bd, ensuite router.push vers la liste de bugs
                //TODO pas oublier le userId, prendre celui du user authentifie
                const response = await fetch('http://localhost:3000/bugs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bug.value), // TODO changer prendre userId et potentiellement prendre infos en haut
                });
                router.push('/TesterBugList');
            };
</script>
<template>
    <template>
            <div class="character-creation">
                <h1>Création d'un bug</h1>
                <form @submit.prevent="createBug">
                    <div>
                        <input type="text" placeholder="titre" id="title" v-model="bug.title" />
                    </div>
                    <div>
                        <input type="text" placeholder="description" id="description" v-model="bug.description" />
                    </div>
                    <div>
                        <input type="text" placeholder="Steps to Reproduce" id="stepsToReproduce" v-model="bug.stepsToReproduce" />
                    </div>
                    <div>
                        <select id="priority" v-model="bug.priority" >
                            <option v-for="(option, key) in priority" :key="option.id" :value="option.value"></option>
                        </select>
                    </div>
                    <div>
                        <select id="category" v-model="bug.category">
                            <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
                        </select>
                    </div>
                    <div>
                        <select id="visibility" v-model="bug.visibility" >
                            <option v-for="(option, key) in priority" :key="option.id" :value="option.value"></option>
                        </select>
                    </div>
                    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                    <button type="submit" class="btn btn-outline-warning">Soumettre le bug</button>
                </form>
            </div>
        </template>
</template>