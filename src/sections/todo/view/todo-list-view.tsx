import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


const todos = [
  {
    title: "Create Header Component",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Create Header Component",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Implement Search Functionality",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Build Playlist Management Feature",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Add Song Upload Feature",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
  {
    title: "Create User Profile Page",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus doloremque voluptate earum eaque recusandae sequi consequuntur.",
  },
];

export default function ToDoListView() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {todos.map((todo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                variant="outlined"
                sx={{ width: 500, height: 250, margin: 2 }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginTop: 2, marginBottom: 1 }}
                  >
                    {todo.title}
                  </Typography>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {todo.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
