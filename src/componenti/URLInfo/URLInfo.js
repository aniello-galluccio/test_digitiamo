import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './URLInfo.css';

const URLInfo = () => {
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
        <div className="URLInfo" style={{display: display}}>
            <div className="url_info_header">
                <p className="url_info_header_text">URL INFO</p>
            </div>

            <div className="url_info_container">
                <p className="url_info_container_key">DOMAIN</p>
                <p className="url_info_container_value">{reqData.domain}</p>
            </div>

            <div className="url_info_container">
                <p className="url_info_container_key">SCHEME</p>
                <p className="url_info_container_value">{reqData.scheme}</p>
            </div>

            <div className="url_info_container">
                <p className="url_info_container_key">PATH</p>
                <p className="url_info_container_value">{reqData.path}</p>
            </div>
        </div>
    );
}

export default URLInfo;