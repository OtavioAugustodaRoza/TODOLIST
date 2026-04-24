import { UseI } from "./UseI"

export const UseEditar = (obj,textoDoInput,editandoS,id) => {
  const i = UseI(obj,id)
  if (i === -1 || obj.value[i].desc === '') return

  textoDoInput.value = obj.value[i].desc
  editandoS.value = id
}
