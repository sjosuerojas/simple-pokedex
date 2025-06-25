<script setup lang="ts">
import type { Pokemon } from "@/types/pokemon";

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
    :class="['pokemon-card', { 'pokemon-loading': isLoading }]"
    @click="emit('show-details', pokemon.name)"
  >
    <div class="pokemon-info">
      <h3 class="pokemon-name">{{ pokemon.name }}</h3>
    </div>
    <button
      class="favorite-button"
      @click.stop="emit('toggle-favorite', pokemon.id)"
      :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
      <span class="start">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0583408 8.9015 -0.451939 10.5415 0.471424 11.4809L5.60824 16.7107L4.39329 24.0984C4.1746 25.4338 5.52076 26.4341 6.64824 25.8096L13 22.3213L19.3518 25.8096C20.4792 26.429 21.8254 25.4338 21.6067 24.0984L20.3918 16.7107L25.5286 11.4809C26.4519 10.5415 25.9417 8.9015 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8262 -0.293851 12.1787 -0.309084 11.6052 0.904438Z"
            :fill="isFavorite ? '#eca539' : '#bfbfbf'"
          />
        </svg>
      </span>
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
  max-width: 570px;
  width: 100%;

  &.pokemon-loading {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
  }

  .pokemon-info {
    padding: 1rem;
    text-align: left;

    .pokemon-name {
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
