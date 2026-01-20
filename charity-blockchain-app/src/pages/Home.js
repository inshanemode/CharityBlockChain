import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Charity Blockchain App</h1>
            <p>
                This platform allows you to create and manage charity campaigns using blockchain technology.
            </p>
            <p>
                Explore the features:
            </p>
            <ul>
                <li>
                    <Link to="/create-charity">Create a New Charity Campaign</Link>
                </li>
                <li>
                    <Link to="/dashboard">Manage Your Campaigns</Link>
                </li>
                <li>
                    <Link to="/donations">View Donations</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;