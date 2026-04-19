import { useSeo, type SeoOptions } from '@/hooks/useSeo';

export type SeoProps = SeoOptions;

export function Seo(props: SeoProps) {
  useSeo(props);
  return null;
}
