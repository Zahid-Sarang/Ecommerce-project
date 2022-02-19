export const initialState = {
  cart: [],
  user: null,
};

//Selector
export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => amount + item.price * item.quantity, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_CART":
      let update = state.cart.map((elem) => {
        if(elem.id === action.item.id) {
          return { ...elem, quantity: elem.quantity + 1 };
        }
      })
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      let newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn("Cant remove");
      }
      return {
        ...state,
        cart: newCart,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
      case 'EMPTY_CART':
        return {
          ...state,
          cart:[]
        }
    case "INCREMENT":
      let incrementCart = state.cart.map((cur) => {
        if (cur.id === action.payload) {
          return { ...cur, quantity: cur.quantity + 1 };
        }
        return cur;
      });
      return { ...state, cart: incrementCart };
    case "DECREMENT":
      let decrementCart = state.cart
        .map((currElm) => {
          if (currElm.id === action.payload) {
            return { ...currElm, quantity: currElm.quantity - 1 };
          }
          return currElm;
        })
        .filter((currElm) => currElm.quantity !== 0);
      return { ...state, cart: decrementCart };
    default:
      return state;
  }
};

export default reducer;
