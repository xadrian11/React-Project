import { useEffect, useState } from 'react';
import { getTimelinePosts } from '../../services/posts-service';

const useHomepage = () => {
  const [homepagePosts, setHomepagePosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getTimelinePosts()
      .then((posts) => {
        setHomepagePosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isOpen]);

  return {
    homepagePosts,
    handleModalOpen,
    handleModalClose,
    isOpen,
  };
};

export default useHomepage;
