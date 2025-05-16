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
    title: '',
    description: '',
    stepsToReproduce: '',
    priority: 'Low',
    category: '',
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
    <div class="container mt-4">
      <h1 class="text-center mb-4">Création d'un bug</h1>
      <form @submit.prevent="createBug" class="card p-4">
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input
            type="text"
            id="title"
            class="form-control"
            placeholder="Titre"
            v-model="bug.title"
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            class="form-control"
            placeholder="Description"
            rows="3"
            v-model="bug.description"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="stepsToReproduce" class="form-label">Étapes de reproduction</label>
          <textarea
            id="stepsToReproduce"
            class="form-control"
            placeholder="Étapes de reproduction"
            rows="3"
            v-model="bug.stepsToReproduce"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="priority" class="form-label">Priorité</label>
          <select id="priority" class="form-select" v-model="bug.priority">
            <option v-for="(option, key) in priority" :key="key" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Catégorie</label>
          <select id="category" class="form-select" v-model="bug.category">
            <option v-for="(category, index) in categories" :key="index" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="visibility" class="form-label">Visibilité</label>
          <select id="visibility" class="form-select" v-model="bug.visibility">
            <option v-for="(option, key) in visibility" :key="key" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <button type="submit" class="btn btn-primary w-100">Soumettre le bug</button>
      </form>
    </div>
  </template>