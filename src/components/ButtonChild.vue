<script setup>
import { AlignLeft } from 'lucide-vue-next'


const props = defineProps({
  estilo: {type:String, enum:["btn-principal","btn-cancelar","btn-ordenar"]},
  icon:{type:String, default: null,  enum: ["AlignLeft",null]}
})

const emit = defineEmits([
  'add',
  'cancelar',
  'ordenar'
])

function funcB() {
  if (props.estilo === 'btn-principal') emit('add')
  else if (props.estilo === 'btn-cancelar') emit('cancelar')
  else if (props.estilo === 'btn-ordenar') emit('ordenar')
}



</script>
<template>
<button :class="estilo" @click="funcB">
 <AlignLeft v-if="icon === 'AlignLeft'" :size="16"/>
 <slot ></slot>
</button>
</template>
<style scoped>

.btn-principal {
  padding: 11px 20px;
  background: #1a1a18;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.2s,
    transform 0.1s;
}

.btn-principal:hover {
  background: #2d2d2a;
}
.btn-principal:active {
  transform: scale(0.97);
}

.btn-cancelar {
  padding: 11px 16px;
  color: #a0a09a;
  border: 1.5px solid #e8e8e4;
  border-radius: 12px;
  font-family: sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancelar:hover {
  border-color: #f87171;
  color: #ef4444;
}

.btn-ordenar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 11px 16px;
  color: #6b6b65;
  border: 1.5px solid #e8e8e4;
  border-radius: 12px;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-ordenar:hover:not(:disabled) {
  border-color: #1a1a18;
  color: #1a1a18;
}
.btn-ordenar:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
