
import { Plus, Check } from "lucide-react";
import { useState } from "react";

export default function MenuCard({ item, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!onAdd) return;

    onAdd(item);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-soft">

      <div className="relative h-52 overflow-hidden">

        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {item.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-2 text-[16px] font-semibold text-coffee">
            {item.tag}
          </span>
        )}

      </div>

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <h3 className="font-display text-[21px] font-semibold">
            {item.name}
          </h3>

          <span className="shrink-0 text-[18px] font-bold text-coffee">
            ₹{item.price}
          </span>

        </div>

        <p className="mt-2 min-h-[48px] text-[16px] leading-6 text-ink/60">
          {item.desc}
        </p>

        <button
          onClick={handleAdd}
          className={`mt-4 inline-flex items-center gap-2 text-[16px] font-bold transition ${
            added
              ? "text-green-700"
              : "text-coffee hover:text-rust"
          }`}
        >

          {added ? (
            <>
              <Check size={18} />
              Added to your list
            </>
          ) : (
            <>
              <Plus size={18} />
              Add to your list
            </>
          )}

        </button>

      </div>

    </article>
  );
}
