import style from './News.module.css'
import React, {useEffect, useState} from "react";


const News = (props) => {
    const [count, setCount] = useState(0)
    const [buttonState, setState] = useState(true)

    useEffect (() => {
        document.title = `Вы нажали ${count} раз`;
    })

    return(
        <div>
            News
            <div>
                <div><span>{count}</span></div>
                <div>
                    <button disabled={buttonState} onClick={() => setCount(count + 1)} >+1</button>
                    <button onClick={() => setState(!buttonState)}>{buttonState ? 'enabled ' : 'disabled'}</button>
                </div>
            </div>
        </div>
    )
};

export default News
