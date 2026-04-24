import { UseI } from "./UseI"
export const UseConcluir = (obj,id) => {
  const i = UseI(obj,id)
  if (i === -1) return
  obj.value[i].status = obj.value[i].status === 'pendente' ? 'concluida' : 'pendente'
}
