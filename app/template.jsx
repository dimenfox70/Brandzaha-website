// Re-mounts on each route change → gives an app-like page transition.
// Done in CSS so pages are visible without JavaScript and paint before hydration.
export default function Template({ children }) {
  return <div className="pt">{children}</div>;
}
