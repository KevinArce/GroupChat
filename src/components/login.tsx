import React, { useState } from 'react';
import { usePubNub } from 'pubnub-react';
const pubnub = usePubNub();

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // authenticate user with username and password
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }

            // publish a login message to PubNub
            pubnub.publish({
                channel: 'login',
                message: { username },
            });
        } catch (error) {
            console.error(error);
            alert('Failed to authenticate');
        }
    };

    const handleRegister = async () => {
        try {
            // create user with username and password
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            // publish a register message to PubNub
            pubnub.publish({
                channel: 'register',
                message: { username },
            });
        } catch (error) {
            console.error(error);
            alert('Failed to register');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Login;
