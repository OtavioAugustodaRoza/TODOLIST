export function UseIdG (obj){
  const id = Math.max(...obj.value.map((item) => item.id), 0) + 1
  return id
}
