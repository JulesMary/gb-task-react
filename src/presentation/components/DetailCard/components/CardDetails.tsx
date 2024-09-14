import { Group, Text, Card } from "@mantine/core";

interface CardDetailsProps {
  labels: string[];
  values: (string | number | undefined)[];
}

const CardDetails = ({ labels, values }: CardDetailsProps) => {
  return (
    <Card.Section>
      <Group justify={"space-between"} mt={"md"}>
        <div>
          {labels.map((label) => (
            <Text key={label} fw={600}>
              {label}
            </Text>
          ))}
        </div>
        <div>
          {values.map((value) =>
            value !== undefined ? <Text key={value}>{value}</Text> : null,
          )}
        </div>
      </Group>
    </Card.Section>
  );
};

export { CardDetails };
