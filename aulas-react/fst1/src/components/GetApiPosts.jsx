import { useEffect, useState } from 'react';
import Posts from './Posts';

export default function GetApiPosts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log('carregando os dados...');
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((data) => data.json())
        .then((result) => setPosts(result)
        .catch((error) => console.error('Error ao carregar a API:', error)
        )
    )},[])
    
    return (
        <>
            <h2>Captando Posts via API</h2>
            {posts.map((post) => (
                <Posts 
                    key={post.id}
                    userId={post.userId}
                    body={post.body}
                />
            ))}
        </>
    )
}