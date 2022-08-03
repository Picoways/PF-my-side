import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addToWishList } from "../../../redux/actions"
import Style from "./AddWishButton.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useJwt } from "react-jwt"

function AddWishButton({ id }) {

    const [inList] = useState(0)
    const dispatch = useDispatch()
    const { decodedToken } = useJwt(localStorage.getItem("usuario"))
    let autho = decodedToken?.role
    const wishes = useSelector((state) => state.wishList);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        autho && autho === "user" && setLoading(false)
    }, [decodedToken])

    function addToWish(e) {
        e.preventDefault()
        if (loading === false) {
            if (!wishes.map((a) => a._id).includes(id)) {
                dispatch(addToWishList(id))
                swal("Listo!","El producto fue agregado a tu lista de deseados","success")
            } else {
                swal("Oops","Este producto ya se encuentra en tu lista","warning")
            }
        }
        if(loading === true){
            swal("Atencion!","Debes estar logueado para utilizar esta funcion","error")
        }
    }


    return (
        <button className={Style.cartButton} onClick={(e) => addToWish(e)}>
            <div className={Style.karting}><FavoriteIcon style={{ fontSize: "40px" }} /></div>
            {!inList ? (<div>Añadir a lista de deseados</div>) : (<div>En lista de deseados</div>)}

        </button>
    )
}

export default AddWishButton