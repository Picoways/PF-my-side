import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom";
import Style from "./NavBar.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import { filterPerCategory, getProducts } from "../../redux/actions/"

function NavBar() {

  const products = useSelector((state) => state.products)
  const allProducts = useSelector((state) => state.allProducts)
  const categories = useSelector((state) => state.categories)
  const [dropdown, setDropdown] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const openDropdown = () => {
    setDropdown(!dropdown)
  }

  const handleDropdown = (e) => {
    dispatch(filterPerCategory(e.target.value))
    navigate("/products")
  }


  return (
    <div className={Style.container}>
      <Dropdown isOpen={dropdown} toggle={openDropdown} size="lr" >
        <DropdownToggle caret>
          Categorias
        </DropdownToggle>
        <DropdownMenu >
          {
            categories?.map((e) => <DropdownItem value={e} onClick={(e) => handleDropdown(e)}
            > {e}
            </DropdownItem>)
          }
        </DropdownMenu>
      </Dropdown>
      <Link to='/products' style={{ textDecoration: 'none' }} className={Style.text}>
        <h1 onClick={(e) => dispatch(getProducts(e))}>Productos</h1>
      </Link>
      <Link to='/create' style={{ textDecoration: 'none' }} className={Style.text}>
        <h1>Arma tu PC</h1>
      </Link>
      <Link to='/help' style={{ textDecoration: 'none' }} className={Style.text}>
        <h1>Ayuda</h1>
      </Link>
    </div>
  )
}

export default NavBar