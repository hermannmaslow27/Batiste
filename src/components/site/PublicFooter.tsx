interface PublicFooterProps {
  siteName: string;
  removeBranding?: boolean;
  poweredByText: string;
}

export default function PublicFooter({
  siteName,
  removeBranding,
  poweredByText,
}: PublicFooterProps) {
  return (
    <footer
      className="site-surface border-t px-6 py-10 text-center text-[13px]"
      style={{ borderColor: "var(--c-border)", color: "var(--c-muted)" }}
    >
      <p>
        &copy; {new Date().getFullYear()} {siteName}
        {!removeBranding && ` · ${poweredByText} Batiste`}
      </p>
    </footer>
  );
}
