<script setup>
import { computed } from 'vue'

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
  active: {
    type: [Number, null],
    required: true,
  },
})

const isBack = computed(() => props.active === props.character.id)

const emit = defineEmits(['remove', 'open'])

function onRemove() {
  emit('remove', props.character.id)
}

function onRotate() {
  emit('open', props.character.id)
}
</script>

<template>
  <li
    class="character"
    @click="onRotate"
  >
    <div
      class="character__inner character__front"
      :class="{ 'rotate-back': isBack }"
    >
      <button
        class="character__remove"
        type="button"
        @click.stop="onRemove"
      >
        x
      </button>
      <h3 class="character__title">{{ character.name }}</h3>
      <img
        class="character__img"
        :src="character.image"
        :alt="character.name"
      />
      <ul class="character__list">
        <li class="character__item">
          <span>gender: </span>
          <span>{{ character.gender || 'missing' }}</span>
        </li>
        <li class="character__item">
          <span>species: </span>
          <span>{{ character.species || 'missing' }}</span>
        </li>
        <li class="character__item">
          <span>status: </span>
          <span>{{ character.status || 'missing' }}</span>
        </li>
        <li class="character__item">
          <span>type: </span>
          <span>{{ character.type || 'missing' }}</span>
        </li>
      </ul>
    </div>
    <div
      class="character__inner character__back"
      :class="{ 'rotate-front': isBack }"
    >
      <div>
        <span> location: </span>
        <span>{{ character.location.name }}</span>
      </div>
      <div>
        <span> origin: </span>
        <span>{{ character.origin.name }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped>
.character {
  position: relative;
  width: 100%;
  height: 450px;
}

.character__inner {
  position: absolute;
  height: 100%;
  max-width: 300px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition:
    transform 0.6s ease,
    translate 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    translate: 0 -5px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
}

.character__back {
  transform: rotateY(180deg);
}

.character__img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 12px;
}

.character__title {
  font-size: 18px;
  margin-bottom: 10px;
}

.character__item {
  position: relative;
  display: flex;
  justify-content: space-between;
  color: #666;

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: currentColor;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.character__remove {
  font-size: 20px;
  color: red;
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 15px;
}

.rotate-back {
  transform: rotateY(180deg);
}

.rotate-front {
  transform: rotateY(0);
}
</style>
