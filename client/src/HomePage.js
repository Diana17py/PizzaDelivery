import React from 'react';
import { Link } from 'react-router-dom'; 
import Banner from './Banner';
import CategoryItem from './CategoryItem';

const HomePage = ({ row1Categories, row2Categories }) => {
  return (
    <>
      <Banner />
      <section className="frequently-ordered">
        <h2>They order most often:</h2>
        <div className="frequently-ordered-categories">
          <div className="row">
          {row1Categories.map((pizza) => (
              <CategoryItem
                key={pizza.id}
                pizza={pizza}
              />
            ))}
          </div>
          <div className="row">
            {row2Categories.map((pizza) => (
              <CategoryItem
                key={pizza.id}
                pizza={pizza}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="delivery-info-section">
        <div className="delivery-info-text left-align">
          <h2>Pizza delivery in Brooklyn</h2>
          <p>
            Planning a party, business meeting or family dinner? Then pizza delivery in Brooklyn is just what you
            need.
          </p>
          <p>
            Place Pizza offers a wide selection of Ukrainian dishes, created according to the best recipes of master
            chefs.
          </p>
          <p>
            You can get acquainted with various types of pizza in the electronic catalog of our website. To choose
            exactly your taste, you can immediately view the list of ingredients of the selected dishes. We try to
            save your time, so we immediately provide the maximum amount of information about our product.
          </p>

          <h3>How to make an order?</h3>
          <p>
            In order to enjoy dishes from our menu, you need to place an order on the website or call the specified
            number. Choose your favorite pizza in Brooklyn with the toppings that suit your taste. IN our catalog will
            find a tasty option for even the most demanding customer.
          </p>
          <p>You can pay for a food order in two ways: on the website through Monobank or in cash upon receipt.</p>

          <h3>Our advantages</h3>
          <p>
            Food delivery in Brooklyn is an ideal solution, because by ordering ready-made meals, you free up time for
            important things in life - spending time with friends and family, or doing your favorite hobby. So, you can
            at Place Pizza order sushi or your favorite pizza, and do useful things.
          </p>
        </div>
      </section>

      <section className="place-pizza-logo">
        <Link to="/" className="place-pizza-logo-link">
          <h2 className="place-pizza-logo-text">PIZZA PLACE</h2>
        </Link>
      </section>
    </>
  );
};

export default HomePage;
