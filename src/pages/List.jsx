
import { Link } from 'react-router-dom';
import {
    Plus,
    Minus,
    Trash2,
    ShoppingBag,
    ArrowLeft,
    ClipboardCopy
} from 'lucide-react';

import { useCafeList } from '../context/CafeListContext';

export default function List() {
    const {
        items,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearList,
        totalItems,
        totalPrice
    } = useCafeList();

    const copyOrder = async () => {
        const order = [
            'BREW HOUSE CAFE ORDER',
            '----------------------',
            ...items.map(
                item =>
                    `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
            ),
            '----------------------',
            `Total Items: ${totalItems}`,
            `Total Amount: ₹${totalPrice}`
        ].join('\n');

        try {
            await navigator.clipboard.writeText(order);
            alert('Order list copied successfully!');
        } catch {
            alert('Unable to copy order list.');
        }
    };

    return (
        <section className="min-h-screen bg-[#f8f4ed] py-10 md:py-16">
            <div className="site-wrap">

                <Link
                    to="/menu"
                    className="mb-8 inline-flex items-center gap-2 text-[16px] font-semibold text-coffee"
                >
                    <ArrowLeft size={19} />
                    Continue Shopping
                </Link>

                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

                    <div>
                        <p className="eyebrow">Your favourites</p>
                        <h1 className="font-display text-4xl font-bold text-ink">
                            My List
                        </h1>
                        <p className="mt-2 text-[17px] text-ink/60">
                            Your selected coffee and delicious treats.
                        </p>
                    </div>

                    {items.length > 0 && (
                        <button
                            onClick={() => {
                                if (window.confirm('Clear your complete list?')) {
                                    clearList();
                                }
                            }}
                            className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-3 text-[16px] font-semibold text-red-600"
                        >
                            <Trash2 size={18} />
                            Clear List
                        </button>
                    )}

                </div>

                {items.length === 0 ? (

                    <div className="rounded-3xl bg-white px-5 py-16 text-center shadow-soft">

                        <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-cream text-coffee">
                            <ShoppingBag size={35} />
                        </div>

                        <h2 className="font-display text-2xl font-bold">
                            Your list is empty!
                        </h2>

                        <p className="mt-3 text-[17px] text-ink/60">
                            Add your favourite items from our menu.
                        </p>

                        <Link to="/menu" className="btn btn-dark mt-7 inline-flex">
                            Explore Our Menu
                        </Link>

                    </div>

                ) : (

                    <div className="grid items-start gap-8 lg:grid-cols-[1fr_350px]">

                        <div className="space-y-4">

                            {items.map(item => (

                                <article
                                    key={item.name}
                                    className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-soft sm:flex-row sm:items-center"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-28 w-full rounded-xl object-cover sm:w-28"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-display text-xl font-bold">
                                            {item.name}
                                        </h3>

                                        <p className="mt-1 text-[16px] text-ink/60">
                                            {item.category}
                                        </p>

                                        <p className="mt-2 text-[17px] font-bold text-coffee">
                                            ₹{item.price}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">

                                        <div className="flex items-center gap-3 rounded-full border border-ink/10 px-3 py-2">

                                            <button
                                                onClick={() => decreaseQuantity(item.name)}
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={18} />
                                            </button>

                                            <span className="min-w-5 text-center text-[17px] font-bold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => increaseQuantity(item.name)}
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={18} />
                                            </button>

                                        </div>

                                        <div className="text-right">

                                            <p className="text-[18px] font-bold">
                                                ₹{item.price * item.quantity}
                                            </p>

                                            <button
                                                onClick={() => removeItem(item.name)}
                                                className="mt-2 inline-flex items-center gap-1 text-[16px] font-semibold text-red-500"
                                            >
                                                <Trash2 size={16} />
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                        <aside className="rounded-2xl bg-white p-6 shadow-soft lg:sticky lg:top-28">

                            <h2 className="font-display text-2xl font-bold">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-4">

                                <div className="flex justify-between text-[17px]">
                                    <span>Total Items</span>
                                    <span className="font-semibold">{totalItems}</span>
                                </div>

                                <div className="flex justify-between text-[17px]">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">₹{totalPrice}</span>
                                </div>

                                <div className="flex justify-between border-t border-ink/10 pt-4">
                                    <span className="text-[18px] font-bold">Total</span>
                                    <span className="text-2xl font-bold text-coffee">
                                        ₹{totalPrice}
                                    </span>
                                </div>

                            </div>

                            <Link
                                to="/checkout"
                                className="mt-7 flex w-full items-center justify-center rounded-full bg-coffee px-5 py-4 text-[17px] font-bold text-white hover:bg-rust"
                            >
                                Place Order
                            </Link>

                            <Link
                                to="/contact#booking"
                                className="mt-3 flex w-full items-center justify-center rounded-full border border-coffee px-5 py-4 text-[17px] font-bold text-coffee hover:bg-cream"
                            >
                                Book a Table
                            </Link>

                        </aside>

                    </div>

                )}

            </div>
        </section>
    );
}
