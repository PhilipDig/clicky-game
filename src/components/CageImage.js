import React from "react"

import placeCage from "./placecage_g_300x300.jpg"

const CageImage = (props) => {

    return (

        <div
            onClick={() => props.onClick(props.shade)}
            style={{
                boxShadow: `300px 300px ${props.shade}55 inset`,
                background: `url(${placeCage})`,
                width: 300,
                height: 300
            }}>
        </div>
    )
}

export default CageImage