import { useState, useEffect } from "react";

export default function BlogPosts() {
    // Managing our data
    const [posts, setPosts] = useState([]); // Store fetched blog posts
    const [loading, setLoading] = useState(true); // Tells us if data is still loading
    const [error, setError] = useState(null); // Stores error messages

    // Fetching data
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Converts the response into usable data
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Displays the blog posts using .map to extract the title and body
    return (
        <div>
            <h1>Blog Posts</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}
