import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Grid, Spinner } from "@chakra-ui/core";
import { navigate } from '@reach/router';
import NotebookBlock from './components/NotebookBlock';
import AddNotebookBlock from './components/AddNotebookBlock';
import NotebooksEmptyState from './components/NotebooksEmptyState';
import { useAuth } from '../../hooks/useAuth';
import { Db } from '../../config/firebase';

const Dashboard = props => {
  const [notebooks, setNotebooks] = useState([]);
  const [fetched, setFetched] = useState(false);

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

  const createNotebook = () => {
    const notebookRef = Db.collection("notebooks").doc();
    Db.collection("notebooks")
      .doc(notebookRef.id)
      .set({
        id: notebookRef.id,
        createdAt: dayjs().format(),
        userId: user.userId
      })
      .then(() => {
        navigate(`notebook/${notebookRef.id}`);
      })
      .catch(err => console.error(err))
  }

  const foobar = (nb) => {
    navigate(`notebook/${nb.id}`);
  }

  if(fetched) {
    return (
      <React.Fragment>
        {notebooks.length > 0 ? (
          <Grid gap={8} templateColumns="repeat(auto-fit, minmax(250px, 1fr))">
            {notebooks.map(nb => <NotebookBlock key={nb.id} title="Notebook Title" description="foo foo foo foo foo" onBlockClick={() => foobar(nb)} />)}
            <AddNotebookBlock onBlockClick={createNotebook} />
          </Grid>
        ) : (
          <NotebooksEmptyState onBlockClick={createNotebook} />
        )}
      </React.Fragment>
    )
  }
  
  return (
    <Spinner />
  )
}

export default Dashboard;
