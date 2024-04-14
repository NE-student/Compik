import { Card, CardContent, CardHeader, Container, Divider, Grid, GridColumn, GridRow, Header } from "semantic-ui-react";
import "./Configurations.css";

function Configurations() {
  return (
    <div className="py-9 min-w-96 w-3/4 px-16 bg-white grid gap-4 grid-cols-1 font-medium content-center rounded-sm">
      <div className="grid gap-4 grid-cols-1">
        <Header className="text-slate-50 text-3xl text-center font-sans">
          Конфігурації
        </Header>
        <Divider />
      </div>
      <Container className="">
        <Grid columns={3}>
          <GridRow>
            <GridColumn>
              <Card>
                <CardContent>
                  <CardHeader>Test</CardHeader>
                </CardContent>
              </Card>
            </GridColumn>
            <GridColumn>
              <Card>
                <CardContent>
                  <CardHeader>Test</CardHeader>
                </CardContent>
              </Card>
            </GridColumn>
            <GridColumn>
              <Card>
                <CardContent>
                  <CardHeader>Test</CardHeader>
                </CardContent>
              </Card>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <Card>
                <CardContent>
                  <CardHeader>Test</CardHeader>
                </CardContent>
              </Card>
            </GridColumn>
            <GridColumn>
              <Card>
                <CardContent>
                  <CardHeader>Test</CardHeader>
                </CardContent>
              </Card>
            </GridColumn>
            <GridColumn>
              <Card>
                <CardContent>
                  <CardHeader>Test</CardHeader>
                </CardContent>
              </Card>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <Card>
                <CardContent>
                  <CardHeader>Test</CardHeader>
                </CardContent>
              </Card>
            </GridColumn>
            <GridColumn>
              <Card>
                <CardContent>
                  <CardHeader>Test</CardHeader>
                </CardContent>
              </Card>
            </GridColumn>
            <GridColumn>
              <Card>
                <CardContent>
                  <CardHeader>Test</CardHeader>
                </CardContent>
              </Card>
            </GridColumn>
          </GridRow>
        </Grid>
      </Container>
    </div>
  );
}

export default Configurations;
