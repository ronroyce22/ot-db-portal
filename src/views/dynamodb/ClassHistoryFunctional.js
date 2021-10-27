import React, {useEffect, useContext} from 'react';
import axios from "../../api/axios";
import {Context} from '../../Store'


const ClassHistory = () => {

    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        fetch('http://localhost:3000/rds/studios')
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            this.setState({
              isLoaded: true,
              studios: result.data,
              classDate: new Date(),
              startTime: new Date()
            });  
          }
        });
  
        axios.get('/posts.json')
            .then(response => {
                const postsData = response.data;
                dispatch({type: 'SET_POSTS', payload: postsData});
            })
            .catch(error => {
                dispatch({type: 'SET_ERROR', payload: error});
            });
    }, []);

    let posts = <p>Loading...</p>;

    if (state.error) {
        posts = <p>Something went wrong: <span>{state.error}</span></p>;
    }

    if (!state.error && state.posts) {
        posts = state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}/>;
        });
    }

    return (
        {posts}
    );
};


export default ClassHistory;