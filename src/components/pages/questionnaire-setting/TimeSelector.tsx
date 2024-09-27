import {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import {Navigation, Mousewheel} from 'swiper/modules';
import {T_TimerValue} from "@/src/components/pages/questionnaire-setting/QuestionnaireTimingSection";
import SwiperCore from 'swiper'
import {
    CommaContainer,
    TimeColumn,
    TimeOptionsContainer,
    TimeSelectorContainer
} from "@/src/styles/pages/questionnaire-setting/page";
import {T_SetState} from "common-types";

type setTimerValueType = (value: number, key: 'minute' | 'hour' | 'second') => void
type TimeSelectorProp = {
    setTimerValue: setTimerValueType
    selectorAppear: boolean,
    timerValue: T_TimerValue,
    setSelectorAppear: T_SetState<boolean>
}
type TimerSwiperProp = {
    arrayList: number[],
    timeKey: 'minute' | 'second' | 'hour',
    value: number,
    setTimerValue: setTimerValueType
}
const SelectorSwiper = ({arrayList, value, setTimerValue, timeKey}: TimerSwiperProp) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

    useEffect(() => {
        if (swiperInstance) {
            if (timeKey === 'minute' || timeKey === 'second')
                swiperInstance.slideTo(value + 7);
            else if (timeKey === 'hour')
                swiperInstance.slideTo(value + 7);
        }

    }, [swiperInstance, timeKey]);

    return <Swiper
        freeMode={{sticky: true, momentumRatio: 0.25, momentumVelocityRatio: 0.25, minimumVelocity: 0.1,}}
        slideToClickedSlide={true}
        loopAdditionalSlides={5}
        dir="rtl"
        className="mySwiper"
        onSwiper={setSwiperInstance}
        initialSlide={arrayList.findIndex((Item) => Item === value)}
        onSlideChange={(E: SwiperCore) => {
            // if(!isNaN(E.realIndex + 1))
            // setTimerValue((prevState) => ({ ...prevState , [timeKey] : E.realIndex + 1 }))
        }}
        onSlideChangeTransitionEnd={(E: SwiperCore) => {
            setTimerValue(E.realIndex, timeKey);
        }}
        onSliderMove={(E: SwiperCore) => {
            // setTimerValue((prevState) => ({ ...prevState , [timeKey] : E.realIndex + 1 }))
        }}
        centeredSlides={true}
        slidesPerView={3}
        direction={'vertical'}

        loop={true}
        modules={[Navigation, Mousewheel]} mousewheel={{sensitivity: 0.5}}>
        {
            arrayList.map((_, index: number) =>
                <SwiperSlide>
                    <TimeOptionsContainer key={index}>{index}</TimeOptionsContainer>
                </SwiperSlide>)
        }
    </Swiper>
}

export const TimeSelector = ({selectorAppear, timerValue, setTimerValue, setSelectorAppear}: TimeSelectorProp) => {
    const timeSelectorRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (e: any) => {
        if(timeSelectorRef.current === null)
            return

        if (!timeSelectorRef.current!.contains(e.target))
            setSelectorAppear(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return <TimeSelectorContainer ref={timeSelectorRef} selectorAppear={selectorAppear}>
        {/*    <TimeColumn>*/}
        {/*    <span>ثانیه</span>*/}
        {/*    <TimeOptionsContainer>*/}
        {/*        <SelectorSwiper value={timerValue.second} timeKey={'second'}*/}
        {/*                        setTimerValue={setTimerValue}*/}
        {/*                        arrayList={Array.from({ length : 61 })} />*/}
        {/*    </TimeOptionsContainer>*/}
        {/*</TimeColumn>*/}
        {/*    <CommaContainer>:</CommaContainer>*/}
        <TimeColumn>
            <span>دقیقه</span>
            <TimeOptionsContainer>
                <SelectorSwiper value={timerValue.minute} timeKey={'minute'}
                                setTimerValue={setTimerValue}
                                arrayList={Array.from({length: 61})}/>
            </TimeOptionsContainer>
        </TimeColumn>
        <CommaContainer>:</CommaContainer>
        <TimeColumn>
            <span>ساعت</span>
            <TimeOptionsContainer>
                <SelectorSwiper value={timerValue.hour} timeKey={'hour'}
                                setTimerValue={setTimerValue}
                                arrayList={Array.from({length: 25})}/>
            </TimeOptionsContainer>
        </TimeColumn>
    </TimeSelectorContainer>
}
