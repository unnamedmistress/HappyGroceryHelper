import React, { useState } from 'react';
import Head from 'next/head';
// import styles from './marketmaven.module.css';

const MarketMaven = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [mealList, setMealList] = useState('');
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [shoppingList, setShoppingList] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const diet = selectedValues.join(',');
  };

  const handleSelection = async (e) => {
    if (!e.target.checked) {
      setShowShoppingList(false);
      setShoppingList('');
      return;
    }
  };

  return (
    <div>
      <Head>
        <title>Market Maven</title>
      </Head>
      <main className={styles.main} style={{backgroundColor: "coral"}}>
        <img src="https://thumbs.dreamstime.com/b/grocery-list-line-icon-vector-outline-illustration-shopping-food-checklist-supermarket-consumer-paper-pictorgam-180766401.jpg" className={styles.icon} />
        <h3>Market Maven</h3>
        <form onSubmit={handleSubmit}>
        <div>
        <input type="checkbox" value="Omnivore/Standard-American" onChange={handleSelection} /> Omnivore/Standard-American
          <input type="checkbox" value="Vegetarian" onChange={handleSelection} /> Vegetarian
          <input type="checkbox" value="Gluten-free" onChange={handleSelection} /> Gluten-free
          <input type="checkbox" value="Paleo" onChange={handleSelection} /> Paleo
        </div>
        <button type="submit">Submit</button>
      </form>
      {mealList && (
        <div>
          <h4>Meals for selected diet:</h4>
          {mealList.split(', ').map((meal, index) => (
            <div key={index}>
              <input type="radio" name="meal" value={meal} onChange={handleSelection} />
              {meal}
            </div>
          ))}
        </div>
      )}
      {showShoppingList && (
        <div>
          <h4>Shopping List and Recipes:</h4>
          <p>{shoppingList}</p>
        </div>
      )}
    </main>
  </div>
  );
};

export default MarketMaven;


