<script setup lang="ts">
import type { Bug } from '@/types/Bug';
import { ref } from 'vue';
//import { }


// TODO: MARC

const bug = ref<Bug>({
    userId: 1,
    title: 'title',
    description: 'description',
    stepsToReproduce: 'stepsToReproduce',
    priority: 'priority',
    category: 'category',
    visibility: 'visibility'
});
const errorMessage = ref('');

const createBug = () => {
                if (bug.value.title.trim() === '') {
                    errorMessage.value = 'Un titre est requise.';
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
                        <select id="ship" v-model="bug.priority" >
                            <option v-for="ship in ships" :key="ship.id" :value="ship.name">{{ ship.name }}</option>
                        </select>
                    </div>
                    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                    <button type="submit" class="btn btn-outline-warning">Commencer la partie</button>
                </form>
            </div>
        </template>
</template>