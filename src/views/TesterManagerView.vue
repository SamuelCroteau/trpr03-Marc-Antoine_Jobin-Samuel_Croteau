<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import { useRouter } from 'vue-router';
import TesterCreation from '@/components/TesterCreation.vue';
import TesterList from '@/components/TesterList.vue';

const profileStore = useProfileStore();
const router = useRouter();

interface Tester {
  id: number;
  name: string;
  email: string;
  role: string;
}
const testers = ref<Tester[]>([]);

const user = ref({
  id: 0,
  name: '',
  email: '',
  role: '',
});



async function fetchTesters() {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error('Failed to fetch testers');
    }
    testers.value = await response.json();
  } catch (error) {
    console.error('Error fetching testers:', error);
  }
}

async function fetchUserProfile() {
  try {
    await profileStore.getProfile();
    user.value = {
      id: profileStore.userId,
      name: profileStore.name,
      email: profileStore.email,
      role: profileStore.isLeadDev ? 'leadDev' : 'tester',
    };

    if (user.value.role !== 'leadDev') {
      router.push('/');
    }
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    router.push('/login');
  }
}

function handleTesterAdded(newTester: Tester) {
  testers.value.push(newTester);
}

function handleTesterRemoved(testerId: number) {
  testers.value = testers.value.filter((tester) => tester.id !== testerId);
}

onMounted(() => {
  fetchUserProfile();
  fetchTesters();
});
</script>

<template>
  <div class="container mt-4 d-flex flex-column align-items-center">
    <div class="card shadow-sm w-100" style="max-width: 800px;">
      <div class="card-header bg-primary text-white">
        <h1 class="text-center mb-0">Gestion des testeurs</h1>
      </div>
      <div class="card-body">
        <div class="text-center mb-4">
          <p class="mb-0">
            Bienvenue, <strong>{{ user.name }}</strong> (<em>{{ user.email }}</em>)
          </p>
        </div>
        <div class="mb-4">
          <h5 class="text-center text-secondary mb-3">Ajouter un nouveau testeur</h5>
          <div class="d-flex justify-content-center">
            <TesterCreation @testerAdded="handleTesterAdded" />
          </div>
        </div>
        <div>
          <h5 class="text-center text-secondary mb-3">Liste des testeurs</h5>
          <div class="d-flex justify-content-center">
            <TesterList :testers="testers" @testerRemoved="handleTesterRemoved" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>