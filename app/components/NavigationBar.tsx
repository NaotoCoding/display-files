import ArticleIcon from "@mui/icons-material/Article";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const pages = [
  { name: "Pdf", href: "/pdf" },
  { name: "CSV", href: "/csv" },
];

export default function NavigationBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ButtonBase
            component={Link}
            href="/"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              mr: 3,
            }}
          >
            <ArticleIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                alignItems: "center",
                height: "100%",
              }}
            >
              Display Files
            </Typography>
          </ButtonBase>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              gap: 3,
            }}
          >
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    paddingTop: "6px",
                    paddingBottom: "4px",
                  }}
                >
                  {page.name}
                </Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
