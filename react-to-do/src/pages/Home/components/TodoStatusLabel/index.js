import { Badge } from "@shopify/polaris";
const TodoStatusLabel = ({ isCompleted }) => {
  switch (isCompleted) {
    case true:
      return <Badge tone="success">Done</Badge>;
    case false:
      return <Badge tone="new">Pending</Badge>;
    default:
      return <Badge tone="new">Pending</Badge>;
  }
};
export default TodoStatusLabel;
