import clsx from "clsx"
import { NavLink } from "react-router"

const Menu = () => {
  return (
    <nav className={clsx("fixed bottom-10 left-1/2 -translate-x-1/2 flex justify-around gap-2 p-1 rounded-full bg-black/6 menu-glass")}>
      {[
        { to: "/", text: "home" },
        { to: "/promote", text: "promote" },
        { to: "/claim", text: "claim" },
      ].map(val => (
        <NavLink
          key={val.to}
          to={val.to}
          className={({ isActive }) =>
            clsx(
              "text-sm p-2 px-3 rounded-full text-white/85 hover:bg-white/8 hover:text-white menu-item",
              isActive && "bg-white/16 text-white menu-item--active",
            )
          }
        >
          {val.text}
        </NavLink>
      ))}
    </nav>
  )
}

export default Menu
