import { useState, useRef, useMemo } from 'react';
import { createPost } from '../../services/posts-service';

const useAddNewPostView = () => {
  const inactiveSrc = '/team-mw-project-2/images/add-pic.png';
  const myRefname = useRef(null);
  const [picLabel, setPicLabel] = useState('Upload pic');
  const [description, setDescription] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const imgSrc = useMemo(
    () => (imgFile ? URL.createObjectURL(imgFile) : inactiveSrc),
    [imgFile],
  );

  const handleClick = () => {
    myRefname.current.click();
  };

  const handleFileChange = (event) => {
    const [file] = event.target.files;
    if (file) {
      setImgFile(file);
      setPicLabel('Change picture');
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const createPostHandler = async () => {
    try {
      setIsLoading(true);
      await createPost({ description, imgFile });
      setIsLoading(false);
      setShowFinalMessage(true);
      setFinalMessage('Post created!');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setShowFinalMessage(true);
      setFinalMessage('Sorry, something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    picLabel,
    imgSrc,
    handleClick,
    handleFileChange,
    handleDescriptionChange,
    createPostHandler,
    description,
    myRefname,
    finalMessage,
    showFinalMessage,
    isLoading,
  };
};

export default useAddNewPostView;
