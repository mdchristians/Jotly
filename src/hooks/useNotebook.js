import React, { useState, useEffect, useContext } from "react";
import dayjs from 'dayjs';
import { Db } from '../config/firebase';
import { useAuth } from './useAuth';

const NotebookContext = React.createContext();

function NotebookProvider(props) {
  const [pendingUpdates, setPendingUpdates] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  /**
   * Create a blank slate notebook as well as it's cover
   * page so we have something to show the first time that
   * notebook renders
   */
  const createNotebook = async () => {
    const now = dayjs().format();
    const notebookRef = Db.collection("notebooks").doc();
    const pageRef = Db.collection("pages").doc();

    await notebookRef.set({
      id: notebookRef.id,
      userId: user.userId,
      createdAt: now,
      updatedAt: now,
      toc: [{
        pageId: pageRef.id,
        index: 0
      }]
    });

    await pageRef.set({
      id: pageRef.id,
      userId: user.userId,
      notebookId: notebookRef.id,
      createdAt: now,
      updatedAt: now,
      isCover: true,
      label: "readme",
      content: [{
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      }]
    })

    return Promise.resolve(notebookRef.id)
  }

  /**
   * We're doing two things here...
   *   1. we're getting the notebook for the requested page
   *   2. Getting the first page that is to be shown
   * 
   * @param {string} notebookId 
   */
  const getNotebook = async (notebookId) => {
    const notebookRef = await Db.collection("notebooks")
      .doc(notebookId)
      .get();

    const coverPageRef = await Db.collection("pages")
      .where("notebookId", "==", notebookId)
      .where("isCover", "==", true)
      .get();
    
    let datum = [];
    coverPageRef.forEach((doc) => datum.push(doc.data()))

    return {
      notebook: notebookRef.data(),
      coverPage: datum[0],
    }
  }

  /**
   * Function called when creating a new page in a notebook from 
   * our directory tree
   * 
   * @param {string} notebookId 
   * @param {string} title 
   */
  const createPage = (notebookId, title = "Chapter Title") => {
    const now = dayjs().format();
    const pageRef = Db.collection("pages").doc();

    return Db.collection('pages')
      .doc(pageRef.id)
      .set({
        id: pageRef.id,
        userId: user.userId,
        createdAt: now,
        updatedAt: now,
        content: [{
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        }],
        title,
        notebookId
      });
  }

  /**
   * Get a page from a notebook
   * 
   * @param {string} pageId 
   */
  const getPage = async (pageId) => {
    const page = await Db.collection('pages').doc(pageId).get();

    return page.data()
  }

  /**
   * So we can limit the calls and the perceived time we spend loading,
   * we're storing all of our changes for pages locally until we can batch
   * update on notebook save.
   * 
   * @param {object} currentPage 
   * @param {object} nextPage 
   */
  const goToPage = async (currentPage, nextPage) => {
    setPendingUpdates(
      ...pendingUpdates,
      { [currentPage.id]: currentPage }
    )

    if(pendingUpdates[nextPage.id]) {
      return Promise.resolve(pendingUpdates[nextPage.id])
    }

    return getPage(nextPage.id)
  }
  
  return (
    <NotebookContext.Provider 
      value={{ 
        createNotebook,
        getNotebook,
        goToPage,
        createPage
      }}
      {...props} 
    />
  )
}

const useNotebook = () => React.useContext(NotebookContext)

export { NotebookProvider, useNotebook }
