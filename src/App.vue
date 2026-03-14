<script setup>
import { ref } from 'vue'

let tarefas = ref([
  { id: 1, desc: 'fazer o breakdance', status: 'pendente' },
  { id: 2, desc: 'ler livros', status: 'pendente' },
  { id: 3, desc: 'estudar o neymar', status: 'concluida' },
])
const textoDoIntput = ref('')

const gerarID = (()=> {
  const id = Math.max(...tarefas.value.map((item) => item.id),0) + 1;
  return id;
})

const add = () => {
  const tarefa = { id: gerarID(), desc: textoDoIntput.value, status: 'pendente' }
  console.log(tarefa.id) //pra testar a func

  if (textoDoIntput.value === '') {
    alert('Escreva algo')
    return;
  }

  tarefas.value.push(tarefa)
  textoDoIntput.value= '';
}

const remove = (id) => {
  const i = tarefas.value.findIndex((x) => x.id == id)
  if (i >= 0) {
    tarefas.value.splice(i, 1)
  }
}

const concluir = (id) => {
  const i = tarefas.value.findIndex((x) => x.id === id)
  if(i === -1) return;
  tarefas.value[i].status = tarefas.value[i].status === 'pendente'
  ?  'concluida'
  : 'pendente' ;
  console.log(tarefas.value[i].status) //so pra testar por enquanto
}
</script>
<template>
  <div class="container">
    <input type="text" v-model="textoDoIntput" @keyup.enter="add" />
    <button @click="add">Adicionar</button>
    <ul>
      <li v-for="item in tarefas" :key="item.id">
        <div class="tarefa" :class="item.status === 'concluida' ? 'concluido' : '' " @click="concluir(item.id)">{{ item.desc }}</div>
        <button @click="remove(item.id)">remover</button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
  font-family: Arial, Helvetica, sans-serif;
}
ul{
  display: flex ;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin-top: 30px;
  width: 300px;
}
li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  padding: 12px;
  border-radius: 8px;
}
.tarefa{
  cursor: pointer;
}
.concluido{
  text-decoration: line-through;
  color: gray;
}
button{
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}
input{
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 220px;
  margin-right: 10px;
  outline: none;
}
input:focus{
  outline: #369870 solid;
}
button:hover{
  background-color: #369870;
}
</style>
