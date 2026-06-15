import Link from 'next/link'
import { Instagram, Youtube, Twitter } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SOCIAL_LINKS as EXTERNAL_SOCIAL_LINKS } from '@/data/socialLinks'
import { COLLECTION_LINKS } from '@/data/collectionLinks'

const FOOTER_LINKS = {
  Shop: [
    { label: 'Women', href: COLLECTION_LINKS.women },
    { label: 'Men', href: COLLECTION_LINKS.men },
    { label: 'AZ', href: COLLECTION_LINKS.az },
    { label: 'ProEarth', href: COLLECTION_LINKS.proEarth },
    { label: 'Ethnic', href: COLLECTION_LINKS.ethnic },
    { label: 'Kids', href: COLLECTION_LINKS.kids },
  ],
  Support: [
    { label: 'FAQ', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Shipping', href: '#' },
    { label: 'Returns', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
} as const

const SOCIAL_LINKS = [
  { label: 'Instagram', icon: Instagram, href: EXTERNAL_SOCIAL_LINKS.instagram },
  { label: 'YouTube', icon: Youtube, href: EXTERNAL_SOCIAL_LINKS.youtube },
  { label: 'Twitter', icon: Twitter, href: EXTERNAL_SOCIAL_LINKS.twitter },
] as const

export function Footer() {
  return (
    <footer className="bg-azorte-black">
      {/* Subtle top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-azorte-grey-600/20 to-transparent" />

      <div className="py-section-sm md:py-section">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 justify-items-center text-center">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category} className="flex flex-col items-center">
                <h4 className="text-caption font-medium uppercase tracking-[0.15em] text-azorte-grey-400">
                  {category}
                </h4>
                <ul className="mt-5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={category === 'Shop' ? '_blank' : undefined}
                        rel={category === 'Shop' ? 'noopener noreferrer' : undefined}
                        className="block py-1.5 text-body text-azorte-white/70 transition-colors duration-300 hover:text-azorte-coral"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-azorte-grey-900 pt-8 md:flex-row">
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azorte-grey-400 transition-all duration-300 hover:scale-110 hover:text-azorte-coral"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2 text-caption text-azorte-grey-500 md:flex-row md:gap-6">
              <Link
                href="https://azorte.ajio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-azorte-coral"
              >
                Shop on Ajio &rarr;
              </Link>
              <span className="hidden md:block text-azorte-grey-700">&bull;</span>
              <span>&copy; {new Date().getFullYear()} AZORTE. All rights reserved.</span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
