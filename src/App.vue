<script setup>
import { ref } from 'vue'

let tarefas = ref([
  { id: 1, desc: 'fazer o breakdance', status: 'pendente' },
  { id: 2, desc: 'ler livros', status: 'pendente' },
  { id: 3, desc: 'estudar o neymar', status: 'concluida' }
]);
const textoDoIntput = ref('')
let maiorID = Math.max(...tarefas.value.map(item => item.id));
const add = (() => {
  const tarefa = {id: maiorID+1, desc:textoDoIntput, status:'pendente'}
  i
  tarefas.value.push(tarefa);
})

const remove = ((id) => {
  const i = tarefas.value.findIndex(x => x.id == id);
  if(i >= 0){
    tarefas.value.splice(i,1)
  }
} )

const concluir = ((id) => {
    const i = tarefas.value.findIndex(x => x.id === id)
    if(tarefas.value[i].status == 'pendente'){
      tarefas.value[i].status = "concluida"
    }else{
      tarefas.value[i].status = "pendente"
    }
  })

</script>
<template>
  <div class="cotainer">
  <input type="text" v-model="textoDoIntput" @keyup.enter="add"> <button @click="add">adiconar</button>
  <ul>
  <li v-for=" item in tarefas" :key="item.id">
  <div @click="concluir" >{{ item.desc }}</div>  <button @click="remove(item.id)">remover</button>


  </li>

  </ul>
  </div>
</template>
<style scoped></style>
