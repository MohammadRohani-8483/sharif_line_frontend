'use client'
import MultiRangeSlider, {ChangeResult} from "multi-range-slider-react";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {T_SetState} from "common-types";
import {I_Condition} from "@/src/utils/types/pages/questionnaireSetting";


export const TargetSlider = ({fromYear, toYear , setTargetData}:
     { fromYear: string | null, toYear: string | null , setTargetData : T_SetState<Omit<I_Condition, 'id'>> }) => {
    const [minValue, set_minValue] = useState(1395);
    const [maxValue, set_maxValue] = useState(1400);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if(fromYear)
            set_minValue(parseInt(fromYear));
    }, [fromYear]);
    useEffect(() => {
        if(toYear)
            set_maxValue(parseInt(toYear));
    }, [toYear]);
    const handleInput = (e: ChangeResult) => {
        if(e.minValue !== parseInt(fromYear as string) || e.maxValue !== parseInt(toYear as string))
            setTargetData((prevState) => ({
                ...prevState,
                from_year : e.minValue.toString() ,
                to_year : e.maxValue.toString()
            }));
    };
    useEffect(() => {
        if(sliderRef.current) {
            let thumbs = document.querySelectorAll('.thumb');
            thumbs.forEach((ThumbItem) => {
                let ThumbClassName = ThumbItem.className.replace(' ','.')
                ThumbItem.addEventListener('mouseenter',() => {
                    let captionElement  = document.querySelector(`.${ThumbClassName} .caption`) as HTMLDivElement;
                    captionElement.style.display = 'flex'
                })
                ThumbItem.addEventListener('mouseout',() => {
                    let captionElement  = document.querySelector(`.${ThumbClassName} .caption`) as HTMLDivElement;
                    captionElement.style.display = 'none'
                })
            })
        }
    }, [sliderRef.current]);
    return <MultiRangeSliderContainer >
        <span>1403</span>
        <MultiRangeSlider min={1380}
                          ref={sliderRef}
                          style={{width: '100%', direction: 'ltr'}}
                          max={1403}
                          barInnerColor={'rgba(41, 121, 255, 0.80)'}
                          onChange={handleInput}
                          step={1}
                          canMinMaxValueSame={true}
                          minValue={minValue}
                          maxValue={maxValue}
        />
        <span>1380</span>
    </MultiRangeSliderContainer>
}
const MultiRangeSliderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 7px;

  > span {
    color: var(--sidebar-bg);
    font-weight: 500;
    font-size: 1.4rem;
  }

  & .multi-range-slider {
    border: none;
    box-shadow: none;
  }

  & .multi-range-slider .labels {
    display: none;
  }

  & .multi-range-slider * {
    direction: ltr !important;
  }

  & .ruler {
    display: none !important;
  }

  & .thumb.thumb-right::before, & .thumb.thumb-left::before {
    background: url("/images/svg/SliderHandler.svg");
    background-size: contain;
    border: none;
    box-shadow: none;
    top: 8px;
    width: 18px;
    height: 18px;
  }
  .multi-range-slider .thumb::before {
    margin: -8px -10px !important;
  }
  
  & .multi-range-slider .bar-inner {
    border: none;
    box-shadow: none;
  }

  & .caption .max-caption, & .caption .min-caption {
    background: none !important;
    color: var(--Main) !important;
    box-shadow: none;
    font-size: 1.4rem;
  }

  & .multi-range-slider .bar-right, & .multi-range-slider .bar-left {
    background: var(--grey-e);
    height: 18px;
    box-shadow: none;
  }
`