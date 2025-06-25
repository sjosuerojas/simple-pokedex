<script setup lang="ts">
import type { Pokemon } from "@/types/pokemon";
import StartIcon from "./icons/StartIcon.vue";

defineProps<{
  pokemon: Pokemon;
  isFavorite: boolean;
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle-favorite", id: number): void;
  (e: "show-details", name: string): void;
}>();
</script>

<template>
  <article
    :class="['pokeapp-card', { 'pokeapp-loading': isLoading }]"
    @click="emit('show-details', pokemon.name)"
  >
    <div class="pokeapp-info">
      <h3 class="pokeapp-name">{{ pokemon.name }}</h3>
    </div>
    <button
      class="favorite-button"
      @click.stop="emit('toggle-favorite', pokemon.id)"
      :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
      <span class="start">
        <StartIcon :color="isFavorite ? '#eca539' : '#bfbfbf'" />
      </span>
    </button>
  </article>
</template>

<style lang="scss" scoped>
.pokeapp-card {
  position: relative;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
  max-width: 570px;
  width: 100%;

  &.pokeapp-loading {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
  }

  .pokeapp-info {
    padding: 1rem;
    text-align: left;

    .pokeapp-name {
      margin: 0;
      text-transform: capitalize;
      font-size: 1.4rem;
      font-weight: 500;
      color: #333;
    }
  }

  .favorite-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: #f5f5f5;
    border: none;
    cursor: pointer;
    padding: 1.3rem;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }

    .start {
      font-size: 1rem;
      transition: color 0.2s;
    }
  }
}
</style>
