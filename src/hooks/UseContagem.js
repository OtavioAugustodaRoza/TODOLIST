export const UseContagem = (obj) => {
  const concluidas = obj.value.filter((t) => t.status === 'concluida').length
  const pendentes = obj.value.length - concluidas
  return `Concluidas: ${concluidas}  Pendentes: ${pendentes}`
}
