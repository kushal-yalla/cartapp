import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data';
import { useState } from 'react';
function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
   
    
    
    if (exist && exist.qty < 11) {
      
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x  //spread
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }

    if (exist && exist.qty >= 10) {
      
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty:10 } : x , 
          window.alert("You can't add more than 10 items")
        )
      );
    } 
    
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div >
      <Header ></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  );
}

export default App;