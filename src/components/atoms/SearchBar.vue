<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const router = useRouter();

const onSearch = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    router.push({ path: "/search", query: { q: search.value.trim() } });
    search.value = "";
  }
};
</script>

<template>
  <div class="search-container">
    <img src="../../assets/images/search-icon.svg" alt="Search Icon" />
    <input
      v-model="search"
      type="text"
      id="search"
      name="search"
      placeholder="Search"
      class="search-input"
      @keyup="onSearch"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 1.5rem;
  position: relative;

  img {
    position: absolute;
    left: 51px;
    width: 18px;
    height: 18px;
    pointer-events: none;
  }

  @media screen and (max-width: 600px) {
    img {
      left: 20px;
    }
  }

  .search-input {
    width: 100%;
    max-width: 570px;
    padding: 16px 43px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #bfbfbf;
    font-weight: 500;
    font-size: 1.15rem;
    background-color: white;
    border: none;

    &::placeholder {
      color: #bfbfbf;
    }
  }
}
</style>
