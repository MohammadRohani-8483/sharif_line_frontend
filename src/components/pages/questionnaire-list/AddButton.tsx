import { Overlay } from "@/src/styles/common";
import { Button, Items } from "@/src/styles/components/addButton";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import TemplatePopup from "@/src/components/popups/template";
import CreateQuestionnaire from "../../popups/CreateQuestionnaire";

const AddButton = ({ setFlag }: { setFlag: () => void }) => {
  const [templatePopup, setTemplatePopup] = useState(false);
  const [createPopup, setCreatePopup] = useState(false);
  const [open, setOpen] = useState(false);

  const clickHandle = () => setOpen((p) => !p);
  return (
    <>
      <Button open={open} onClick={clickHandle}>
        <ReactSVG src="/images/svg/plus.svg" />
      </Button>
      <Items open={open}>
        <div
          onClick={() => {
            setCreatePopup(true);
            setOpen(false);
          }}
        >
          ایجاد پرسشنامه
        </div>
        <div
          onClick={() => {
            setTemplatePopup(true);
            setOpen(false);
          }}
        >
          ایجاد با قالب
        </div>
      </Items>
      {open && <Overlay onClick={clickHandle} $zIndex={4} />}
      <CreateQuestionnaire
        open={createPopup}
        onClose={() => setCreatePopup(false)}
        setFlag={setFlag}
      />
      {templatePopup && (
        <TemplatePopup
          setFlag={setFlag}
          onClose={() => setTemplatePopup(false)}
        />
      )}
    </>
  );
};

export default AddButton;
