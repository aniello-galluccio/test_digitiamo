import { useEffect, useState } from 'react';
import './StatusCode.css';
import PropTypes from 'prop-types';

const StatusCode = props => {
    const [codeText, setCodeText] = useState('');

    const setText = code => {
        switch(removeXX(code))
        {
            case 1:
                return 'Informational Response!';
            case 2:
                return 'Everything is fine!';
            case 3:
                return 'Redirection!';
            case 4:
                return 'Client error!';
            case 5:
                return 'Server error!';
            default:
                return 'Code does not exist';
        }
    }

    const removeXX = code => {
        return Math.trunc(code/100);
    }

    useEffect(() => {
        setCodeText(setText(props.code));
    }, [props.code])

    return (
        <div className="StatusCode" style={{display: props.display}}>
            <p className="status_code_number">{props.code}</p>
            <p className="status_code_text">{codeText}</p>
        </div>
    )
}

StatusCode.propTypes = {
    code: PropTypes.number,
    display: PropTypes.oneOf(['none', 'block'])
}

export default StatusCode;