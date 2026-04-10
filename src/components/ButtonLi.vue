<script setup>
defineProps(['acao'])


</script>
<template>
   <button class="btn-icone" :class="acao">
         <slot></slot>
            </button>

</template>
<style scoped>
.btn-icone {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b6b65;
  transition: all 0.18s;
}

.btn-icone:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.btn-icone.editar:hover:not(:disabled) {
  background: #f0f9ff;
  color: #0ea5e9;
}
.btn-icone.remover:hover:not(:disabled) {
  background: #fff1f2;
  color: #ef4444;
}


</style>
