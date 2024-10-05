import {
    NotFoundSearchContainer, NotFoundTitle,
    ResultItemsContainer,
    SearchResultsContainer
} from "@/src/styles/common/search-results";
import { T_QuestionnaireList } from "@/src/utils/types/pages/questionnaire";
import Questionnaire from "@/src/components/pages/questionnaire-list/Questionnaire";
import Link from "next/link";
import { Icon } from "@/src/styles/common/icon";
import { useRouter } from "next/navigation";

type Props = {
    questionnaireList: T_QuestionnaireList[]
    searchValue: string | null
    setValueNull: () => void
}

export const SearchResults = ({ questionnaireList, searchValue, setValueNull }: Props) => {
    const router = useRouter()

    const handleClickShowAll = () => {
        setValueNull()
        location.href = `/?search=${searchValue}`
    }
    return <SearchResultsContainer>
        {
            questionnaireList.length ? <>
                <ResultItemsContainer>
                    {
                        questionnaireList.map((Item: T_QuestionnaireList) =>
                            <Questionnaire mode={'ROW'} data={Item} setFlag={() => { }} setSearchNull={setValueNull} />)
                    }
                </ResultItemsContainer>
                <div className={'seeAllLink'} onClick={handleClickShowAll}>
                    مشاهده همه
                </div>
            </> : <SearchNotFound searchValue={searchValue} />
        }

    </SearchResultsContainer>
}

const SearchNotFound = ({ searchValue }: { searchValue: string | null }) => {
    return <NotFoundSearchContainer>
        <Icon name={'SearchNotFound'} width={128} height={128} />
        <NotFoundTitle>
            <p>نتیجه برای</p>
            {searchValue}
            <p>یافت نشد</p>
        </NotFoundTitle>
    </NotFoundSearchContainer>
}