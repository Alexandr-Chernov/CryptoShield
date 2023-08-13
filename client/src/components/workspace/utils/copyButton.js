import React, { useState } from "react";

import copy_icon from "../../../assets/img/copy_icon.png";
import copy_success_icon from "../../../assets/img/copy_success_icon.png";

const CopyButton = ({ text }) => {

    const [isClicked, setIsClicked] = useState(false);

    const copyToClipboard = (text) => {
        var textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 500);
    }

    return (
        <>
            {isClicked ?
                <img
                    src={copy_success_icon}
                    alt="copy success icon"
                    width="25px"
                />
                :
                <img
                    onClick={() => copyToClipboard(text)}
                    src={copy_icon}
                    alt="copy icon"
                    width="25px"
                />
            }
        </>
    )

}

export default CopyButton;
