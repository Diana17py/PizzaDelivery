import React from 'react';
import { Link } from 'react-router-dom'; 
import Banner from './Banner';
import CategoryItem from './CategoryItem';

const HomePage = ({ row1Categories, row2Categories }) => {
  const pages = [
    { name: 'ПІЦА', url: '/pizza', image: '/img/pizzaa.jpg' },
    { name: 'НАБОРИ', url: '/pizza-sets', image: '/img/sets.jpg' },
    { name: 'СНЕКИ', url: '/snacks', image: '/img/snacks.png' },
    { name: 'НАПОЇ', url: '/drinks', image: '/img/drinks.jpg' },
];
  return (
    <>
      <Banner />
      <nav className="menu-bar">
        <div className="categories">
          {pages.map((category) => (
            <Link key={category.name} to={category.url} className="category-link">
              <img src={process.env.PUBLIC_URL + category.image} alt={category.name} className="category-image" />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </nav>
      <section className="frequently-ordered">
        <h2>Найчастіше замовляють:</h2>
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
          <h2>Доставка піци</h2>
          <p>
          Плануєте вечірку, ділову зустріч чи сімейну вечерю? Тоді доставка піци – це те, що вам потрібно
            потреба.
          Place Pizza пропонує широкий вибір українських страв, створених за найкращими рецептами майстрів
            кухарів.
          Ознайомитися з різними видами піци можна в електронному каталозі нашого сайту. Вибирати
            саме на ваш смак, ви можете відразу переглянути список інгредієнтів вибраних страв. Ми намагаємося
            економимо ваш час, тому ми відразу надаємо максимум інформації про наш продукт.
          </p>

          <h3>Як зробити замовлення?</h3>
          <p>
          Щоб скуштувати страви з нашого меню, необхідно оформити замовлення на сайті або зателефонувати за вказаним номером
            номер. Виберіть свою улюблену піцу з начинкою на свій смак. У нашому каталозі буде
            знайти смачний варіант навіть для найвибагливішого клієнта.
          </p>
          <p>Оплатити замовлення їжі можна двома способами: на сайті через Monobank або готівкою при отриманні.</p>

          <h3>Наші переваги</h3>
          <p>
          Доставка їжі - ідеальне рішення, адже замовляючи готові страви, ви звільняєте час для
            важливі речей в житті - проведення часу з друзями та родиною або заняття улюбленим хобі. Отже, ви можете
            У Place Pizza замовляти снеки чи улюблену піцу та робити корисні справи.
          </p>
        </div>
      </section>

    </>
  );
};

export default HomePage;
