<script setup>
import { computed, ref } from 'vue'

let tarefas = ref([
  { id: 1, desc: 'fazer o breakdance', status: 'pendente' },
  { id: 2, desc: 'ler livros', status: 'pendente' },
  { id: 3, desc: 'estudar o neymar', status: 'concluida' },
])
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
  let concluidas = 0
  let pendentes = 0
  tarefas.value.map((item) => {
    if (item.status === 'pendente') {
      pendentes++
    } else {
      concluidas++
    }
  })
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
  <div class="container">
    <h1>{{ contagemProgresso }}</h1>
    <input type="text" placeholder="digite sua tarefa" v-model="textoDoInput" @keyup.enter="add" />
    <button @click="add">  {{ editandoS !== null ? 'Salvar' : 'Adicionar' }}</button>
    <button v-if="editandoS !== null" @click="editandoS = null; textoDoInput = ''">Cancelar</button>

    <ul>
      <li v-for="item in tarefasFiltradas" :key="item.id">
        <div
          class="tarefa"
          :class="item.status === 'concluida' ? 'concluido' : ''"
          @click="concluir(item.id)"
        >
          {{ item.desc }}
        </div>
        <div class="btn-div">
          <button @click="remove(item.id)" :disabled="editandoS !== null">Remover</button>
          <button @click="editar(item.id)" :disabled="editandoS !== null">Editar</button>
        </div>
      </li>
    </ul>
    <div>
      <input type="text" placeholder="filtrar tarefa" v-model="filtro" />
      <button @click="ordenar" :disabled="tarefas.length <= 1">ordenar</button>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  color: #f4f4f4;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin-top: 30px;
  width: 300px;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  padding: 12px;
  border-radius: 8px;
}
.tarefa {
  cursor: pointer;
}
.concluido {
  text-decoration: line-through;
  color: gray;
}
button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}
input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 220px;
  margin-right: 10px;
  outline: none;
}
input:focus {
  outline: #369870 solid;
}
button:hover {
  background-color: #369870;
}
.btn-div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
