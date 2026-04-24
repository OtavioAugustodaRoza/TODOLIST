<script setup>
import { computed, ref, watch } from 'vue'
import {ClipboardList } from 'lucide-vue-next'

//components
import CardExibicao from './components/CardExibicao.vue'
import InputChild from './components/InputChild.vue'
import ButtonChild from './components/ButtonChild.vue'

//hooks
import { UseAdd } from './hooks/UseAdd'
import { UseEditar } from './hooks/UseEditar'
import { UseConcluir } from './hooks/UseConcluir'
import { UseRemove } from './hooks/UseRemove'
import { UseOrdenar } from './hooks/UseOrdenar'
import { UseContagem } from './hooks/UseContagem'
import { UseTarefasFil } from './hooks/UseTarefasFil'

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
const textoDoInput = ref('')
const editandoS = ref(null)
const ordenarStatus = ref(false)

const tarefasFiltradas = computed(() => {return UseTarefasFil(tarefas,filtro)})
const editar = (id) => UseEditar(tarefas,textoDoInput,editandoS,id)
const add = () => UseAdd(textoDoInput, editandoS, tarefas)
const remove = (id) => UseRemove(tarefas,id)
const contagemProgresso = computed(() => {return UseContagem(tarefas)})
const ordenar = () => UseOrdenar(tarefas,ordenarStatus)
const concluir = (id) => UseConcluir(tarefas,id)
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
