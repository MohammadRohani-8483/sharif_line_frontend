'use client'
import {T_OrderingItem, T_SetState} from "@/src/utils/types/global";
import { OrderContain, OrderItem, OrderTitle } from '@/src/styles/components/ordering'
import { Icon } from "@/src/styles/common/icon";

type Props = {
    items: T_OrderingItem[]
    active: T_OrderingItem
    setActive: (active: T_OrderingItem) => void
    reverse: boolean
    setReverse: T_SetState<boolean>
}

const Ordering = (p: Props) => {
    const handleClick = (item: T_OrderingItem) => {
        if (item.id === p.active.id) {
            p.setReverse(p => !p)
        } else {
            p.setActive(item)
            p.setReverse(true)
        }
    }

    return (
        <OrderContain>
            <Icon name="list" width={24} height={24} />
            <OrderTitle>
                مرتب سازی :
            </OrderTitle>
            {p.items.map(item => {
                return (
                    <OrderItem
                        active={item.id === p.active.id}
                        reverse={p.reverse}
                        key={item.id}
                        onClick={() => handleClick(item)}
                    >
                        {item.name}
                    </OrderItem>
                )
            })}
        </OrderContain>
    )
}

export default Ordering