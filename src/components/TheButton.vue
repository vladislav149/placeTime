<script setup></script>

<template>
  <button class="button" type="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  background-color: #4caf50;
  color: white;
  border-radius: 15px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: #397d3b;
    transform: scale(1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(72, 181, 255, 0.6);
  }
}
</style>
