import { UseI } from "./UseI"
import { UseIdG } from "./UseIdG"
export const UseAdd = (textoDoInput,editandoS,obj) => {
  if (textoDoInput.value.trim() === '') {
    alert('Escreva algo')
    return
  } else if (textoDoInput.value.length >= 25) {
    alert('você ultrapassou o limite de caracteres')
    return
  }

  if (editandoS.value !== null) {
    const i = UseI(obj,editandoS.value)

    if (i !== -1) {
      obj.value[i].desc = textoDoInput.value
    }

    editandoS.value = null
  } else {
    const tarefa = {
      id: UseIdG(obj),
      desc: textoDoInput.value,
      status: 'pendente',
    }
    obj.value.push(tarefa)
  }
  textoDoInput.value = ''

}
