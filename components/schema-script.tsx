type SchemaScriptProps = {
  id: string;
  data: Record<string, unknown>;
};

export function SchemaScript({ id, data }: SchemaScriptProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
