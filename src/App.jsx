import "./App.css";

import axios from "axios";

import { useEffect, useState } from "react";

import Category from "./components/Category";

import Header from "./components/Header";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--backend-deliveroo--g66vv9dsqsjg.code.run/"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  let total = 0;

  const addToCart = (meal) => {
    const newCart = [...cart];

    const mealExists = newCart.find((elem) => elem.id === meal.id);

    // console.log(mealExists);

    if (mealExists) {
      mealExists.quantity++;
    } else {
      const newMeal = { ...meal, quantity: 1 };
      newCart.push(newMeal);
    }

    setCart(newCart);
  };

  const removeFromCart = (meal) => {
    const newCart = [...cart];

    const mealInTab = newCart.find((elem) => elem.id === meal.id);
    if (mealInTab.quantity === 1) {
      const index = newCart.indexOf(mealInTab);
      newCart.splice(index, 1);
    } else {
      mealInTab.quantity--;
    }

    setCart(newCart);
  };

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="App">
      <Header />
      <div className="hero">
        <div className="container hero-container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>

          <img src={data.restaurant.picture} alt="Meal" />
        </div>
      </div>

      <main className="container">
        <div className="main-left">
          {data.categories.map((category, index) => {
            return (
              category.meals.length > 0 && (
                <Category
                  category={category}
                  key={index}
                  addToCart={addToCart}
                />
              )
            );
          })}
        </div>
        <div className="main-right">
          {cart.map((meal, index) => {
            total += meal.quantity * meal.price;
            return (
              <div key={meal.id}>
                <button
                  onClick={() => {
                    removeFromCart(meal);
                  }}
                >
                  -
                </button>
                <span>{meal.quantity}</span>
                <button
                  onClick={() => {
                    addToCart(meal);
                  }}
                >
                  +
                </button>
                <span>{meal.title}</span>
                <span>{meal.price * meal.quantity} €</span>
              </div>
            );
          })}
          <p>Total : {total.toFixed(2)}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
