import { NavLink } from "react-router-dom"
import S from './navbar.module.css'

export const Navbar = () => {
  return (
    <nav className={S["navbar"]}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
    </nav>
  )
}