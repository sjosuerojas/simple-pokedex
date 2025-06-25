<script setup lang="ts">
import MainLayout from "@/components/layouts/MainLayout.vue";
import { ref } from "vue";

const started = ref(false);
</script>

<template>
  <div v-if="!started" class="welcome-section">
    <img
      src="./assets/images/welcome-pikachu.png"
      alt="Pikachu Logo"
      class="image"
    />
    <h1 class="title">Welcome to Pokédex</h1>
    <p class="description">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>
    <button class="btn btn-primary" @click="started = true">Get started</button>
  </div>
  <MainLayout v-else />
</template>

<style lang="scss">
.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  .image {
    width: 100%;
    max-width: 325px;
    height: auto;
    margin-bottom: 3.75rem;
  }

  .title {
    font-size: 1.65rem;
    font-weight: 700;
    margin-bottom: 1.88rem;
  }

  .description {
    font-size: 1.15rem;
    font-weight: 500;
    color: #5e5e5e;
    margin-bottom: 3.5rem;
    max-width: 570px;
  }

  .btn {
    padding: 0.75rem 1rem;
    font-size: 1.2rem;
    border-radius: 30px;
    background-color: #f22539;
    color: white;
    border: none;
    cursor: pointer;
  }
}
</style>
