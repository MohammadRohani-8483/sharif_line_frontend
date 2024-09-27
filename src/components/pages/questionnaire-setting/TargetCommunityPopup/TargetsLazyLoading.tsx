import {I_ApiConditionResponse, I_Condition} from "@/src/utils/types/pages/questionnaireSetting";
import {T_SetState} from "common-types";
import React, {useEffect, useState} from "react";
import {
    TargetCommunityItemComponent
} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/PopupTargetItem";
import {useInView} from "react-intersection-observer";
import {axiosInstance} from "@/src/utils/helper/axios";
import {useSearchParams} from "next/navigation";
import {AxiosError, AxiosResponse} from "axios";
import {errorHandler} from "@/src/utils/functions/errorHandler";

type T_TargetLazyLoading = {
    targetsList : I_Condition[] ,
    selectedConditions : I_Condition[] ,
    setSelectedConditions : T_SetState<I_Condition[]> ,
    totalSize : number ,
}

export const TargetsLazyLoading = (props : T_TargetLazyLoading) => {
    // const modalContext = useContext(ModalContext);
    const searchParams = useSearchParams();
    const { ref, inView } = useInView();
    const [ page , setPage ] = useState(1);
    const [ loading , setLoading ] = useState(false);
    const [ targetsList , setTargetsList ] = useState<I_Condition[]>(props.targetsList);
    useEffect(() => {
        setTargetsList(props.targetsList);
    }, [props.targetsList]);

    const fetchMoreTargets = async () => {
        try {
            setLoading(true)
            let { data } : AxiosResponse<I_ApiConditionResponse> = await axiosInstance().get(`/question/condition?page=${page + 1}${searchParams.get('search') ?
                '&search=' + searchParams.get('search') : '' }`)
            setTargetsList((prevState) => [...prevState , ...data.results])
            setPage(page + 1);

        } catch (err : unknown) {
            if(isAxiosError(err))
                errorHandler(err.response)
        } finally {
            setLoading(false);
        }

    }
    function isAxiosError(error: any): error is AxiosError {
        return error.isAxiosError === true;
    }
    useEffect(() => {
        if(!loading && inView && targetsList.length < props.totalSize)
            fetchMoreTargets();
    }, [inView]);
    useEffect(() => {
        setPage(1);
    }, [searchParams.get('search')]);
    return <>
        {
            targetsList.map((Item) => <TargetCommunityItemComponent selectedConditions={props.selectedConditions}
                                                                    conditions={props.targetsList}
                                                                    TargetItem={Item}
                                                                    setSelectedConditions={props.setSelectedConditions}/>)
        }
        <div ref={ref as any}>
            {loading ? 'loading' : ''}
        </div>
    </>

}