import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Button,
  Icon
} from "@chakra-ui/core";
import { AiOutlinePlus, AiOutlineOrderedList, AiOutlineUnorderedList } from 'react-icons/ai';
import { FaHeading } from 'react-icons/fa';
import { MdFormatQuote, MdCode } from 'react-icons/md';
import { toggleBlock, isBlockActive } from '../../utils';
import { useSlate } from 'slate-react'
// import HoverMenu from './components/HoverMenu';

function BlockWrapper(props) {
  const [isBlockHovered, setIsBlockHovered] = useState(false);
  const [isPopoverActive, setIsPopoverActive] = useState(false);

	return (
    <Box
      onMouseEnter={() => setIsBlockHovered(true)}
      onMouseLeave={() => setIsBlockHovered(true)}
    >
    <Popover
      returnFocusOnClose={false}
      isOpen={isPopoverActive}
      onClose={() => setIsPopoverActive(false)}
      placement="right"
      closeOnBlur={false}
      usePortal
    >
      {isBlockHovered && (
        <PopoverTrigger>
          <Box
            position="absolute"
            ml="-38px"
          >
          <IconButton
            variant="outline"
            isRound
            variantColor="teal"
            aria-label="Open Hover Menu"
            size="sm"
            icon={AiOutlinePlus}
            onClick={() => setIsPopoverActive(!isPopoverActive)}
          /></Box>
        </PopoverTrigger>
      )}
      <PopoverContent zIndex={4}>
        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <BlockButton format="heading-one" icon={FaHeading} />
          <BlockButton format="heading-two" icon={FaHeading} />
          <BlockButton format="block-quote" icon={MdFormatQuote} />
          <BlockButton format="numbered-list" icon={AiOutlineOrderedList} />
          <BlockButton format="bulleted-list" icon={AiOutlineUnorderedList} />
          <BlockButton format="code-block" icon={MdCode} />
        </PopoverBody>
        <PopoverFooter d="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button variant="outline">Cancel</Button>
            <Button variantColor="red">Apply</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
      <Box height="2rem" display="flex" alignContent="center">
        {props.children}
      </Box>
    </Box>
	)
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Box as={icon} />
    </Button>
  )
}

export default BlockWrapper
