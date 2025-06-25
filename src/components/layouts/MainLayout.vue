<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import { usePokemonStore } from "@/stores/usePokemonStore";
import PokemonLoader from "@/components/atoms/PokemonLoader.vue";
import ListIcon from "@/components/atoms/icons/ListIcon.vue";
import StartIcon from "@/components/atoms/icons/StartIcon.vue";
import SearchBar from "@/components/atoms/SearchBar.vue";
import "@/styles/global.scss";

const store = usePokemonStore();
</script>

<template>
  <div class="pokeapp">
    <template v-if="store.isLoading && store.pokemonList.length === 0">
      <PokemonLoader />
    </template>
    <template v-else>
      <main class="pokeapp-main">
        <SearchBar />
        <RouterView />
      </main>
      <footer class="pokeapp-footer">
        <RouterLink class="nav-link" active-class="active" to="/">
          <ListIcon /> All
        </RouterLink>
        <RouterLink class="nav-link" active-class="active" to="/favorites">
          <StartIcon color="#fff" /> Favorites
        </RouterLink>
      </footer>
    </template>
  </div>
</template>

<style lang="scss">
.pokeapp {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f8f8f8;
    padding: 1.15rem;
    text-align: center;
    box-shadow: 1px -4px 5px rgba(0, 0, 0, 0.1);
    z-index: 999;

    .nav-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.63rem;
      padding: 0.6rem 1rem;
      font-size: 1.13rem;
      font-weight: 700;
      border-radius: 60px;
      background-color: #bfbfbf;
      color: white;
      transition: background-color 0.3s ease;
      margin: 0 0.6rem;
      width: 100%;
      max-width: 275px;

      &.active {
        background-color: #f22539;
        color: white;

        &:hover {
          background-color: #d21c2b;
        }
      }
    }
  }

  &-main {
    flex: 1;
    padding: 2rem;
    max-width: 700px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
