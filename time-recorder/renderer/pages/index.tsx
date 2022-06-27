import { Box, Stack, SvgIcon } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Recorder } from "@/components/Recorder";
import { useState } from "react";

const IndexPage = () => {
  const [viewItem, setViewItem] = useState<JSX.Element[]>([<Recorder />]);

  const onAddButton = () => {
    setViewItem([...viewItem, <Recorder />]);
  };
  const styles = {
    icons: {
      opacity: ".4",
      transition: ".3s",
      "&:hover": {
        opacity: ".75",
        cursor: "pointer",
      },
    },
  };
  return (
    <Box
      sx={{
        overflow: "hidden",
      }}
    >
      <Stack direction="column" spacing={1} sx={{ pt: 5, mb: 2 }}>
        {viewItem.map((item, index) => (
          <Box
            key={index}
            sx={{ color: "#b7b7b7", "-webkit-app-region": "drag" }}
          >
            {item}
          </Box>
        ))}
      </Stack>
      <Box sx={{ textAlign: "center" }}>
        <SvgIcon
          onClick={() => onAddButton()}
          fontSize="large"
          htmlColor="#b7b7b7"
          sx={styles.icons}
        >
          <AddCircleRoundedIcon />
        </SvgIcon>
      </Box>
    </Box>
  );
};

export default IndexPage;
