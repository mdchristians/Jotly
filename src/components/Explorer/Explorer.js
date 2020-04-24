import React, { useState } from 'react';
import { List, ListItem, ListIcon, Box } from "@chakra-ui/core";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";


const defClick = (fdsf) => console.log('clicked!' + fdsf);
const defTree = [{
  pageId: 'fdsafdsa',
  label: 'readme',
  index: 0
  }, {
  pageId: 'fdasfsasadf',
  label: 'Honda',
  index: 1,
  nodes: [{
    pageId: 'dfssd',
    label: 'Cars',
    index: 0,
    nodes: [{
      pageId: 'fdsafdfas',
      label: 'Accord',
      index: 0,
    }, {
      pageId: 'rewewqr',
      label: 'Civic',
      index: 1,
    }]
  }]
}]

const Explorer = ({ data = defTree, onRowClick = defClick }) => {
  const [activeNodes, setActiveNodes] = useState({});

  const handleRowClick = rowId => {
    if(activeNodes[rowId]) {
      setActiveNodes({
        ...activeNodes,
        [rowId]: false
      })
    } else {
      setActiveNodes({
        ...activeNodes,
        [rowId]: true
      })
    }
  }

  const renderNodes = (nodes, parentId, offset = 1) => {
    return (
      <ListItem key={`lip-${parentId}`} pl={`${offset * 1}rem`}>
        <List spacing={3} key={`lp-${parentId}`}>
          {nodes.map(node => {
            return (
              <>
                <ListItem 
                  key={node.pageId}
                  onClick={() => handleRowClick(node.pageId)}
                >
                  <ListIcon 
                    icon={activeNodes[node.pageId] ? AiOutlineDown : AiOutlineRight}
                    color="gray.500" 
                  />
                  {node.label}
                </ListItem>
                {node.nodes && activeNodes[node.pageId] && renderNodes(node.nodes, node.pageId, offset++)}
              </>
            )
          })}
        </List>
      </ListItem>
    )
  }

  return (
    <List spacing={3} key="root">
      {data.map(node => {
        return (
          <>
            <ListItem 
              key={node.pageId}
              onClick={() => handleRowClick(node.pageId)}
            >
              <ListIcon 
                icon={activeNodes[node.pageId] ? AiOutlineDown : AiOutlineRight}
                color="gray.500" 
              />
              {node.label}
            </ListItem>
            {node.nodes && activeNodes[node.pageId] && renderNodes(node.nodes, node.pageId)}
          </>
        )
      })}
    </List>
  )
}

export default Explorer;