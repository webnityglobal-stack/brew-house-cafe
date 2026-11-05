
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { menuItems, photos } from '../data/content';
import MenuCard from '../components/MenuCard';
import SectionHeading from '../components/SectionHeading';
import { useCafeList } from '../context/CafeListContext';

const cats = [
  'All',
  'Coffee',
  'Bakery',
  'Brunch',
  'Dessert'
];

export default function Menu() {
  const [cat, setCat] = useState('All');

  // Global list functionality
  const { addToList, totalItems } = useCafeList();

  // Category filtering
  const filtered = useMemo(
    () =>
      cat === 'All'
        ? menuItems
        : menuItems.filter(
            (item) => item.category === cat
          ),
    [cat]
  );

  return (
    <>
      {/* Menu Hero */}

      <div
        className="page-hero"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(30,25,21,.78),rgba(30,25,21,.25)),url(${photos.coffee})`
        }}
      >
        <div className="site-wrap">

          <p className="eyebrow !text-[#e9b18b]">
            A little something for everyone
          </p>

          <h1 className="page-title">
            The menu
          </h1>

          <p className="mt-4 max-w-xl text-[18px] leading-8 text-white/80">
            From your first coffee to that one-more-bite dessert.
          </p>

        </div>
      </div>

      {/* Menu Section */}

      <section className="section-pad">

        <div className="site-wrap">

          <SectionHeading
            eyebrow="Made with good ingredients"
            title="Find your new favourite"
            copy="Our menu changes with the seasons. These are a few of the treats you'll often find at our counter."
          />

          {/* Category Filters */}

          <div className="my-9 flex flex-wrap justify-center gap-2">

            {cats.map((c) => (

              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-5 py-3 text-[16px] font-semibold transition ${
                  cat === c
                    ? 'border-coffee bg-coffee text-white'
                    : 'border-ink/15 bg-white hover:border-coffee'
                }`}
              >
                {c}
              </button>

            ))}

          </div>

          {/* List Count */}

          {totalItems > 0 && (

            <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-soft">

              <p className="text-[16px] font-semibold text-coffee">
                <span className="font-bold">
                  {totalItems}
                </span>{' '}
                items added to your list!
              </p>

              <Link
                to="/list"
                className="rounded-full bg-coffee px-5 py-3 text-[16px] font-bold text-white transition hover:bg-rust"
              >
                View My List →
              </Link>

            </div>

          )}

          {/* Menu Products */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filtered.map((item) => (

              <MenuCard
                key={item.name}
                item={item}
                onAdd={addToList}
              />

            ))}

          </div>

          {/* Price Note */}

          <p className="mt-8 text-center text-[16px] text-ink/55">
            Prices in INR. Please ask our team about allergens and dietary options.
          </p>

        </div>

      </section>
    </>
  );
}
