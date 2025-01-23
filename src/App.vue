<script setup>
import { useStore } from 'vuex'
import { onMounted, computed, ref } from 'vue'
import TheCard from '@/components/TheCard.vue'
import TheButton from '@/components/TheButton.vue'

const activeId = ref(null)
const store = useStore()
const characters = computed(() => store.getters['cards/characters'])
const isLoading = computed(() => store.getters['cards/isLoading'])
const hasError = computed(() => store.getters['cards/hasError'])
const isNotReady = computed(() => isLoading.value || hasError.value)

onMounted(() => {
  store.dispatch('cards/getCharacter')
})

function onRemove(id) {
  store.commit('cards/removeCharacter', id)
}

function onActive(id) {
  if (activeId.value === id) activeId.value = null
  else activeId.value = id
}

function onAdd() {
  store.commit('cards/addRandomCharacter')
}

function onSort(type) {
  store.commit('cards/sortByType', type)
}
</script>

<template>
  <main class="main">
    <div class="main__inner container">
      <div v-if="hasError">error</div>
      <div v-else-if="isLoading">loader</div>
      <TransitionGroup
        v-else
        tag="ul"
        name="list"
        class="main__cards"
      >
        <TheCard
          v-for="character in characters"
          :character
          :active="activeId"
          :key="character.id"
          @remove="onRemove"
          @open="onActive"
        />
      </TransitionGroup>
      <ul class="main__button-list">
        <li>
          <TheButton
            :disabled="isNotReady"
            @click="onAdd"
          >
            Добавить рандомный элемент
          </TheButton>
        </li>
        <li>
          <TheButton
            :disabled="isNotReady"
            @click="onSort('name')"
          >
            Сортировка по имени
          </TheButton>
        </li>
        <li>
          <TheButton
            :disabled="isNotReady"
            @click="onSort('gender')"
          >
            Сортировка по полу
          </TheButton>
        </li>
        <li>
          <TheButton
            :disabled="isNotReady"
            @click="onSort('status')"
          >
            Сортировка по статусу
          </TheButton>
        </li>
        <li>
          <TheButton
            :disabled="isNotReady"
            @click="onSort('type')"
          >
            Сортировка по типу
          </TheButton>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.main__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
  grid-auto-rows: 1fr;
  perspective: 1000px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
}

.main__button-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
