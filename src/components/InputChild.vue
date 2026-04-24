<script setup>
import { Plus, Search } from 'lucide-vue-next'

defineProps({
  modelValue: String,
  placeholder: { type: String, default: 'Digite algo...' },
  icone: { type: String, default: 'plus',   enum: ['plus',"search"] }
})


</script>
<template>
  <div class="campo">
    <Plus v-if="icone === 'plus'" class="icone-campo" :size="16" />
    <Search v-else class="icone-campo" :size="16" />
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="$emit('enter')"
    />
  </div>
</template>
<style scoped>

.campo {
  position: relative;
  flex: 1;
}

.icone-campo {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #c0bfba;
}

input {
  width: 100%;
  padding: 11px 14px 11px 36px;
  border: 1.5px solid #e8e8e4;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #1a1a18;
  background: #fafaf8;
  outline: none;
  transition: border-color 0.2s;
}

input::placeholder {
  color: #c0bfba;
}

input:focus {
  border-color: #4ade80;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.12);
}</style>
