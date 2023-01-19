import { Typography, Box, Stack, SvgIcon } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { useStopwatch } from "react-timer-hook";

interface RecorderProps {
  onDeleteButton(index: number): void;
  id: number;
  value: string;
}

const styles = {
  textLarge: {
    fontSize: "18px",
  },
  textSmall: {
    fontSize: "14px",
  },
  input: {
    fontSize: "16px",
    background: "none",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    outline: "none",
    padding: "0 0 2px 0",
    marginBottom: "2px",
  },
  icon: {
    color: "#b7b7b7",
    transition: ".3s",
    "&:hover": {
      cursor: "pointer",
      opacity: ".75",
    },
  },
};

/**
 * レコーダーコンポーネント
 * @param onDeleteButton 削除ボタン押下時の関数
 * @param id 自身のid
 * @returns レコーダーコンポーネント
 */
export const Recorder = ({ onDeleteButton, id }: RecorderProps) => {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

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

      <Box sx={{ color: isRunning ? "#63D37F" : "#b7b7b7" }}>
        <Box
          sx={{
            "-webkit-app-region": "no-drag",
            "& input::placeholder": {
              opacity: ".5",
            },
          }}
        >
          <input
            type="text"
            style={
              (styles.input,
              {
                borderBottom: isRunning
                  ? "solid 1px #63D37F"
                  : "solid 1px #b7b7b7",
              })
            }
            placeholder={`task ${id + 1}`}
          />
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="baseline">
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
                  undefined,
                  false
                ) as unknown as React.MouseEventHandler<React.ReactNode>
              }
              sx={styles.icon}
            >
              <RestartAltIcon />
            </SvgIcon>
            <SvgIcon fontSize="small" sx={[styles.icon, { mt: "2px" }]}>
              <RemoveCircleRoundedIcon onClick={() => onDeleteButton(id)} />
            </SvgIcon>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
