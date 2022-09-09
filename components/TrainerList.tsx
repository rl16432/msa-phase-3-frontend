import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import userServices from '../services/UserServices'
import Box, { BoxProps } from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { ListItemIcon, Modal, Typography, Grid, CardMedia } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { User } from '../models/UserModels';

interface AutoSizerProps {
  height: number,
  width: number
}

const TrainerList = (props: BoxProps) => {
  const [trainers, setTrainers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    userServices.getAllUsers()
      .then(res => {
        setTrainers(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, [open])

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSelected(undefined);
  }

  function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;

    return (
      <>
        {trainers != null ?
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={() => {
              setSelected(data[index]);
              handleOpen();
            }}>
              <ListItemIcon>
                <CatchingPokemonIcon />
              </ListItemIcon>
              <ListItemText primary={`${data[index].userName}`} />
            </ListItemButton>
          </ListItem>
          : null
        }
      </>
    );
  }

  const TrainerModal = () => {
    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '1px solid #000',
      boxShadow: 24,
      py: 1
    };

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            {selected?.pokemon.map(pokemon =>
              <Grid key={pokemon.pokemonId} item xs={6}>
                <CardMedia
                  component="img"
                  height="200"
                  image={pokemon?.image}
                  title={pokemon?.name}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
    )
  }
  return (
    <>
      <Box
        sx={{
          ...props.sx,
          flex: "1 1 auto"
        }}
      >
        <AutoSizer>
          {({ height, width }: AutoSizerProps) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={46}
              itemCount={trainers.length}
              itemData={trainers}
              overscanCount={Math.min(5, trainers.length)}
            >
              {renderRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box >
      <TrainerModal />
    </>
  );
}

export default TrainerList