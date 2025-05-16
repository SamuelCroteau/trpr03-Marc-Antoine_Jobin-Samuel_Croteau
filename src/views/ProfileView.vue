<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProfileStore } from '../stores/profileStore'

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const onError = computed(() => profileStore.onError)

onMounted(async () => {
  try {
    await profileStore.getProfile()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération du profil de l'utilisateur.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})
</script>

<template>
  <div class="container mt-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h1 class="text-center mb-0">Profil</h1>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <h5 class="card-title">Nom</h5>
          <p class="card-text">{{ name }}</p>
        </div>
        <div class="mb-3">
          <h5 class="card-title">Courriel</h5>
          <p class="card-text">{{ email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>