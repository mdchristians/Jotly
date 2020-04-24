import React, { useEffect, useState } from 'react';
import { Grid, Spinner, useToast } from "@chakra-ui/core";
import { navigate } from '@reach/router';
import NotebookBlock from './components/NotebookBlock';
import AddNotebookBlock from './components/AddNotebookBlock';
import NotebooksEmptyState from './components/NotebooksEmptyState';
import { useAuth } from '../../hooks/useAuth';
import { Db } from '../../config/firebase';
import { useNotebook } from '../../hooks/useNotebook';

const Dashboard = props => {
  const [notebooks, setNotebooks] = useState([]);
  const [fetched, setFetched] = useState(false);
  const { createNotebook } = useNotebook();
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    let data = [];
    const unsubscribe = Db
      .collection('notebooks')
      .where("userId", "==", user.userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => data.push(doc.data()));
        setNotebooks(data);
        setFetched(true);
      })
      .catch(err => console.error(err));
  }, [user.userId])

  const onCreate = () => {
    createNotebook()
      .then(notebookId => {
        navigate(`notebook/${notebookId}`);
      })
      .catch(err => {
        toast({
          title: "An error occurred.",
          description: "Unable to create notebook.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        })
      })
  }

  if(fetched) {
    return (
      <>
        {notebooks.length > 0 ? (
          <Grid gap={8} templateColumns="repeat(auto-fit, minmax(250px, 1fr))">
            {notebooks.map(notebook => (
              <NotebookBlock 
                key={notebook.id} 
                title={notebook.title} 
                description={notebook.description} 
                onBlockClick={() => navigate(`notebook/${notebook.id}`)} 
              />
            ))}
            <AddNotebookBlock onBlockClick={onCreate} />
          </Grid>
        ) : (
          <NotebooksEmptyState onBlockClick={onCreate} />
        )}
      </>
    )
  }
  
  return (
    <Spinner />
  )
}

export default Dashboard;
