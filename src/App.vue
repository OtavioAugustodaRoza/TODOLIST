<script setup>
import { computed, ref, watch } from 'vue'
import { Plus, Search, AlignLeft, Pencil, Trash2, Check, ClipboardList } from 'lucide-vue-next'

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

const gerarID = () => {
  const id = Math.max(...tarefas.value.map((item) => item.id), 0) + 1
  return id
}
const editandoS = ref(null)
const editar = (id) => {
  const i = acharI(id)
  if (i === -1 || tarefas.value[i].desc === '') return

  textoDoInput.value = tarefas.value[i].desc
  editandoS.value = id
}
const acharI = (id) => {
  return tarefas.value.findIndex((x) => x.id == id)
}

const add = () => {
  if (textoDoInput.value.trim() === '') {
    alert('Escreva algo')
    return
  }else if(textoDoInput.value.length >= 25){
    alert("você ultrapassou o limite de caracteres")
    return
  }

  if (editandoS.value !== null) {
    const i = acharI(editandoS.value)

    if (i !== -1) {
      tarefas.value[i].desc = textoDoInput.value
    }

    editandoS.value = null
  } else {
    const tarefa = {
      id: gerarID(),
      desc: textoDoInput.value,
      status: 'pendente',
    }
    tarefas.value.push(tarefa)
  }
  textoDoInput.value = ''
}

const remove = (id) => {
  const i = acharI(id)
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
  const i = acharI(id)
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
      <div class="campo">
        <Plus class="icone-campo" :size="16" />
        <input type="text" placeholder="Nova tarefa..." v-model="textoDoInput" @keyup.enter="add" />
      </div>
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
      <div class="campo">
        <Search class="icone-campo" :size="16" />
        <input type="text" placeholder="Filtrar tarefas..." v-model="filtro" />
      </div>
      <button class="btn-ordenar" @click="ordenar" :disabled="tarefas.length <= 1">
        <AlignLeft :size="16" /> Ordenar
      </button>
    </div>

    <ul class="lista">
      <li
        v-for="item in tarefasFiltradas"
        :key="item.id"
        class="tarefa"
        :class="{ concluida: item.status === 'concluida' }"
      >
        <button class="btn-check" @click="concluir(item.id)">
          <Check v-if="item.status === 'concluida'" :size="14" stroke-width="3" />
        </button>

        <span class="descricao" @click="concluir(item.id)">{{ item.desc }}</span>

        <div class="acoes">
          <button class="btn-icone editar" @click="editar(item.id)" :disabled="editandoS !== null">
            <Pencil :size="15" />
          </button>
          <button class="btn-icone remover" @click="remove(item.id)" :disabled="editandoS !== null">
            <Trash2 :size="15" />
          </button>
        </div>
      </li>

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
