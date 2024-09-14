import { Card, Text } from "@mantine/core";

interface CardHeaderProps {
  title: string;
  subTitle?: string;
}
const CardHeader = ({ title, subTitle }: CardHeaderProps) => {
  return (
    <Card.Section withBorder>
      <Text c={"dimmed"} fz="xl">
        {title}
      </Text>
      {subTitle ? <Text c={"dimmed"}> {subTitle}</Text> : null}
    </Card.Section>
  );
};

export { CardHeader };
