import React, { useEffect, useState } from 'react';
import { Flex, Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
import PropTypes from 'prop-types';

const PageDescription = ({ desc = 'Page Title', handleTextChange }) => {
  return (
    <Flex>
      <Editable 
        defaultValue={desc}
        onChange={text => handleTextChange('description', text)}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Flex>
  )
}

PageDescription.propTypes = {
  desc: PropTypes.string,
  handleTextChange: PropTypes.func
}

export default PageDescription;