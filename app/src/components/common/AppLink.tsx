import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode;
  href: string;
}

const isInternalPath = (href: string) =>
  href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/assets/');

export function AppLink({ children, href, ...props }: AppLinkProps) {
  if (isInternalPath(href)) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
