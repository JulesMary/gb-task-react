import { Card, Flex } from "@mantine/core";
import { CardHeader, CardDetails } from "./components";

interface DetailCardProps {
  title: string;
  subtitle: string;
  labels: string[];
  values: (string | number | undefined)[];
}

/**
 * Card hat shows all details.
 * @param title
 * @param subtitle
 * @param labels
 * @param values
 */
const DetailCard = ({ title, subtitle, labels, values }: DetailCardProps) => {
  return (
    <Card withBorder p="xl" radius="md">
      <Flex direction={"column"}>
        <CardHeader title={title} subTitle={subtitle} />
        <CardDetails labels={labels} values={values} />
      </Flex>
    </Card>
  );
};

export { DetailCard };
