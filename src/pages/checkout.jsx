
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCafeList } from "../context/CafeListContext";

export default function Checkout() {
  const navigate = useNavigate();

  const { items, totalItems, totalPrice } = useCafeList();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    orderType: "Pickup",
    address: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!items.length) {
      setError("Your list is empty. Please add products first.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (form.orderType === "Delivery" && !form.address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    const orderId = "BHC" + Date.now().toString().slice(-8);

    const order = {
      orderId,
      customer: form,
      items,
      totalItems,
      totalPrice,
      status: "Pending Confirmation",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "latest-cafe-order",
      JSON.stringify(order)
    );

    navigate("/order-success", {
      state: { order },
    });
  };

  if (!items.length) {
    return (
      <section className="min-h-screen bg-[#f8f4ed] py-16">
        <div className="site-wrap text-center">
          <ShoppingBag size={45} className="mx-auto text-coffee" />
          <h1 className="mt-5 font-display text-3xl font-bold">
            Your list is empty
          </h1>
          <Link to="/menu" className="btn btn-dark mt-6 inline-flex">
            Explore Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8f4ed] py-10 md:py-14">
      <div className="site-wrap">

        <Link
          to="/list"
          className="mb-7 inline-flex items-center gap-2 text-[16px] font-semibold text-coffee"
        >
          <ArrowLeft size={19} />
          Back to My List
        </Link>

        <div className="mb-8">
          <p className="eyebrow">Almost there</p>
          <h1 className="font-display text-4xl font-bold">
            Checkout
          </h1>
          <p className="mt-2 text-[17px] text-ink/60">
            Enter your details to place your cafe order.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">

          {/* Customer Form */}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-5 shadow-soft md:p-8"
          >
            <h2 className="mb-6 font-display text-2xl font-bold">
              Customer Details
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-[16px] font-semibold">
                  Full Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-[16px] outline-none focus:border-coffee"
                />
              </div>

              <div>
                <label className="mb-2 block text-[16px] font-semibold">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10 digit mobile number"
                  maxLength={10}
                  required
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-[16px] outline-none focus:border-coffee"
                />
              </div>

              <div>
                <label className="mb-2 block text-[16px] font-semibold">
                  Order Type *
                </label>

                <select
                  name="orderType"
                  value={form.orderType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-[16px] outline-none focus:border-coffee"
                >
                  <option value="Pickup">Pickup</option>
                  <option value="Dine-in">Dine-in</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              {form.orderType === "Delivery" && (
                <div>
                  <label className="mb-2 block text-[16px] font-semibold">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter complete delivery address"
                    rows={3}
                    required
                    className="w-full rounded-xl border border-ink/15 px-4 py-3 text-[16px] outline-none focus:border-coffee"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-[16px] font-semibold">
                  Special Instructions
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special request? (Optional)"
                  rows={3}
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-[16px] outline-none focus:border-coffee"
                />
              </div>

            </div>

            {error && (
              <p className="mt-5 rounded-xl bg-red-50 p-3 text-[16px] text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-coffee px-5 py-4 text-[17px] font-bold text-white transition hover:bg-rust"
            >
              Confirm My Order · ₹{totalPrice}
            </button>

          </form>

          {/* Order Summary */}

          <aside className="rounded-2xl bg-white p-6 shadow-soft lg:sticky lg:top-28">

            <h2 className="font-display text-2xl font-bold">
              Order Summary
            </h2>

            <div className="mt-5 space-y-4">

              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between gap-3 border-b border-ink/10 pb-4"
                >
                  <div>
                    <p className="text-[16px] font-semibold">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[15px] text-ink/55">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="text-[16px] font-bold">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}

            </div>

            <div className="mt-5 flex justify-between text-[18px] font-bold">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 text-xl font-bold">
              <span>Total Amount</span>
              <span className="text-coffee">₹{totalPrice}</span>
            </div>

          </aside>

        </div>
      </div>
    </section>
  );
}
