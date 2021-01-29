import ResponseInfo from '../ResponseInfo/ResponseInfo';
import URLInfo from '../URLInfo/URLInfo';
import './RequestContainer.css';

const RequestContainer = () => {
    return (
        <div className="RequestContainer">
            <URLInfo />  
            <ResponseInfo />
            <ResponseInfo />
        </div>
    );
}

export default RequestContainer;