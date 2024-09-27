import {SearchBarContainer} from "@/src/styles/common/layout";
import React, {useEffect, useRef, useState} from "react";
import {Icon} from "@/src/styles/common/icon";
import styled from "styled-components";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {axiosInstance} from "@/src/utils/helper/axios";
import {T_InputEvent} from "@/src/utils/types/global";
import {AxiosResponse} from "axios";
import {I_ApiQuestionnaireList} from "@/src/utils/types/pages/questionnaire";
import {SearchResults} from "@/src/components/common/LayoutComponents/SearchResults";
import {SpinnerLoading} from "@/src/components/common/SpinnerLoading";
import {closePopup} from "@/src/utils/functions/global";

export const HeaderSearchBar = () => {
    let searchTimeOut: ReturnType<typeof setTimeout>
    const [searchValue, setSearchValue] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchResultOpen, setSearchResultOpen] = useState(false);
    const searchBoxRef = useRef<HTMLDivElement | null>(null);
    const SearchQuery: UseQueryResult<AxiosResponse<I_ApiQuestionnaireList>> = useQuery({
        queryKey: ['SearchQuery'],
        enabled: searchValue !== null,
        queryFn: async () => await axiosInstance().get(`/question/archive?${searchValue ? 'title=' + searchValue : ''}`)
    })
    useEffect(() => {
        if (searchValue !== null)
            SearchQuery.refetch()
    }, [searchValue]);
    const handleClickOutside = (e: any) => {
        if(searchBoxRef.current === null)
            return

        if (!searchBoxRef.current!.contains(e.target))
            setSearchResultOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    return <SearchBarContainer tabIndex={-1}
                               ref={searchBoxRef}
                               onClick={() => {
                                   if (inputRef.current && "focus" in inputRef.current) {
                                       inputRef.current.focus();
                                       setSearchResultOpen(true);
                                   }
                               }} show_clear_icon={searchValue}>
        <Icon name={'search'} width={24} height={24}/>
        <SearchInput placeholder={'جستجو کنید'}
                     ref={inputRef}
                     // onBlur={() =>
                     //     setTimeout(() => setSearchResultOpen(false), 300)}
                     onChange={(Event: T_InputEvent) => {
                         clearTimeout(searchTimeOut);
                         searchTimeOut = setTimeout(() => {
                             setSearchResultOpen(!!Event.target.value);
                             if (!Event.target.value)
                                 setSearchValue(null);
                             else {
                                 setSearchValue(Event.target.value);
                             }

                         }, 800)
                     }}/>
        {SearchQuery.isFetching ? <SpinnerLoading color={'#777777'} width={22} height={22}/> :
            <Icon name={'searchClose'} onClick={() => {
                if (inputRef.current && "value" in inputRef.current)
                    inputRef.current.value = ''
                setSearchValue(null)
            }}
                  width={20} height={20} className={'closeIcon'}/>}
        {(SearchQuery.data?.data && searchValue && searchResultOpen) &&
            <SearchResults searchValue={searchValue} questionnaireList={SearchQuery.data.data.results} setValueNull={()=>setSearchValue(null)}/>}
    </SearchBarContainer>
}

const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  background: none;
  font-size: 1.6rem;

  &::placeholder {
    color: var(--gray-7);
    font-weight: 500;
  }
`