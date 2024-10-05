import { Item } from "@/src/styles/components/popupMenu";
import { isOpen, T_SetState } from "@/src/utils/types/global";
import { useEffect } from "react";
import { ContainerPopup } from "@/src/styles/components/chartContainer";
import chartIcons from '@/src/utils/jsons/chartIcons.json'
import { chartType } from "../pages/statistics/ChartContainer";
import { closePopup } from "@/src/utils/functions/global";
import { ReactSVG } from "react-svg";

type Props = {
  open: isOpen, setOpen: T_SetState<isOpen>
  setType: T_SetState<chartType>
  activeType: chartType
}

const ChartPopup = ({ open, setOpen, setType, activeType }: Props) => {
  useEffect(() => {
    return () => document.getElementById('scroll')?.classList.remove('no-scroll')
  }, [])

  return (
    <ContainerPopup
      initial={{ opacity: 0 }}
      animate={open.visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {Object.keys(chartIcons).map((key: string) => {
        const chart = key as chartType;
        return (
          <Item onClick={() => {
            setType(chart)
            closePopup(setOpen)
            document.getElementById('scroll')?.classList.remove('no-scroll')
          }}
            active={chart === activeType}
          >
            <ReactSVG src={`/images/svg/${chartIcons[chart].icon}.svg` }/>
            <p>{chartIcons[chart].name}</p>
          </Item>
        )
      })}
    </ContainerPopup>
  )
}

export default ChartPopup