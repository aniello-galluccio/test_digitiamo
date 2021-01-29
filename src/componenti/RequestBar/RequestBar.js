import { useState } from 'react';
import './RequestBar.css';
import SvgColor from 'react-svg-color';
import searchIcon from '../../media/search.svg';

import DropDown from '../DropDown/DropDown';
import { useDispatch } from 'react-redux';

import {requestAction} from '../../redux/actions/request';

const RequestBar = () => {
    const [reqMethod, setReqMethod] = useState('GET');
    const [urlErrorDisp, setUrlErrorDisp] = useState('none');

    const dispatch = useDispatch();

    const setMethod = method => {
        setReqMethod(method);
    }

    const verifyUrl = url => {
        if(url.charAt(0) !== 'h' || url.charAt(1) !== 't' || url.charAt(2) !== 't' || url.charAt(3) !== 'p')
        {
            throw "url incorretto";
        }
    }

    const saveRequest = urlString => {
        try {
            const str = String(urlString);
            const url = new URL(str);
            verifyUrl(str);
            const reqObj = {
                domain: url.host,
                path: url.pathname,
                scheme: 'HTTP'
            }
    
            dispatch(requestAction('insertNewRequest', reqObj));
            setUrlErrorDisp('none');
        } catch (error) {
            setUrlErrorDisp('block');
            dispatch(requestAction('insertNewRequest', {}));
        }     
    }

    const sendRequest = url => {
        /*
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url
            })
        }
        
        fetch('http://localhost:4000/api/HTTP/' + reqMethod, options)
        .then(res => res.json())
        .then(res => console.log(res));
        */
    }

    const submitRequest = () => {
        const url = document.getElementById('reqBarInput').value;
        saveRequest(url);
        if(urlErrorDisp === 'none')
        {
            sendRequest(url);
        }
    }

    return (
        <div>
            <div className="RequestBar">
                <DropDown text={reqMethod} arrMenu={['GET', 'POST', 'PUT', 'DELETE']} handleClick={setMethod}/>

                <input id="reqBarInput" className="request_bar_input" placeholder="Inserisci URL ( http://example.com/movies.json )"></input>

                <button className="request_bar_submit" onClick={() => submitRequest()}>
                    <p className="request_bar_submit_text">SEND</p>
                    <i className="request_bar_submit_icon"><SvgColor 
                        svg={searchIcon} 
                        width={24} 
                        colors={["#FFFFFF"]}   
                    /></i>
                </button>
            </div>
            <p className="request_bar_url_error" style={{display: urlErrorDisp}}>Verifica che l'URL inserito è corretto</p>
        </div>
    );
}

export default RequestBar;