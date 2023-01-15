import { Box, Stack, SvgIcon } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Recorder } from "@/components/Recorder";
import { useState } from "react";

type ViewItem = {
  id: number;
  value: string;
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

const IndexPage = () => {
  /** 表示する要素のidとvalueをオブジェクトの配列で管理するステート */
  const [viewItem, setViewItem] = useState<ViewItem[]>([{ id: 0, value: "" }]);

  /**
   * 追加ボタン押下時の処理
   */
  const onAddButton = async () => {
    /** viewItemステートが空かそれ以外かで分岐 */
    if (viewItem.length === 0) {
      /** id:0 の要素を追加 */
      setViewItem([...viewItem, { id: 0, value: "" }]);
    } else {
      /** 最後尾の要素のid + 1のidをもつ要素を追加 */
      const itemLastId = (await viewItem[viewItem.length - 1].id) + 1;
      await setViewItem([...viewItem, { id: itemLastId, value: "" }]);
    }
  };

  /**
   * 削除ボタン押下時の処理
   * mapされた各要素に渡して子で利用する
   * @param id 削除ボタンが押下された要素のid
   */
  const onDeleteButton = async (id: number) => {
    let deletedItem = await viewItem.filter((item) => item.id !== id);
    setViewItem(deletedItem);
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ pt: 5 }}
      >
        {viewItem.map((item) => (
          <Box
            key={item.id}
            sx={{ color: "#b7b7b7", "-webkit-app-region": "drag" }}
          >
            <Recorder
              onDeleteButton={onDeleteButton}
              id={item.id}
              value={item.value}
            />
          </Box>
        ))}
        <Box sx={{ pt: 3 }}>
          <SvgIcon
            onClick={() => onAddButton()}
            fontSize="large"
            htmlColor="#b7b7b7"
            sx={styles.icons}
          >
            <AddCircleRoundedIcon />
          </SvgIcon>
        </Box>
      </Stack>
    </Box>
  );
};

export default IndexPage;
