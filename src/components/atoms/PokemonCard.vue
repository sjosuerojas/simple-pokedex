<script setup lang="ts">
import type { Pokemon } from '@/types/pokemon'

defineProps<{
  pokemon: Pokemon
  isFavorite: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-favorite', id: number): void
  (e: 'show-details', name: string): void
}>()
</script>

<template>
  <article class="pokemon-card" @click="emit('show-details', pokemon.name)">
    <div class="pokemon-image-container">
      <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
    </div>
    <div class="pokemon-info">
      <h3 class="pokemon-name">{{ pokemon.name }}</h3>
      <span class="pokemon-id">#{{ pokemon.id }}</span>
    </div>
    <button
      class="favorite-button"
      @click.stop="emit('toggle-favorite', pokemon.id)"
      :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
      <span :class="['start', { 'start-filled': isFavorite }]">⭐</span>
    </button>
  </article>
</template>

<style lang="scss" scoped>
.pokemon-card {
  position: relative;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }

  .pokemon-image-container {
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    .pokemon-image {
      width: 100%;
      height: auto;
      max-width: 120px;
      object-fit: contain;
    }
  }

  .pokemon-info {
    padding: 1rem;
    text-align: center;

    .pokemon-name {
      margin: 0;
      text-transform: capitalize;
      color: #333;
      font-size: 1rem;
    }

    .pokemon-id {
      color: #666;
      font-size: 0.8rem;
    }
  }

  .favorite-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
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
      color: #ccc;
      transition: color 0.2s;

      &-filled {
        color: #ff3e3e;
      }
    }
  }
}
</style>