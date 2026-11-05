
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Menu,
  X,
  Coffee,
  ShoppingBag
} from 'lucide-react';

import { useCafeList } from '../context/CafeListContext';

const links = [
  ['Home', '/'],
  ['Our Story', '/about'],
  ['Menu', '/menu'],
  ['Gallery', '/gallery'],
  ['Contact', '/contact']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { totalItems } = useCafeList();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur">

      <div className="site-wrap flex h-[76px] items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-coffee text-cream">
            <Coffee size={21} />
          </span>

          <span className="font-display text-[22px] font-bold leading-none">
            Brew House

            <span className="block pt-1 font-sans text-[16px] font-semibold uppercase tracking-[.25em] text-coffee">
              Coffee & good company
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* My List Button */}

          <Link
            to="/list"
            className="relative flex items-center gap-2 rounded-full border border-coffee px-4 py-3 text-[16px] font-bold text-coffee transition hover:bg-coffee hover:text-white"
          >
            <ShoppingBag size={19} />

            My List

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-rust px-1 text-[14px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/contact#booking"
            className="btn btn-dark !py-3"
          >
            Book a table
          </Link>

        </nav>

        {/* Mobile Menu Button */}

        <button
          aria-label="Toggle navigation"
          className="rounded-full p-2 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>

      {/* Mobile Navigation */}

      {open && (
        <nav className="grid gap-1 border-t border-ink/10 bg-cream px-5 py-4 md:hidden">

          {links.map(([label, to]) => (
            <NavLink
              onClick={() => setOpen(false)}
              key={to}
              to={to}
              end={to === '/'}
              className="rounded-xl px-4 py-3 text-[17px] font-semibold hover:bg-white"
            >
              {label}
            </NavLink>
          ))}

          {/* Mobile My List */}

          <Link
            to="/list"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-[17px] font-bold text-coffee hover:bg-white"
          >
            <ShoppingBag size={20} />

            My List ({totalItems})
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/contact#booking"
            className="btn btn-dark mt-2"
          >
            Book a table
          </Link>

        </nav>
      )}

    </header>
  );
}
