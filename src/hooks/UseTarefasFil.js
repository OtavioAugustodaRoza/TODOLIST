export const UseTarefasFil = (obj,filtro) => {
  if (filtro.value.trim().length === 0) return obj.value

  return obj.value.filter((item) =>
    item.desc.toLowerCase().includes(filtro.value.toLowerCase()),
  )
}
