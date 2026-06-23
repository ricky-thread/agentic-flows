import FlowEditor from "./FlowEditor";

export default async function ConfigureFlowPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name = "Untitled flow" } = await searchParams;
  return <FlowEditor name={name} />;
}
