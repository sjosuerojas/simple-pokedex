<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const router = useRouter();

const onSearch = () => {
  if (search.value.trim()) {
    router.push({ path: "/search", query: { q: search.value.trim() } });
    search.value = "";
  }
};
</script>

<template>
  <form @submit.prevent="onSearch" class="search-bar">
    <input
      v-model="search"
      type="text"
      placeholder="Search"
      class="search-input"
    />
    <button type="submit" class="search-btn">Buscar</button>
  </form>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.search-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #ccc;
}
.search-btn {
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  border: none;
  background: #f22539;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
</style>
