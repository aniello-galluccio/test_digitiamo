import { useState } from 'react';
import './DropDown.css';
import PropTypes from 'prop-types';

const DropDown = props =>
{
    const [isOpen, setIsOpen] = useState(false);
    const [dropDownDisplay, setDropDownDisplay] = useState('none');

    const changeBtnBG = () => {
        if(isOpen)
        {
            setDropDownDisplay('none');
        }
        else
        {
            setDropDownDisplay('block');
        }

        setIsOpen(!isOpen);
    }

    return(
        <button className="DropDown" onClick={() => changeBtnBG()}>
            {props.text}
            <div className="drop_down_list" style={{display: dropDownDisplay}}>
                {
                    props.arrMenu.map(el => <p key={el} onClick={() => props.handleClick(el)}>{el}</p>)
                }
            </div>
        </button>
    );
}

DropDown.propTypes = {
    arrMenu: PropTypes.array,
    text: PropTypes.string,
    handleClick: PropTypes.func
}

export default DropDown;