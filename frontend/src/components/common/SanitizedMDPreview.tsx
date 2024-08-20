import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

type MarkdownProps = React.ComponentProps<typeof MDEditor.Markdown>;

export default function SanitizedMDPreview(props: MarkdownProps) {
  return <MDEditor.Markdown rehypePlugins={[rehypeSanitize]} {...props} />;
}
