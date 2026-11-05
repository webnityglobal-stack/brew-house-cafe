
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, MessageCircle, ShoppingBag } from "lucide-react";
import { useCafeList } from "../context/CafeListContext";
import { CAFE_WHATSAPP_NUMBER } from "../data/config";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearList } = useCafeList();

  const order =
    location.state?.order ||
    JSON.parse(localStorage.getItem("latest-cafe-order") || "null");

  useEffect(() => {
    if (order) {
      clearList();
    }
  }, []);

  if (!order) {
    return (
      <section className="min-h-screen bg-[#f8f4ed] py-16">
        <div className="site-wrap text-center">
          <h1 className="font-display text-3xl font-bold">
            No order found
          </h1>
          <Link to="/menu" className="btn btn-dark mt-6 inline-flex">
            Explore Menu
          </Link>
        </div>
      </section>
    );
  }

  const sendWhatsApp = () => {
    const message = [
      "☕ BREW HOUSE CAFE - NEW ORDER",
      "",
      `Order ID: ${order.orderId}`,
      `Name: ${order.customer.name}`,
      `Mobile: ${order.customer.phone}`,
      `Order Type: ${order.customer.orderType}`,
      order.customer.address
        ? `Address: ${order.customer.address}`
        : "",
      "",
      "ORDER DETAILS:",
      ...order.items.map(
        (item) =>
          `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
      ),
      "",
      `Total Items: ${order.totalItems}`,
      `Total Amount: ₹${order.totalPrice}`,
      order.customer.notes
        ? `Instructions: ${order.customer.notes}`
        : "",
      "",
      "Please confirm my order."
    ]
      .filter(Boolean)
      .join("\n");

    const url =
      `https://wa.me/${CAFE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="min-h-screen bg-[#f8f4ed] px-4 py-12 md:py-16">

      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 text-center shadow-soft md:p-10">

        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-50 text-green-600">
          <CheckCircle size={48} />
        </div>

        <p className="mt-6 text-[16px] font-bold uppercase tracking-widest text-green-700">
          Order submitted
        </p>

        <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
          Thank You, {order.customer.name}!
        </h1>

        <p className="mt-3 text-[17px] leading-7 text-ink/60">
          Your order details have been saved. Please send them to our cafe on WhatsApp for confirmation.
        </p>

        <div className="my-8 rounded-2xl bg-[#f8f4ed] p-5 text-left">

          <div className="flex justify-between gap-3 border-b border-ink/10 pb-4">
            <span className="text-[16px] text-ink/60">
              Order ID
            </span>
            <span className="text-[16px] font-bold">
              {order.orderId}
            </span>
          </div>

          <div className="mt-4 flex justify-between gap-3">
            <span className="text-[16px] text-ink/60">
              Order Type
            </span>
            <span className="text-[16px] font-semibold">
              {order.customer.orderType}
            </span>
          </div>

          <div className="mt-4 flex justify-between gap-3">
            <span className="text-[16px] text-ink/60">
              Mobile
            </span>
            <span className="text-[16px] font-semibold">
              {order.customer.phone}
            </span>
          </div>

          <div className="mt-5 border-t border-ink/10 pt-4">

            <h3 className="mb-4 text-[17px] font-bold">
              Ordered Items
            </h3>

            {order.items.map((item) => (
              <div
                key={item.name}
                className="mb-3 flex justify-between gap-3 text-[16px]"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

          </div>

          <div className="mt-5 flex justify-between border-t border-ink/10 pt-4">
            <span className="text-[18px] font-bold">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-coffee">
              ₹{order.totalPrice}
            </span>
          </div>

        </div>

        <button
          onClick={sendWhatsApp}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-[17px] font-bold text-white transition hover:bg-[#1da851]"
        >
          <MessageCircle size={21} />
          Send Order on WhatsApp
        </button>

        <p className="mt-3 text-[15px] leading-6 text-ink/50">
          WhatsApp will open with your order details. Send the message to complete your request.
        </p>

        <Link
          to="/menu"
          className="mt-5 inline-flex items-center justify-center gap-2 text-[16px] font-bold text-coffee hover:text-rust"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>

      </div>
    </section>
  );
}
