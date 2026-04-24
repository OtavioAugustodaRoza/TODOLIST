<script setup>
import { computed, ref, watch } from 'vue'
import {ClipboardList } from 'lucide-vue-next'
import CardExibicao from './components/CardExibicao.vue'
import InputChild from './components/InputChild.vue'
import { UseI } from './hooks/UseI'
import { UseAdd } from './hooks/UseAdd'
import ButtonChild from './components/ButtonChild.vue'
import { UseEditar } from './hooks/UseEditar'

const tarefas = ref(
  JSON.parse(localStorage.getItem('tarefas')) || [
    { id: 1, desc: 'fazer o breakdance', status: 'pendente' },
    { id: 2, desc: 'ler livros', status: 'pendente' },
    { id: 3, desc: 'estudar o neymar', status: 'concluida' },
  ],
)

watch(
  tarefas,
  (novoArray) => {
    localStorage.setItem('tarefas', JSON.stringify(novoArray))
  },
  { deep: true },
)

const filtro = ref('')

const tarefasFiltradas = computed(() => {
  if (filtro.value.trim().length === 0) return tarefas.value

  return tarefas.value.filter((item) =>
    item.desc.toLowerCase().includes(filtro.value.toLowerCase()),
  )
})
const textoDoInput = ref('')

const editandoS = ref(null)
const editar = (id) => UseEditar(tarefas,textoDoInput,editandoS,id)
const add = () => UseAdd(textoDoInput, editandoS, tarefas)

const remove = (id) => {
  const i = UseI(tarefas,id)
  if (i >= 0) {
    tarefas.value.splice(i, 1)
  }
}
const contagemProgresso = computed(() => {
  const concluidas = tarefas.value.filter((t) => t.status === 'concluida').length
  const pendentes = tarefas.value.length - concluidas
  return `Concluidas: ${concluidas}  Pendentes: ${pendentes}`
})

const ordenarStatus = ref(false)
const ordenar = () => {
  ordenarStatus.value = !ordenarStatus.value
  if (ordenarStatus.value) {
    tarefas.value.sort((a, b) => a.desc.localeCompare(b.desc))
  } else {
    tarefas.value.sort((a, b) => a.id - b.id)
  }
}

const concluir = (id) => {
  const i = UseI(tarefas,id)
  if (i === -1) return
  tarefas.value[i].status = tarefas.value[i].status === 'pendente' ? 'concluida' : 'pendente'
}
</script>

<template>
  <div class="cartao">

    <div class="cabecalho">
      <div class="cabecalho-topo">
        <span class="etiqueta">Tarefas</span>
        <span class="progresso">{{ contagemProgresso }}</span>
      </div>
      <h1 class="titulo">Minha Lista</h1>
    </div>

    <div class="linha-input">
      <InputChild v-model="textoDoInput" placeholder="Nova tarefa..." icone="plus" @enter="add" />
      <ButtonChild estilo="btn-principal" @add="add" >
        {{ editandoS !== null ? 'Salvar' : 'Adicionar' }}
      </ButtonChild>
      <ButtonChild
        v-if="editandoS !== null"
        estilo="btn-cancelar"
        @cancelar="((editandoS = null), (textoDoInput = ''))"
      >
        Cancelar
      </ButtonChild>
    </div>

    <div class="linha-filtro">
      <InputChild v-model="filtro" placeholder="Filtrar tarefas..." icone="search" />
      <ButtonChild estilo="btn-ordenar" @ordenar="ordenar" icon="AlignLeft" :disabled="tarefas.length <= 1">
      ordenar
      </ButtonChild>
    </div>

    <ul class="lista">
      <CardExibicao
        @concluir="concluir"
        @remover="remove"
        @editar="editar"
        :item="item"
        v-for="item in tarefasFiltradas"
        :key="item.id"
        :editandoS="editandoS"
      />

      <li v-if="tarefasFiltradas.length === 0" class="vazio">
        <ClipboardList :size="40" stroke-width="1.5" />
        <p>Nenhuma tarefa encontrada</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cartao {
  border-radius: 24px;
  padding: 50px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 50px;
  font-family: sans-serif;
}

.cabecalho {
  margin-bottom: 28px;
}

.cabecalho-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.etiqueta {
  font-size: 11px;
  font-weight: 600;
  color: #a0a09a;
}

.progresso {
  font-size: 12px;
  font-weight: 500;
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
  padding: 3px 10px;
  border-radius: 99px;
}

.titulo {
  font-family: serif;
  font-size: 36px;
  font-weight: 400;
  color: #1a1a18;
}

.linha-input,
.linha-filtro {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
}
.lista {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 20px;
}
.vazio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 0;
  color: #c0bfba;
  font-size: 14px;
}
</style>
