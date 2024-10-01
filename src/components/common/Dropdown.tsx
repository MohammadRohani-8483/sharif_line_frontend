import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import theme from "@/src/styles/theme";
import { Icon } from "@/src/styles/common/icon";
import {
  I_VersionsList,
  T_Version,
} from "@/src/utils/types/pages/questionnaire";
import { convertDate } from "@/src/utils/functions/global";
import Link from "next/link";

type props = {
  groupId: string;
  versionsData: I_VersionsList | null;
  activeOption: T_Version | null;
  setActiveOption: (active: T_Version) => void;
  linkItem: (group: string, id: string) => string;
};

type SelectInputProps = {
  $activeOption: boolean;
};

type OptionProps = {
  $active: boolean;
};

const Dropdown = (p: props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => {
    isOpen
      ? document.getElementById("scroll")?.classList.remove("no-scroll")
      : document.getElementById("scroll")?.classList.add("no-scroll");
    setIsOpen((p) => !p);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (!dropdownRef.current?.contains(e.target)) {
      document.getElementById("scroll")?.classList.remove("no-scroll");
      setIsOpen(false);
    }
  };

  const handleOptionsClick = (vlaue: T_Version) => {
    p.setActiveOption(vlaue);
    document.getElementById("scroll")?.classList.remove("no-scroll");
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <SelectBox ref={dropdownRef}>
      <SelectInput onClick={toggling} $activeOption={Boolean(p.activeOption)}>
        <Item
          version={p.activeOption}
          isActive={p.versionsData?.active_version === p.activeOption?.version}
        />
        <motion.div
          animate={isOpen ? { rotateZ: 180 } : { rotateZ: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Icon name="arrow-down" width={24} height={20} />
        </motion.div>
      </SelectInput>
      {isOpen && (
        <SelectOptions>
          <OptionsParent className="ltr">
            {p.versionsData?.versions.map((option, i) => (
              <Option
                href={p.linkItem(p.groupId, option.id)}
                onClick={() => handleOptionsClick(option)}
                $active={option.id === p.activeOption?.id}
                key={i}
                className="item"
              >
                <Item
                  version={option}
                  isActive={p.versionsData?.active_version === option.version}
                />
              </Option>
            ))}
          </OptionsParent>
          <ManageVersions group={p.groupId} />
        </SelectOptions>
      )}
    </SelectBox>
  );
};

export default Dropdown;

const Item = (p: { version: T_Version | null; isActive: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text $color="#333">نسخه {p.version?.version}</Text>
        <Text $color="#EEE">|</Text>
        <Text $color="#333">{convertDate(p.version?.created_at || "")}</Text>
      </div>
      {p.isActive && (
        <div
          style={{
            color: "#1EFF29",
            padding: "2px 8px",
            backgroundColor: "#DAFFDB",
          }}
        >
          فعال
        </div>
      )}
    </div>
  );
};

const ManageVersions = (p: { group: string }) => {
  return (
    <div style={{ width: "100%", padding: 10, borderTop: "1px solid #EEE" }}>
      <Link
        href={`/${p.group}/setting`}
        style={{
          padding: 10,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #EEE",
          borderRadius: 8,
          backgroundColor: "#fafafa",
        }}
      >
        <Text>مدیریت نسخه ها</Text>
      </Link>
    </div>
  );
};

const SelectBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media (min-width: ${theme.breakpoints.lg}) {
    width: 310px;
  }
`;

const SelectInput = styled.div<SelectInputProps>`
  transition-property: all 0.5s;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
  background-color: ${theme.colors.neutral.fa};
  border: 1px solid ${theme.colors.neutral.e};
  border-radius: 8px;
  cursor: pointer;
`;

const Text = styled.p<{
  $fontSize?: number;
  $fontWeight?: number;
  $color?: string;
}>`
  font-size: ${(p) => p.$fontSize || 16}px;
  font-weight: ${(p) => p.$fontWeight || 500};
  color: ${(p) => p.$color || "#000"};
  white-space: nowrap;
`;

const SelectOptions = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  background-color: white;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  z-index: 10;
  max-height: 225px;
  overflow: hidden;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.15);
`;

const OptionsParent = styled.div`
  width: 100%;
  overflow: auto;
  .item:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const Option = styled(Link)<OptionProps>`
  display: flex;
  width: 100%;
  padding: 10px;
  background-color: ${(p) => (p.$active ? theme.colors.neutral.fa : "white")};
  &:hover {
    background-color: ${theme.colors.neutral.fa};
  }
`;
