<script setup>
import {  Pencil, Trash2, Check} from 'lucide-vue-next'
defineProps({
  item: Object,
  editandoS: Number
})
defineEmits(['concluir', 'editar', 'remover'])
</script>
<template>
      <li>
        <button class="btn-check" @click="$emit('concluir',item.id)">
          <Check v-if="item.status === 'concluida'" :size="14" stroke-width="3" />
        </button>

        <span class="descricao" @click="$emit('concluir',item.id)">{{item.desc}}</span>

        <div class="acoes">

          <ButtonLi acao="editar" @click="$emit('editar',item.id)" :disabled="editandoS !== null" >
            <Pencil :size="15" />
          </ButtonLi>
             <ButtonLi acao="remover" @click="$emit('remover',item.id)" :disabled="editandoS !== null" >
          <Trash2 :size="15" />
          </ButtonLi>
        </div>
      </li>
</template>
<style scoped>

.tarefa {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1.5px solid #f0f0ec;
  background: #fafaf8;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.tarefa:hover {
  border-color: #e0e0da;
  background: #fff;
}

.btn-check {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 2px solid #d4d4ce;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  color: transparent;
  transition: all 0.2s;
}

.tarefa.concluida .btn-check {
  background: #22c55e;
  border-color: #22c55e;
  color: #fff;
}

.btn-check:hover {
  border-color: #22c55e;
}

.descricao {
  flex: 1;
  font-size: 14px;
  color: #1a1a18;
  cursor: pointer;
  line-height: 1.4;
  transition: color 0.2s;
}

.tarefa.concluida .descricao {
  text-decoration: line-through;
  color: #b0b0aa;
}

.acoes {
  display: flex;
  gap: 4px;
}
</style>
