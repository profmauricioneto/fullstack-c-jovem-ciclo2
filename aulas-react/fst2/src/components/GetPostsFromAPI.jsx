import React, { Fragment, useEffect, useState } from "react";
import Post from "./Post";

export default function GetPostsFromAPI() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(`Carregando os dados de post`);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((objResult) => {
        console.log(objResult);
        setPosts(objResult);
      });
  }, []);

  return (
    <Fragment>
      <h2>Testando Conexão com API de Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Post userId={post.userId} title={post.title} post={post.body} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
