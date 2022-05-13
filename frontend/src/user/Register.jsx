import * as React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { 
    Button, 
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@mui/material';;

export default function Register() {
    const [error, setError] = React.useState(null)
    let navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const registerData = {
            name : form.get('name'),
            email: form.get('email'),
            password: form.get('password')
        };

        axios.post(process.env.REACT_APP_API_URL + '/user/register', registerData)
        .then(() => {
                navigate('/');
        })    
        .catch(function (error) {
                setError(error.response.data.message);
        });
    }

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Typography component="p" variant="p" color="red">
                        { error }
                    </Typography>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link color="secondary" href="/">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}