import './ResponseInfo.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ResponseInfo = () => {
    const [display, setDisplay] = useState('none');
    const reqData = useSelector(state => state.request);

    useEffect(() => {
        if(reqData.domain) {
            setDisplay('block');
        }
        else {
            setDisplay('none');
        }

    }, [reqData]);

    return (
        <div className="ResponseInfo" style={{display: display}}>
            <p className="response_info_header">RESPONSE</p>

            <div className="response_info_info">
                <p className="response_info_info_text">Prova1</p>
            </div>

            <div className="response_info_info">
                <p className="response_info_info_text">Prova2</p>
            </div>

            <div className="response_info_info">
                <p className="response_info_info_text">Prova3</p>
            </div>
        </div>
    );
}

export default ResponseInfo;