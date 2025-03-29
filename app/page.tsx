import { GitHub } from "@mui/icons-material";
import { Box, Container, Link, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 450,
              fontSize: { xs: "2.5rem", sm: "3.5rem" },
            }}
          >
            Display Files
          </Typography>

          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            ブラウザ上でファイルを表示するアプリケーション
          </Typography>

          <Link
            href="https://github.com/NaotoCoding/display-files"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.primary",
              textDecoration: "none",
            }}
          >
            <GitHub />
            <Typography variant="body1">
              GitHub - NaotoCoding/display-files
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
