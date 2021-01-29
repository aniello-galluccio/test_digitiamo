import './TimingAnalysis.css';
import {useEffect, useState} from 'react';
import RoundedAnalysisBar from '../RoundedAnalysisBar/RoundedAnalysisBar';
import PropTypes from 'prop-types';

const TimingAnalysis = props => {
    const [swypeVH, setSwypeVH] = useState('5');
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState({});
    const [pageHeight, setPageHeight] = useState();

    useEffect(() => {
        if(isOpen)
        {
            setPageHeight(window.innerHeight);
            console.log(window.innerHeight);
        }
    }, [isOpen])

    const touchMove = (e) => {
        const heightSize = window.innerHeight;
        const currentYPosition = e.changedTouches[0].pageY;
        const swypeElement = document.getElementById("timing_analysis");

        //100 : heigthSize = x : currentYPos
        const proporzione = 100 - ((currentYPosition * 100) / heightSize);
        setSwypeVH(proporzione);

        if(proporzione <= 5)
        {
            swypeElement.style.height = "5vh";
        }
        else if(proporzione > 100)
        {
            swypeElement.style.height = "100vh";
        }
        else
        {
            swypeElement.style.height = proporzione + "vh";
        }
    }

    const openClose = () => {
        let height;
        const touchDurate = Date.now() - startDate;
        if(touchDurate < 300)
        {
            if(isOpen)
            {
                height = 5;
                setIsOpen(false);
            }
            else
            {
                height = 100;
                setIsOpen(true);
            }
        }
        else
        {
            if(swypeVH <= 50)
            {
                height = 5;
                setIsOpen(false);
            }
            else
            {
                height = 100;
                setIsOpen(true);
            }
        }

        const swypeElement = document.getElementById("timing_analysis");
        swypeElement.style.transition = "height .6s";
        swypeElement.style.height = height + "vh";
        setTimeout(() => {
            swypeElement.style.transition = "null";
        }, 600);
    }

    const touchStart = () => {
        setStartDate(Date.now());
        document.getElementById('appMobile').style.overflow = "hidden";
    }

    const touchEnd = () => {
        openClose();
        document.getElementById('appMobile').style.overflow = "scroll";
    }

    return (
        <div className="TimingAnalysis" id="timing_analysis" style={{display: props.display}}>
            <div className="timing_analysis_swype_button" onTouchStart={() => touchStart()} onTouchMove={e => touchMove(e)} onTouchEnd={() => touchEnd()}>
                <div className="timing_analysis_swype_button_icon"></div>
            </div>

            <div className="timing_analysis_page_load">
                <RoundedAnalysisBar px={pageHeight/4} second={0.45} paragone={0.4} text={"Page Load"}/>
            </div>

            <div className="timing_analysis_first_interaction">
                <RoundedAnalysisBar px={pageHeight/4} second={1.5} paragone={0.9} text={"First Interaction"}/>
            </div>
        </div>
    );
}

TimingAnalysis.propTypes = {
    display: PropTypes.oneOf(['none', 'block'])
}

export default TimingAnalysis;