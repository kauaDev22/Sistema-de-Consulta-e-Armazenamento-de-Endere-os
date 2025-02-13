<script setup>
import { RouterLink, RouterView } from 'vue-router'
import CepList from './components/CepList.vue';
</script>

<template>
  <header class="bg-gray-800 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="logo">
        <!-- Adicione seu logo aqui -->
      </div>
      <nav class="flex space-x-4">
        <RouterLink to="/" class="hover:text-gray-400"></RouterLink>
        <RouterLink to="/about" class="hover:text-gray-400"></RouterLink>
        <!-- Adicione mais links conforme necessário -->
      </nav>
    </div>
  </header>

  <main class="container mx-auto py-8">
    <RouterView />
    <br>
    <CepList />
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
</style>
