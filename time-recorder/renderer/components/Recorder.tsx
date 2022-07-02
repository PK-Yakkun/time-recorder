import { Typography, Box, Stack, SvgIcon } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { useStopwatch } from "react-timer-hook";

interface RecorderProps {
  onDeleteButton(index: number): void;
}

export const Recorder = ({ onDeleteButton }: RecorderProps) => {
  const stopwatchOffset = new Date();
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false, offsetTimestamp: stopwatchOffset });

  const styles = {
    textCommon: {
      color: isRunning ? "#63D37F" : "#b7b7b7",
    },
    textLarge: {
      fontSize: "18px",
    },
    textSmall: {
      fontSize: "14px",
    },
    icon: {
      transition: ".3s",
      "&:hover": {
        cursor: "pointer",
        opacity: ".75",
      },
    },
  };
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box sx={{ pt: "6px" }}>
        {isRunning ? (
          <SvgIcon onClick={pause} fontSize="large" sx={styles.icon}>
            <StopCircleIcon />
          </SvgIcon>
        ) : (
          <SvgIcon onClick={start} fontSize="large" sx={styles.icon}>
            <PlayCircleFilledWhiteIcon />
          </SvgIcon>
        )}
      </Box>

      <Box>
        <Box
          sx={{
            "-webkit-app-region": "no-drag",
            "& input::placeholder": {
              color: "#b7b7b7",
              opacity: ".5",
            },
          }}
        >
          <input
            type="text"
            style={{
              fontSize: "16px",
              color: isRunning ? "#63D37F" : "#b7b7b7",
              background: "none",
              borderTop: "none",
              borderRight: "none",
              borderLeft: "none",
              borderBottom: isRunning
                ? "solid 1px #63D37F"
                : "solid 1px #b7b7b7",
              outline: "none",
              padding: "0 0 2px 0",
              marginBottom: "2px",
            }}
            placeholder="task name?"
          />
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="baseline" sx={styles.textCommon}>
            <Typography sx={styles.textLarge}>{hours}</Typography>
            <Typography sx={styles.textSmall}>h</Typography>
            <Typography sx={styles.textLarge}>{minutes}</Typography>
            <Typography sx={styles.textSmall}>m </Typography>
            <Typography sx={styles.textLarge}>{seconds}</Typography>
            <Typography sx={styles.textSmall}>s </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <SvgIcon
              onClick={() =>
                reset(
                  stopwatchOffset,
                  false
                ) as unknown as React.MouseEventHandler<React.ReactNode>
              }
              sx={styles.icon}
            >
              <RestartAltIcon />
            </SvgIcon>
            <SvgIcon fontSize="small" sx={[styles.icon, { mt: "2px" }]}>
              <RemoveCircleRoundedIcon onClick={() => onDeleteButton()} />
            </SvgIcon>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
