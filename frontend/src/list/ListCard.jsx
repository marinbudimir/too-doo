import * as React from 'react';
import { Card, CardActions, CardContent, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { ApiDelete } from '../utils/Utils';

export default function ListCard(props) {

    const deleteList = async (event) => {
        await ApiDelete(`/list/${props.id}`);
        props.fetchLists();
    };

    return (
        <div>
            <Card>
                <Link to={`/list/${props.id}`} style={{ textDecoration: "none" }}>
                    <CardContent>
                        <Typography variant="h6" sx={{color: "black"}} >
                            {props.title}
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions disableSpacing>
                    <IconButton aria-label="delete" onClick={deleteList}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}
