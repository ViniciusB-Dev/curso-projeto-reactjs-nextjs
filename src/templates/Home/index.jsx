import { useState, useEffect, useCallback } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';

import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button/index';
import { TextInput } from '../../components/TextInput';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

     // filtrando posts se existir no campo digitado
  const filteredPosts = !!searchValue ?
        allPosts.filter(posts => {
          return posts.title.toLowerCase().includes(
            searchValue.toLocaleLowerCase()
         );
     })
     : posts;

 

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);

  }, [])
  
  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);    
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }

  return (
    <section className='container'>

      <div className='search-container'>
        {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
        )}

        <TextInput 
          searchValue={searchValue} 
          handleChange={handleChange}
        />
      </div>
      
      {/* requisições se estiver ou nao existindo uma filtração */}
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
      )}

      {filteredPosts.length === 0 && (
        <p>Não existe =( </p>
      )}

      <div className='button-container'>
        {!searchValue && (
            <Button 
            text='Load more posts'
            onClick={loadMorePosts}
            disabled={noMorePosts}
            />
        )}
       
      </div>

    </section>

  )
}