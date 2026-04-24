export const UseOrdenar =(obj,ordenarStatus) => {
  ordenarStatus.value = !ordenarStatus.value
  if (ordenarStatus.value) {
    obj.value.sort((a, b) => a.desc.localeCompare(b.desc))
  } else {
    obj.value.sort((a, b) => a.id - b.id)
  }
}
