import { Card, Text, Group, Badge, Stack } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

import styles from './ProfileDetails.module.css';

function ProfileDetails({ user, groups }) {
  return (
    <Card padding="lg" radius="md" className={styles.card}>
      <Stack>
        <Text size="lg" weight={700}>
          Name:{' '}
          <Text size="lg" weight={500} color="dimmed">
            {user.username} <IconEdit stroke={2} />
          </Text>
        </Text>
        <Text size="lg" weight={700}>
          Email:{' '}
          <Text size="lg" weight={500} color="dimmed">
            {user.email} <IconEdit stroke={2} />
          </Text>
        </Text>
        <Text size="lg" weight={700}>
          Current Location:{' '}
          <Text size="lg" weight={500} color="dimmed">
            {user.location}
          </Text>
        </Text>
        <Group spacing="xs">
          <Text size="lg" weight={700}>
            Groups:
          </Text>
          {groups.map((group, index) => (
            <Badge key={index} variant="light" color="blue" radius="sm">
              {group.name}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  );
}

export default ProfileDetails;
