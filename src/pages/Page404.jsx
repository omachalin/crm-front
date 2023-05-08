import { Grid } from "@mui/material";

function Page404() {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ marginTop: '12%', height: '100%'}}
    >

      <Grid item xs={12} style={{color: '#000000'}}>
        <h1>404</h1>
        <div>Данная страница не существует</div>
      </Grid>

    </Grid>
  )
}

export default Page404;