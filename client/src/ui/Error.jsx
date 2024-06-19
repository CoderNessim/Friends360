import { useNavigate, useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './Error.module.css';

function Error({ routeDoesNotExist }) {
  const error = useRouteError();
  const navigate = useNavigate();

  if (routeDoesNotExist) {
    return (
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Group justify="center">
          <Button variant="subtle" size="md" onClick={() => navigate('/')}>
            Take me back to home page
          </Button>
        </Group>
      </Container>
    );
  } else {
    return (
      <div>
        <h1>Something went wrong 😢</h1>
        <p>{error.data || error.message}</p>
        <Link onClick={() => navigate(-1)}>&larr; Go back</Link>
      </div>
    );
  }
}

export default Error;
