import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const {id, color, amount, product} = action.payload
    const tempItem =  state.cart.find((i) => i.id === id + color)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if(cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if(newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return {...cartItem, amount: newAmount}
        } else {
          return cartItem
        }
      })
      return {...state, cart: tempCart}
    } else {
      const newItem = {
        id: id+color,
        color: color,
        amount: amount,
        image : product.image,
        max : product.max,
        price : product.price,
        name : product.name,
      }
      const tempCart = [...state.cart,newItem]
      return {...state, cart: tempCart}
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const id = action.payload
    const tempCart = state.cart.filter((item) => item.id !== id);
    return { ...state, cart: tempCart };
  }
  
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const {id, value} = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      // Tambahkan return item jika tidak memenuhi kondisi di atas
      return item;
    });
    return {...state, cart : tempCart}
  }
  
  if (action.type === CLEAR_CART) {
   return {...state, cart: []}
  }
  
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem
        total.total_items += amount
        total.total_amount += price * amount
        return total
      },
      { total_items: 0, total_amount: 0 }
    )
    return { ...state, total_items, total_amount }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
