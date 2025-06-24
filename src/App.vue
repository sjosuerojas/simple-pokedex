<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Pokédex</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/favorites">Favorites</router-link>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
@import './styles/global';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &-header {
    background-color: var(--color-primary);
    color: white;
    padding: 1rem;
    text-align: center;

    h1 {
      margin: 0;
    }

    nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;

      a {
        color: white;
        text-decoration: none;

        &.router-link-active {
          font-weight: bold;
          text-decoration: underline;
        }
      }
    }
  }

  &-main {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>