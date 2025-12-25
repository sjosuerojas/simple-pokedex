<script setup lang="ts">
import { computed } from "vue";
import { toast } from "vue-sonner";
import { useClipboard } from "@vueuse/core";
import { usePokemonStore } from "@/stores/usePokemonStore";
import StartIcon from "../atoms/icons/StartIcon.vue";

const store = usePokemonStore();

const pokemon = computed(() => store.selectedPokemon);
const isFavorite = computed(() => store.isFavorite(pokemon.value?.id || 0));
const source = computed(() => {
  if (!pokemon.value) return "";
  return (
    "Check out this Pokémon: " +
    pokemon.value.name +
    " (ID: " +
    pokemon.value.id +
    ")! " +
    `Height: ${pokemon.value.height / 10} m, ` +
    `Weight: ${pokemon.value.weight / 10} kg. ` +
    `Types: ${pokemon.value.types.map((type) => type.type.name).join(", ")}. `
  );
});

const { copy, isSupported } = useClipboard({ source });

const closeModal = () => store.setSelectedPokemon(null);

const handleShare = async () => {
  if (isSupported.value) {
    await copy(source.value);
    toast.success("Pokémon info copied to clipboard!");
  } else {
    toast.error("Clipboard API not supported in this browser.");
  }
};

const toggleFavorite = () => {
  if (pokemon.value) {
    store.toggleFavorite(pokemon.value.id);
    toast(
      isFavorite.value
        ? `Added pokemon to favorites`
        : `Removed pokemon from favorites`
    );
  }
};
</script>

<template>
  <div v-if="pokemon" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 0C5.81855 0 0 5.81855 0 13C0 20.1815 5.81855 26 13 26C20.1815 26 26 20.1815 26 13C26 5.81855 20.1815 0 13 0ZM19.3742 16.4125C19.6206 16.6589 19.6206 17.0573 19.3742 17.3036L17.2984 19.3742C17.052 19.6206 16.6536 19.6206 16.4073 19.3742L13 15.9355L9.5875 19.3742C9.34113 19.6206 8.94274 19.6206 8.69637 19.3742L6.62581 17.2984C6.37944 17.052 6.37944 16.6536 6.62581 16.4073L10.0645 13L6.62581 9.5875C6.37944 9.34113 6.37944 8.94274 6.62581 8.69637L8.70161 6.62056C8.94798 6.37419 9.34637 6.37419 9.59274 6.62056L13 10.0645L16.4125 6.62581C16.6589 6.37944 17.0573 6.37944 17.3036 6.62581L19.3794 8.70161C19.6258 8.94798 19.6258 9.34637 19.3794 9.59274L15.9355 13L19.3742 16.4125Z"
            fill="white"
          />
        </svg>
      </button>
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
            <span
              v-for="type in pokemon.types"
              :key="type.type.name"
              class="detail-value"
            >
              {{ type.type.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          v-if="isSupported"
          type="button"
          class="share-button"
          @click="handleShare"
        >
          Share to my friends
        </button>
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
    text-transform: capitalize;
  }
}
</style>
