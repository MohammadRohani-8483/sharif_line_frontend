import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import theme from '@/src/styles/theme'
import { Icon } from '@/src/styles/common/icon'
import { T_Version } from '@/src/utils/types/pages/questionnaire'
import { convertDate } from '@/src/utils/functions/global'
import Link from 'next/link'

type props = {
  groupId: string
  options: T_Version[]
  activeOption?: T_Version
  setActiveOption: (active: T_Version) => void
  defaultValue?: string
  disabled?: boolean
  isResultStage: boolean
}

type SelectInputProps = {
  disabled: boolean
  activeoption: boolean
}

type OptionProps = {
  active: boolean
}

const Dropdown = ({ options, activeOption, setActiveOption, defaultValue = '', disabled, groupId, isResultStage }: props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggling = () => {
    if (!disabled) {
      isOpen ?
        document.getElementById('scroll')?.classList.remove('no-scroll')
        :
        document.getElementById('scroll')?.classList.add('no-scroll')
      setIsOpen(p => !p)
    }
  }

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (!dropdownRef.current?.contains(e.target)) {
      document.getElementById('scroll')?.classList.remove('no-scroll')
      setIsOpen(false);
    }
  };

  const handleOptionsClick = (vlaue: T_Version) => {
    setActiveOption(vlaue)
    document.getElementById('scroll')?.classList.remove('no-scroll')
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <SelectBox ref={dropdownRef}>
      <SelectInput
        onClick={toggling}
        activeoption={Boolean(activeOption)}
        disabled={disabled || false}
      >
        {convertDate(activeOption?.created_at || '') || defaultValue}
        <motion.div
          animate={isOpen ? { rotateZ: 180 } : { rotateZ: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Icon name='arrow-down' width={24} height={20} />
        </motion.div>
      </SelectInput>
      {isOpen &&
        <SelectOptions>
          <OptionsParent className='ltr'>
            {options.map((option, i) => (
              <Option
                href={`/${option.id}/statistics?group_id=${groupId}${!isResultStage ? '' : `&result_stage=true`}`}
                onClick={() => handleOptionsClick(option)}
                active={option === activeOption}
                key={i}
              >
                {convertDate(option.created_at)}
              </Option>
            ))}
          </OptionsParent>
        </SelectOptions>
      }
    </SelectBox>
  )
}

export default Dropdown

const SelectBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 140px;
  justify-content: center;
  align-items: center;
`

const SelectInput = styled.div<SelectInputProps>`
  transition-property: all 0.5s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px 10px 8px;
  width: 100%;
  height: 44px;
  background-color: white;
  font-size: 14px;
  border: 1px solid ${theme.colors.neutral.e};
  border-radius: 8px;
  cursor: ${p => p.disabled ? "default" : "pointer"};
  color: ${p => p.activeoption ? "#1B1B1B" : "#9ca3af"};

  &:hover {
    border-color: ${p => !p.disabled && theme.colors.neutral.c};
  }
`

const SelectOptions = styled.div`
  position: absolute;
  top: 45px;
  left:0;
  right:0;
  background-color: white;
  width:100%;
  border-radius:8px;
  border: 1px solid #d1d5db;
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  z-index:10;
  max-height:180px;
  overflow:hidden;
`

const OptionsParent = styled.div`
  width:100%;
  overflow: auto;
`

const Option = styled(Link) <OptionProps>`
  width:100%;
  display: flex;
  font-size: 14px;
  padding:4px 16px 4px 16px;
  background-color:${p => p.active ? theme.colors.neutral.hover : "white"};
  color:${theme.colors.neutral[2]};
  &:hover{
    background-color: ${theme.colors.neutral.hover};
  }
`