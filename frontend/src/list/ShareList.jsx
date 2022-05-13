import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container, FormGroup, FormControlLabel, Stack, Box, Checkbox} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiGet } from '../utils/Utils';

export default function ShareList() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [title, setTitle] = React.useState("");
    const [items, setItems] = React.useState([]);

    const fetchItems = async () => {
        await ApiGet(`/list/${id}`).then(response => {
            setItems(response.items);
            setTitle(response.title);
        });
    };

    React.useEffect(() => {
        fetchItems();
    }, [navigate]);

    const handleChange = async (event) => {
        const currentItems = [...items]
        currentItems.map((item) => {
            if(item.id === event.target.name) {
                item.checked = !item.checked;
            }
        })
        setItems(currentItems);
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Stack>
                    <Box mt={3} mb={1} >
                        <Typography sx={{ fontSize: 30, fontWeight: 1000 }}>
                            {title}
                        </Typography>
                    </Box>
                    <Box>
                        <FormGroup>
                            {items.map((item) => {
                                return <FormControlLabel 
                                            control={<Checkbox color="secondary"/>} 
                                            label={item.text} key={item.id} 
                                            checked={item.checked} 
                                            onChange={handleChange} 
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
