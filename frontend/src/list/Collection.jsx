import * as React from 'react';
import { Container, 
    Typography, 
    TextField, 
    IconButton, 
    Grid, 
    Box,
    AppBar,
    Toolbar,
    Button,
    Breadcrumbs
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ListCard from './ListCard';
import { ApiGet, ApiPost } from '../utils/Utils';

export default function ListCollection({ setLoggedIn }) {
    const [lists, setLists] = React.useState([])
    const navigate = useNavigate();
    const [newList, setNewList] = React.useState("");

    const fetchLists = async () => {
        ApiGet('/list').then(response => setLists(response));
    };
    
    React.useEffect(() => {
        fetchLists();
    }, [navigate]);

    const addList = async () => {
        const list = {
            title : newList
        };
        await ApiPost('/list', list);
        fetchLists();
        setNewList("");
    };

    const logout = () => {
        setLoggedIn(false);
        navigate('/');
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
                    <Typography color="text.primary">Collection</Typography>
                </Breadcrumbs>
                <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                <TextField
                    variant="filled"
                    placeholder="Add a list..."
                    value={newList}
                    sx={{ width: 0.5}}
                    margin='normal'
                    onChange={(e) => setNewList(e.target.value)}
                    InputProps={{
                        startAdornment: 
                        <IconButton onClick={addList} sx={{ marginRight: 1}}>
                            <AddIcon />
                        </IconButton>
                    }}
                />
                </Box>
                <Grid container spacing={2} marginTop={2} >
                        {lists.map((list) => {
                            return <Grid item xs={12} md={4} key={list.id}>
                                <ListCard title={list.title} id={list.id} fetchLists={fetchLists}/>
                            </Grid>
                        })}
                </Grid>
            </Container >
        </div>
    );
}
