<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemonStore";
import { computed } from "vue";

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
        <h2 class="pokemon-name">{{ pokemon.name }}</h2>
        <span class="pokemon-id">#{{ pokemon.id }}</span>
        <button class="favorite-button" @click="toggleFavorite">
          <span :class="['heart', { 'heart-filled': isFavorite }]">❤</span>
        </button>
      </div>

      <div class="modal-body">
        <div class="pokemon-image-container">
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
        </div>

        <div class="pokemon-details">
          <div class="detail-row">
            <span class="detail-label">Height:</span>
            <span class="detail-value">{{ pokemon.height / 10 }} m</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Weight:</span>
            <span class="detail-value">{{ pokemon.weight / 10 }} kg</span>
          </div>

          <div class="detail-section">
            <h3>Types</h3>
            <div class="types-container">
              <span
                v-for="type in pokemon.types"
                :key="type.type.name"
                class="type-badge"
              >
                {{ type.type.name }}
              </span>
            </div>
          </div>

          <div class="detail-section">
            <h3>Abilities</h3>
            <div class="abilities-container">
              <span
                v-for="ability in pokemon.abilities"
                :key="ability.ability.name"
                class="ability-badge"
              >
                {{ ability.ability.name }}
              </span>
            </div>
          </div>

          <div class="detail-section">
            <h3>Stats</h3>
            <div class="stats-container">
              <div
                v-for="stat in pokemon.stats"
                :key="stat.stat.name"
                class="stat-row"
              >
                <span class="stat-name">{{ stat.stat.name }}:</span>
                <div class="stat-bar-container">
                  <div
                    class="stat-bar"
                    :style="{ width: `${(stat.base_stat / 255) * 100}%` }"
                  ></div>
                  <span class="stat-value">{{ stat.base_stat }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  max-width: 800px;
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
  padding: 1.5rem 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .pokemon-name {
    margin: 0;
    text-transform: capitalize;
    font-size: 1.5rem;
    color: #333;
  }

  .pokemon-id {
    color: #666;
    font-size: 1rem;
  }

  .favorite-button {
    margin-left: auto;
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

    .heart {
      font-size: 1.2rem;
      color: #ccc;

      &-filled {
        color: #ff3e3e;
      }
    }
  }
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.pokemon-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .pokemon-image {
    max-width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: contain;
  }
}

.pokemon-details {
  flex: 2;
}

.detail-row {
  display: flex;
  margin-bottom: 0.5rem;

  .detail-label {
    font-weight: bold;
    width: 80px;
    color: #555;
  }

  .detail-value {
    flex: 1;
  }
}

.detail-section {
  margin-top: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: #444;
    text-transform: capitalize;
  }
}

.types-container,
.abilities-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.type-badge,
.ability-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: #f0f0f0;
  text-transform: capitalize;
  font-size: 0.9rem;
}

.stats-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-name {
  width: 100px;
  text-transform: capitalize;
  font-size: 0.9rem;
  color: #555;
}

.stat-bar-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-bar {
  height: 8px;
  background-color: #4caf50;
  border-radius: 4px;
}

.stat-value {
  width: 30px;
  text-align: right;
  font-size: 0.9rem;
}
</style>
