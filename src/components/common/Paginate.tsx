import ReactPaginate from "@/node_modules/react-paginate";
import styled from "@/node_modules/styled-components";
import { Icon } from "@/src/styles/common/icon";

type Props = {
    itemsCount: number
    activePage: number
    setPage: (page: number) => void
    pageSize?: number
}

const Paginate = ({ setPage, activePage, pageSize, itemsCount }: Props) => {
    const pageCount = Math.ceil((itemsCount || 0) / (pageSize || 10))

    const handlePageClick = ({ selected }: any) => {
        setPage && setPage(selected + 1);
    };

    if (pageCount <= 1) return <></>
    return (
        <PaginateParent>
            <ReactPaginate
                forcePage={activePage - 1}
                breakLabel={<BreakLabel>...</BreakLabel>}
                nextLabel={
                    <Label>
                        <Icon name="arrow_left" width={24} height={24} />
                    </Label>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel={
                    <Label>
                        <Icon name="arrow_right" width={24} height={24} />
                    </Label>
                }
                containerClassName="container"
                pageClassName="page"
                activeClassName="active"
            />
        </PaginateParent >
    );
};

export default Paginate;

const PaginateParent = styled.div`
    display: flex;
    justify-content: center;
    font-size: 14px;

    li{
        list-style: none;
        cursor: pointer;
        a{
            width: 40px;
            text-align: center;
        }
    }
    .disabled{
        opacity: 0.5;
        cursor: default;

        span:hover{
            background-color: ${p => p.theme.colors.neutral.fa};
        }
    }
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        height: 40px;
        color: #333;
        background-color: white;
        border: 1px solid ${p => p.theme.colors.neutral.e};
        border-radius: 10px;
        padding-inline: 8px;
        padding-block: 27px;
    }
    .page{
        display: flex;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: 1px solid white;

        &:hover{
            border: 1px solid #eee;
        }
    }
    .active{
        background-color: ${p => p.theme.colors.neutral.fa};
        border: 1px solid #eee;
        cursor: auto;
    }
`

const Label = styled.span`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: ${p => p.theme.colors.neutral.fa};
    border: 1px solid #eee;
    color: #333;

    &:hover{
        background-color: #eee;
    }
`

const BreakLabel = styled.span`
    margin-left: 8px;
    margin-right: 8px;
`