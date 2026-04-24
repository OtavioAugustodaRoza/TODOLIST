<script setup>
import { computed, ref, watch } from 'vue'
import {AlignLeft, ClipboardList } from 'lucide-vue-next'
import CardExibicao from './components/CardExibicao.vue'
import InputChild from './components/InputChild.vue'
import { UseI } from './hooks/UseI'
import { UseIdG } from './hooks/UseIdG'

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
const editar = (id) => {
  const i = UseI(tarefas,id)
  if (i === -1 || tarefas.value[i].desc === '') return

  textoDoInput.value = tarefas.value[i].desc
  editandoS.value = id
}
const add = () => {
  if (textoDoInput.value.trim() === '') {
    alert('Escreva algo')
    return
  } else if (textoDoInput.value.length >= 25) {
    alert('você ultrapassou o limite de caracteres')
    return
  }

  if (editandoS.value !== null) {
    const i = UseI(tarefas,editandoS.value)

    if (i !== -1) {
      tarefas.value[i].desc = textoDoInput.value
    }

    editandoS.value = null
  } else {
    const tarefa = {
      id: UseIdG(tarefas),
      desc: textoDoInput.value,
      status: 'pendente',
    }
    tarefas.value.push(tarefa)
  }
  textoDoInput.value = ''
}

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
  console.log(tarefas.value[i].status) //so pra testar por enquanto
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
      <button class="btn-principal" @click="add">
        {{ editandoS !== null ? 'Salvar' : 'Adicionar' }}
      </button>
      <button
        v-if="editandoS !== null"
        class="btn-cancelar"
        @click="((editandoS = null), (textoDoInput = ''))"
      >
        Cancelar
      </button>
    </div>

    <div class="linha-filtro">
      <InputChild v-model="filtro" placeholder="Filtrar tarefas..." icone="search" />
      <button class="btn-ordenar" @click="ordenar" :disabled="tarefas.length <= 1">
        <AlignLeft :size="16" /> Ordenar
      </button>
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
