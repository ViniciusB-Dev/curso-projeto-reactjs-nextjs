import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';

import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button/index';
import { TextInput } from '../../components/TextInput';


export class Home extends Component {

  state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 2,
      searchValue: ''
  };

  timeoutUpdade = null;

  async componentDidMount() {
   await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage })

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage)
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    // filtrando posts se existir no campo digitado
    const filteredPosts = !!searchValue ?
    allPosts.filter(posts => {
      return posts.title.toLowerCase().includes(
         searchValue.toLocaleLowerCase()
        );
    })
    : posts;

    return (
      <section className='container'>

        <div className='search-container'>
          {!!searchValue && (
              <h1>Search value: {searchValue}</h1>
          )}

          <TextInput 
            searchValue={searchValue} 
            handleChange={this.handleChange}
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
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
              />
          )}
         
        </div>

      </section>

    )
  }

}
