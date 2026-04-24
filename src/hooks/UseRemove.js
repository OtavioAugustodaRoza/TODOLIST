import { UseI } from "./UseI"
export const UseRemove = (obj,id) => {
  const i = UseI(obj,id)
  if (i >= 0) {
    obj.value.splice(i, 1)
  }
}
