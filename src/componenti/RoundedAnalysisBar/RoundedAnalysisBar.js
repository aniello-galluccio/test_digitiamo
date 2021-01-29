import { useEffect, useState } from 'react';
import './RoundedAnalysisBar.css';
import PropTypes from 'prop-types';

const RoundedAnalysisBar = props => {
    const [punteggio, setPunteggio] = useState(0);
    const [aggettivo, setAggettivo] = useState('Bad');
    const [pointerColor, setPointerColor] = useState('');
    const [pointerDEG, setPointerDEG] = useState('');

    let px = props.px ;
    let coverPx = (props.px - (props.px/8));
    let cover2PX = props.px/5 + "px";
    let pointerSize = props.px/6;

    const rotatePointer = () => {
        let proporzione;

        if(punteggio <= 600)
        {
            //1: -40 = 600 : 90
            //600 : 130(40 + 90) = punteggio : x
            proporzione = ((punteggio * 130) / 600) -40;
        }
        else if(punteggio > 600 && punteggio <= 700) {
            //0: 90 = 100 : 155
            //100 : 65(155-90) = (punteggio - 600) : x
            proporzione = (((punteggio-600) * 65) / 100) + 90;
        }
        else if(punteggio > 700 && punteggio <= 800) {
            proporzione = (((punteggio-700) * 40) / 100) + 155;
        }
        else{
            proporzione = 220;
        }
        setPointerDEG(proporzione);
    }

    useEffect(() => {
        const punteggioParagone = 720;
        //punteggioParagone : props.paragone = x : props.second
        const proporzione = (((props.second * punteggioParagone) / props.paragone) - punteggioParagone);

        const point = Math.trunc(punteggioParagone-proporzione);

        if(point <= 0) {
            setPunteggio(1);
        }
        else {
            setPunteggio(point);
        }
    }, [props.second, props.paragone]);

    useEffect(() => {
        if(punteggio <= 600) {
            setPointerColor('#ff5555');
            setAggettivo('Bad');
        }
        else if(punteggio > 600 && punteggio <= 700) {
            setPointerColor('#ffd221');
            setAggettivo('Fair');
        }
        else if(punteggio > 700 && punteggio <= 800) {
            setPointerColor('#77e6b4');
            setAggettivo('Great');
        }
        else{
            setPointerColor('rgb(91, 207, 155)');
            setAggettivo('Excellent');
        }

        rotatePointer();
    }, [punteggio])

    return (
        <div className="RoundedAnalysisBar" style={{width: px, height: px}}>
            <div className="left_circle" style={{borderTopLeftRadius: px, borderBottomLeftRadius: px}}>
            </div>
            <div className="right_circle" style={{borderTopRightRadius: px, borderBottomRightRadius: px}}>
                <div className="right_circle_top"></div>
                <div className="right_circle_center"></div>
                <div className="right_circle_bottom"></div>
            </div>
            <div className="circle_cover" style={{width: coverPx, height: coverPx}}></div>
            <div className="circle_cover_2" style={{height: cover2PX}}></div>

            <div className="rounded_analysis_bar_punteggio">
                <p className="rounded_analysis_bar_punteggio_number">{punteggio}</p>
                <p className="rounded_analysis_bar_punteggio_number rounded_analysis_bar_punteggio_text">{aggettivo}!</p>
            </div>

            <div className="rounded_analysis_bar_info">
                <p className="round_analysis_bar_info_text">{props.text}</p>
                <p className="round_analysis_bar_info_text round_analysis_bar_info_second">{props.second}s</p>
            </div>

            <div className="rounded_analysis_bar_pointer_container" style={{transform: `rotate(${pointerDEG}deg)`}}>  
                <div className="rounded_analysis_bar_pointer" style={{width: pointerSize, height: pointerSize, backgroundColor: pointerColor}}>
                    <div className="rounded_analysis_bar_pointer_cover" style={{width: pointerSize/2, height: pointerSize/2}}></div>
                </div>
            </div>

            <p className="rounded_analysis_bar_numberon rounded_analysis_bar_numberon_600">600</p>
            <p className="rounded_analysis_bar_numberon rounded_analysis_bar_numberon_700">700</p>
            <p className="rounded_analysis_bar_numberon rounded_analysis_bar_numberon_800">800</p>
        </div>
    );
}

RoundedAnalysisBar.propTypes = {
    px: PropTypes.number,
    second: PropTypes.number,
    paragone: PropTypes.number,
    text: PropTypes.string
}

export default RoundedAnalysisBar;