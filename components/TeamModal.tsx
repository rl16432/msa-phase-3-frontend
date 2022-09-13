import { Box, Grid, Modal, SxProps, Typography } from "@mui/material";
import { User } from "../models/UserModels";

interface TeamModalProps {
  user?: User; // User team to render
  isOpen: boolean; // Toggle visibility
  handleClose: () => any; // Closing the modal
}

const TeamModal = ({ user, isOpen, handleClose }: TeamModalProps) => {
  const modalStyle: SxProps = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: 300,
      sm: 400,
      md: 600,
    },
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    py: 1,
    px: 2,
    textAlign: "center",
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalStyle}>
        {user == null || user.pokemon.length > 0 ? (
          <Grid container spacing={2}>
            {user?.pokemon.map((pokemon) => (
              <Grid
                key={pokemon.id}
                item
                sx={{ p: "0 !important", mt: 2 }}
                xs={6}
                md={4}
              >
                <Box
                  component="img"
                  sx={{
                    ml: 1,
                    maxWidth: {
                      xs: 150,
                      sm: 200,
                    },
                  }}
                  src={pokemon?.image}
                  alt={pokemon?.name}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No Pokemon</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default TeamModal;
