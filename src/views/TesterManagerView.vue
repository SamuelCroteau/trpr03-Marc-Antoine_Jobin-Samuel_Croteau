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
    <div v-if="user.role === 'leadDev'" class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold">Gestion des testeurs</h1>
      <p>Bienvenue, {{ user.name }} ({{ user.email }})</p>
      <TesterCreation @testerAdded="handleTesterAdded" />
      <TesterList :testers="testers" @testerRemoved="handleTesterRemoved" />
    </div>
  </template>