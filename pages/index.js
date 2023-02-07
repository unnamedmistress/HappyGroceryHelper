import React, { useState } from 'react';
import Head from 'next/head';
import styles from './index.module.css';

const MarketMaven = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [mealList, setMealList] = useState('');
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [shoppingList, setShoppingList] = useState('');
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const diet = selectedValues.join(',');
    try {
    // Call the first API to get the list of meals based on the selected diet
    const response = await openai.enginesApi.postJob("text-davinci-003", {
    prompt: `list of meals for ${diet} name of meals limited to 3 words or less, include a breakfast and lunch but do not label it that way, return results in comma separated list`,
    max_tokens: 100,
    });
    setMealList(response.choices[0].text);
    } catch (error) {
    console.error(error);
    setError(error);
    }
    };
    
    const handleSelection = async (e) => {
    if (!e.target.checked) {
    setShowShoppingList(false);
    setShoppingList('');
    return;
    }
    try {
    // Call the second API to get the grocery list and recipes for the selected meal
    const response = await openai.enginesApi.postJob("text-davinci-003", {
    prompt: `Send complete grocery list for 4 adults for all these meals total and recipe for each ${e.target.value}, separate all values by comma and return results in comma separated list`,
    max_tokens: 100,
    });
    setShowShoppingList(true);
    setShoppingList(response.choices[0].text);
    } catch (error) {
    console.error(error);
    setError(error);
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


