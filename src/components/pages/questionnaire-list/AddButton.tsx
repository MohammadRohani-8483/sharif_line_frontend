import { Overlay } from "@/src/styles/common"
import { Button, Items } from "@/src/styles/components/addButton"
import { useState } from "react"
import { ReactSVG } from "react-svg"
import TemplatePopup from '@/src/components/popups/template'
import Link from "next/link"

const AddButton = ({ setFlag }: { setFlag: () => void }) => {
    const [templatePopup, setTemplatePopup] = useState(false)
    const [open, setOpen] = useState(false)

    const clickHandle: () => void = () => {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return (
        <>
            <Button open={open} onClick={clickHandle}>
                <ReactSVG src='/images/svg/plus.svg' />
            </Button>
            <Items open={open}>
                <Link href='/form'>
                    ایجاد پرسشنامه
                </Link>
                <div onClick={() => {
                    setTemplatePopup(true)
                    setOpen(false)
                    clickHandle()
                }}>
                    ایجاد با قالب
                </div>
            </Items>
            {open && <Overlay onClick={clickHandle} zindex={4}></Overlay>}
            {templatePopup && <TemplatePopup setFlag={setFlag} onClose={() => setTemplatePopup(false)} />}
        </>
    )
}

export default AddButton