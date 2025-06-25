<script setup lang="ts">
import { computed } from "vue";
import { usePokemonStore } from "@/stores/usePokemonStore";
import StartIcon from "../atoms/icons/StartIcon.vue";

const store = usePokemonStore();

const pokemon = computed(() => store.selectedPokemon);
const isFavorite = computed(() => store.isFavorite(pokemon.value?.id || 0));

const closeModal = () => {
  store.setSelectedPokemon(null);
};

const toggleFavorite = () => {
  if (pokemon.value) {
    store.toggleFavorite(pokemon.value.id);
  }
};
</script>

<template>
  <div v-if="pokemon" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">×</button>
      <div class="modal-header">
        <div class="pokemon-image-container">
          <img
            :src="`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
            :alt="pokemon.name"
            class="pokemon-image"
            loading="lazy"
          />
        </div>
      </div>
      <div class="modal-body">
        <div class="pokemon-details">
          <div class="detail-row">
            <span class="detail-label">Name:</span>
            <span class="detail-value">{{ pokemon.name }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Height:</span>
            <span class="detail-value">{{ pokemon.height / 10 }} m</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Weight:</span>
            <span class="detail-value">{{ pokemon.weight / 10 }} kg</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Types:</span>
            <span v-for="type in pokemon.types" :key="type.type.name">
              {{ type.type.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="share-button">Share to my friends</button>
        <button class="favorite-button" @click="toggleFavorite">
          <span class="start">
            <StartIcon :color="isFavorite ? '#eca539' : '#bfbfbf'" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 570px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  color: #666;

  &:hover {
    color: #333;
  }
}

.modal-header {
  display: flex;
  align-items: center;
}

.modal-body {
  padding: 1.25rem 1.9rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.25rem;
  padding-right: 1.9rem;
  padding-left: 1.9rem;

  .share-button {
    padding: 0.71rem 1.25rem;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 60px;
    border: none;
    background-color: #f22539;
    color: white;
    width: 100%;
    max-width: 205px;
  }

  .favorite-button {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border: none;
    padding: 1.3rem;
    border-radius: 50%;
    transition: background-color 0.2s;

    .start {
      font-size: 1rem;
      transition: color 0.2s;
    }
  }
}

.pokemon-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-image: url("../../assets/images/pokemon-background.jpg");
  background-repeat: no-repeat;
  padding-top: 1.9rem;

  .pokemon-image {
    max-width: 100%;
    height: auto;
    max-height: 180px;
  }
}

.pokemon-details {
  flex: 1;
}

.detail-row {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.5rem;
  font-size: 1.15rem;
  color: #5e5e5e;
  gap: 0.5rem;

  .detail-label {
    font-weight: 700;
  }

  .detail-value {
    font-weight: 500;
  }
}
</style>
