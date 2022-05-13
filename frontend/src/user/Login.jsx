import * as React from 'react';
import { 
    Button, 
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login({ setLoggedIn }) {
    const [error, setError] = React.useState('')
    let navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const loginData = {
            email: form.get('email'),
            password: form.get('password')
        }
        await axios.post(process.env.REACT_APP_API_URL + '/user/login', loginData)
            .then(function (res) {
                const { data } = res;
                localStorage.setItem('token', data.token);
                setLoggedIn(true);
                navigate('/list');
            })
            .catch(function (error) {
                setError(error.response.data.message);
                return;
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={submit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Typography component="p" variant="p" color="red">
                        { error }
                    </Typography>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                        <Link color="secondary" href="register">
                            Don't have an account? Register
                        </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}