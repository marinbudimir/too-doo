import * as React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    FormGroup, 
    FormControlLabel, 
    Stack, 
    Box, 
    Checkbox, 
    TextField, 
    Button, 
    IconButton, 
    Tooltip, 
    Breadcrumbs, 
    Toolbar,
    AppBar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { ApiGet, ApiPost, ApiPut } from '../utils/Utils';
import { useCallback } from 'react';

export default function List({ setLoggedIn }) {
    const { id } = useParams();
    const navigate = useNavigate()
    const [title, setTitle] = React.useState("");
    const [items, setItems] = React.useState([]);
    const [newItem, setNewItem] = React.useState("");
    const [editable, setEditable] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [share, setShare] = React.useState("");

    const fetchItems = useCallback( async () => {
        ApiGet(`/list/${id}`).then(response => {
            setItems(response.items);
            setTitle(response.title);
        })
    }, [id]);

    React.useEffect(() => {
        fetchItems();
    }, [navigate, fetchItems]);

    const toggleItemCheck = async (event) => {
        const item = {
            checked : event.target.checked
        };
        await ApiPut(`/list/${id}/item/${event.target.name}`, item);
        fetchItems();
    };

    const addItem = async () => {
        const item = {
            text : newItem
        };
        await ApiPost(`/list/${id}/item`, item);
        fetchItems();
        setNewItem("");
    };
    
    const logout = async () => {
        setLoggedIn(false);
        navigate('/');
    };

    const updateListName = async () => {
        const list = {
            title : title
        };
        await ApiPut(`/list/${id}`, list);
        setEditable(!editable);
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(`http://localhost:3001/list/${id}`);
            setShare("Link Copied");
            setOpen(true);
        } catch (err) {
            setShare("Failed to copy link");
            setOpen(true);
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
                    <Link to={`/list`} style={{ textDecoration: 'none' }}>
                        <Typography color="secondary.light" sx={{textDecoration: 'underline'}}>
                            Collection
                        </Typography>
                    </Link>
                    <Typography color="text.primary">{title}</Typography>
                </Breadcrumbs>
                <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <Stack>
                    <Box mt={2}>
                        <TextField 
                            variant="standard"
                            value={title}
                            disabled={editable}
                            onBlur={updateListName}
                            fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                            inputRef={input => input && input.focus()}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "black",
                                },
                            }}
                            InputProps={{
                                disableUnderline: editable,
                                style: { fontSize:30, fontWeight: 1000 }
                            }}
                        />
                        <IconButton aria-label="edit" onClick={() => { setEditable(!editable) }} disabled={!editable}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                        <Tooltip title={share}
                            open={open}
                            onClose={() => {setOpen(false)}}
                        >
                            <IconButton aria-label="share" onClick={copyLink}>
                                <ShareIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <TextField
                            variant="filled"
                            placeholder="Add a to-do item..."
                            sx={{ width: 1}}
                            margin='normal'
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            InputProps={{startAdornment: 
                                <IconButton onClick={addItem}>
                                    <AddIcon />
                                </IconButton>
                            }}
                        />
                    </Box>
                    <Box>
                        <FormGroup>
                            {items.map((item) => {
                                return <FormControlLabel 
                                            control={<Checkbox color="secondary"/>} 
                                            label={item.text} 
                                            key={item.id} 
                                            checked={item.checked}
                                            onChange={toggleItemCheck} 
                                            name={item.id} 
                                            style={{textDecoration: item.checked ? 'line-through' : 'none'}}
                                        />;
                            })}
                        </FormGroup>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
