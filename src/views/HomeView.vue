<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStore';
import { useRouter } from 'vue-router';

const profileStore = useProfileStore();
const router = useRouter();

function goToBugList() {
  if (profileStore.isLeadDev) {
    router.push('/devBugList');
  } else {
    router.push('/testerBugList');
  }
}
</script>

<template>
  <div class="home container mt-4">
    <h1 class="text-center mb-4">Accueil</h1>
    <p class="text-center">
      Lead dev login: <strong>test@test.com</strong> et mdp: <strong>test</strong>
    </p>
    <div class="d-flex justify-content-center mt-4">
      <button class="btn btn-primary" @click="goToBugList">
        Voir la liste des bugs
      </button>
    </div>
  </div>
</template>
