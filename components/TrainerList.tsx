import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { ListItemIcon, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { User } from "../models/UserModels";
import TeamModal from "./TeamModal";

interface AutoSizerProps {
  height: number;
  width: number;
}

interface TrainerListProps {
  trainers: User[];
  sx: SxProps;
}

const TrainerList = (listProps: TrainerListProps) => {
  const [selected, setSelected] = useState<User>();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    action("closeModal")();
    setOpen(false);
    setSelected(undefined);
  };

  function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;

    return (
      <>
        {listProps.trainers != null ? (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton
              onClick={() => {
                action("selectUser")();
                setSelected(data[index]);
                setOpen(true);
              }}
            >
              <ListItemIcon>
                <CatchingPokemonIcon />
              </ListItemIcon>
              <ListItemText primary={`${data[index].userName}`} />
            </ListItemButton>
          </ListItem>
        ) : null}
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          ...listProps.sx,
          flex: "1 1 auto",
        }}
      >
        <AutoSizer>
          {({ height, width }: AutoSizerProps) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={46}
              itemCount={listProps.trainers.length}
              itemData={listProps.trainers}
              overscanCount={Math.min(5, listProps.trainers.length)}
            >
              {renderRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
      <TeamModal
        data-testid="modal"
        user={selected}
        isOpen={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default TrainerList;
